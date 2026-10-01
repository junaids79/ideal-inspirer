"use client";

// Thin route file — Next.js requires this exact filename ("page.js") for
// every route. All the actual form logic lives in CourseForm.jsx so this
// file stays readable at a glance: this route just renders the "create" mode.
import CourseForm from "@/components/admin/CourseForm";

export default function NewCoursePage() {
  return <CourseForm mode="create" />;
}
