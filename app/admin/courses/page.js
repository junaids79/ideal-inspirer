"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabaseClient";

export default function AdminCoursesPage() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (isAdmin) fetchCourses();
  }, [isAdmin]);

  async function fetchCourses() {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setCourses(data ?? []);
    }
    setLoading(false);
  }

  async function deleteCourse(courseId) {
    const confirmed = window.confirm(
      "Delete this course? Its modules and videos will need to be removed separately."
    );
    if (!confirmed) return;

    const { error } = await supabase.from("courses").delete().eq("id", courseId);

    if (error) {
      alert(error.message);
      return;
    }

    fetchCourses();
  }

  if (authLoading || !user || loading) {
    return <p className="p-6">Loading courses...</p>;
  }

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-lg text-red-600">
        You do not have access to this page.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Courses</h1>

        <Link
          href="/admin/courses/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <p>No courses added yet.</p>
      ) : (
        courses.map((course) => (
          <div key={course.id} className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="font-semibold">
                  {course.title}
                  {!course.is_published && (
                    <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                      Draft
                    </span>
                  )}
                </h2>
                <p className="text-gray-600 mt-1">{course.description}</p>
              </div>

              <div className="flex gap-2 shrink-0 flex-wrap">
                <Link
                  href={`/admin/courses/${course.id}/edit`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/courses/${course.id}/modules`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Manage Modules
                </Link>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}