"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabaseClient";

// Certificate template is a fixed 1280x904 image (public/certificates/certificate-template.jpg).
// Only a few spots on it are actually blank: the "Mr/Mrs ___" line, the empty
// space below the paragraph, and the blank line near the bottom-left. All
// dynamic text below is positioned (in %) to land on those blank spots.
const TEMPLATE_SRC = "/certificates/certificate-template.jpg";
const TEMPLATE_WIDTH = 1280;
const TEMPLATE_HEIGHT = 904;

// px-on-template -> % helpers, so the overlay stays aligned at any render size
const xPct = (px) => `${(px / TEMPLATE_WIDTH) * 100}%`;
const yPct = (px) => `${(px / TEMPLATE_HEIGHT) * 100}%`;

export default function CertificatePage() {
  const { courseId } = useParams();
  const { user, loading: authLoading } = useAuth();

  const [certificate, setCertificate] = useState(null);
  const [course, setCourse] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const [{ data: certData, error: certError }, { data: courseData }] =
      await Promise.all([
        supabase
          .from("certificates")
          .select("*")
          .eq("user_id", user.id)
          .eq("course_id", courseId)
          .single(),
        supabase.from("courses").select("*").eq("id", courseId).single(),
      ]);

    if (certError || !certData) {
      setError("No certificate found for this course yet.");
      setLoading(false);
      return;
    }

    setCertificate(certData);
    setCourse(courseData);
    setStudentName(
      user.user_metadata?.full_name || user.user_metadata?.name || user.email
    );
    setLoading(false);
  }, [user, courseId]);

  useEffect(() => {
    if (!authLoading) load();
  }, [authLoading, load]);

  const completionDate = certificate?.issued_at
    ? new Date(certificate.issued_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const scaleX = pageWidth / TEMPLATE_WIDTH;
      const scaleY = pageHeight / TEMPLATE_HEIGHT;
      const px = (v) => v * scaleX;
      const py = (v) => v * scaleY;

      // Load the template image as a data URL so jsPDF can embed it.
      const imgResp = await fetch(TEMPLATE_SRC);
      const imgBlob = await imgResp.blob();
      const imgDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(imgBlob);
      });

      doc.addImage(imgDataUrl, "JPEG", 0, 0, pageWidth, pageHeight);

      // Student name, on the "Mr/Mrs ____" line
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text(studentName || "Student", px(465), py(436), { align: "center" });

      // Course/program name, in the blank space below the paragraph
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(`Program: ${course?.title || "Course"}`, px(56), py(585), {
        align: "left",
      });

      // Completion date, on the blank line near the bottom-left
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(completionDate, px(178), py(738), { align: "center" });

      // Certificate number, just below that
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Certificate No: ${certificate?.certificate_number ?? ""}`,
        px(56),
        py(778),
        { align: "left" }
      );

      doc.save(
        `certificate-${(course?.title || "course").replace(/\s+/g, "-").toLowerCase()}.pdf`
      );
    } finally {
      setDownloading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center font-body text-sm text-ink/50">
        Loading certificate...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-xl font-semibold text-ink">
          Sign in to view your certificate
        </h1>
        <Link href="/login" className="btn-primary mt-6 inline-flex">
          Log in
        </Link>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-xl font-semibold text-ink">
          Certificate not available
        </h1>
        <p className="mt-2 font-body text-sm text-ink/55">
          {error || "Complete every lesson in this course to unlock your certificate."}
        </p>
        <Link href={`/courses/${courseId}`} className="btn-secondary mt-6 inline-flex">
          Back to course
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="relative w-full overflow-hidden rounded-[1.5rem] shadow-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TEMPLATE_SRC}
          alt="Certificate of Appreciation"
          className="block w-full h-auto select-none"
          draggable={false}
        />

        {/* Student name, on the "Mr/Mrs ____" line */}
        <div
          className="absolute font-body font-semibold text-ink text-center"
          style={{
            left: xPct(295),
            top: yPct(420),
            width: xPct(340) /* relative width */,
            fontSize: "clamp(0.7rem, 1.8vw, 1.15rem)",
          }}
        >
          {studentName}
        </div>

        {/* Course/program name, in the blank space below the paragraph */}
        <div
          className="absolute font-body font-semibold text-ink"
          style={{
            left: xPct(56),
            top: yPct(560),
            width: xPct(760),
            fontSize: "clamp(0.6rem, 1.4vw, 0.95rem)",
          }}
        >
          Program: {course?.title}
        </div>

        {/* Completion date, on the blank line near the bottom-left */}
        <div
          className="absolute text-center text-ink/70"
          style={{
            left: xPct(105),
            top: yPct(722),
            width: xPct(147),
            fontSize: "clamp(0.5rem, 1.1vw, 0.75rem)",
          }}
        >
          {completionDate}
        </div>

        {/* Certificate number */}
        <div
          className="absolute text-ink/50"
          style={{
            left: xPct(56),
            top: yPct(762),
            width: xPct(320),
            fontSize: "clamp(0.45rem, 1vw, 0.65rem)",
          }}
        >
          Certificate No: {certificate.certificate_number}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="btn-primary px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          {downloading ? "Preparing..." : "Download Certificate"}
        </button>
        <Link href={`/courses/${courseId}`} className="btn-secondary px-6 py-3 text-sm">
          Back to course
        </Link>
      </div>
    </div>
  );
}