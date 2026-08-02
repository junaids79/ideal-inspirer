"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabaseClient";

// app/certificate/[courseId]/page.jsx
export default function CertificatePage() {
  const { courseId } = useParams();
  const { user, loading: authLoading } = useAuth();

  const [certificate, setCertificate] = useState(null);
  const [course, setCourse] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const certRef = useRef(null);

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
console.log("Looking up:", { userId: user.id, courseId });
console.log("Result:", { certData, certError });
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

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // jsPDF is loaded client-side only; keeping the import dynamic avoids
      // pulling it into the server bundle.
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      doc.setDrawColor(15, 118, 110);
      doc.setLineWidth(4);
      doc.rect(24, 24, pageWidth - 48, pageHeight - 48);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(28);
      doc.setTextColor(15, 23, 42);
      doc.text("Certificate of Completion", pageWidth / 2, 120, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.text("This certifies that", pageWidth / 2, 170, { align: "center" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(15, 118, 110);
      doc.text(studentName || "Student", pageWidth / 2, 205, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text("has successfully completed the course", pageWidth / 2, 235, {
        align: "center",
      });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text(course?.title || "Course", pageWidth / 2, 265, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const completionDate = certificate?.issued_at
        ? new Date(certificate.issued_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "";
      doc.text(`Completion date: ${completionDate}`, pageWidth / 2, 320, {
        align: "center",
      });
      doc.text(
        `Certificate No: ${certificate?.certificate_number ?? ""}`,
        pageWidth / 2,
        340,
        { align: "center" }
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

  const completionDate = certificate.issued_at
    ? new Date(certificate.issued_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div
        ref={certRef}
        className="rounded-[2rem] border-4 border-teal-700/80 bg-white px-10 py-16 text-center shadow-card"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal-700">
          Certificate of Completion
        </p>
        <p className="mt-8 font-body text-sm text-ink/60">This certifies that</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
          {studentName}
        </h1>
        <p className="mt-6 font-body text-sm text-ink/60">
          has successfully completed the course
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-teal-700">
          {course?.title}
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 font-mono text-xs text-ink/40">
          <span>Completed: {completionDate}</span>
          <span>Certificate No: {certificate.certificate_number}</span>
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