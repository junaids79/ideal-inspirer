"use client";

// Thin route file — this is the EDIT route: /admin/courses/[id]/edit
// (previously the edit link pointed at /admin/courses/[id] directly, and
// that page.js was a stale copy of the "new course" form that inserted a
// new row instead of updating the existing one).
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import CourseForm from "@/components/admin/CourseForm";

export default function EditCoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadCourse() {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (!active) return;

      if (error || !data) {
        setNotFound(true);
      } else {
        setCourse(data);
      }
      setLoading(false);
    }

    loadCourse();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-lg">Loading course...</div>
    );
  }

  if (notFound) {
    return (
      <div className="p-8 text-center text-lg text-red-600">
        Course not found.
      </div>
    );
  }

  return <CourseForm mode="edit" courseId={id} initialData={course} />;
}
