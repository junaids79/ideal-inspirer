"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/AuthProvider";

// Shared by app/admin/courses/new/page.js (mode="create") and
// app/admin/courses/[id]/edit/page.js (mode="edit").
// Keeping ONE form means the create and edit flows can never drift
// out of sync the way they did before (edit was a stale copy of create).
export default function CourseForm({ mode, courseId, initialData }) {
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const isEdit = mode === "edit";

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [instructor, setInstructor] = useState(initialData?.instructor ?? "");
  const [price, setPrice] = useState(initialData?.price ?? "");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail_url ?? "");
  const [duration, setDuration] = useState(initialData?.duration ?? "");
  const [level, setLevel] = useState(initialData?.level ?? "");
  const [isFree, setIsFree] = useState(initialData?.is_free ?? false);
  const [published, setPublished] = useState(initialData?.is_published ?? false);
  const [saving, setSaving] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

  const payload = {
    title,
    slug,
    category,
    description,
    instructor,
    price: Number(price) || 0,
    thumbnail_url: thumbnail,
    duration,
    level,
    is_free: isFree,
    is_published: published,
  };

  const result = isEdit
    ? await supabase
        .from("courses")
        .update(payload)
        .eq("id", courseId)
        .select()
    : await supabase
        .from("courses")
        .insert([payload])
        .select();

  const { data, error } = result;

  setSaving(false);

  if (error) {
    console.error("SUPABASE ERROR:", error);
    alert(error.message);
    return;
  }

  alert(
    isEdit
      ? "Course updated successfully!"
      : "Course added successfully!"
  );

  router.push("/admin/courses");
  router.refresh();
};
  if (authLoading || !user) {
    return <p className="p-6 text-center">Loading...</p>;
  }

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-lg text-red-600">
        You do not have access to this page.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">
        {isEdit ? "Edit Course" : "Add New Course"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Slug</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Category</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="e.g. Web Development"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            rows={5}
            className="w-full border rounded-lg p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Duration</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="e.g. 6 weeks"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Level</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3"
              placeholder="e.g. Beginner"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Instructor</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Price</label>
          <input
            type="number"
            className="w-full border rounded-lg p-3"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Thumbnail URL</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            placeholder="https://example.com/image.jpg"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>

        <div className="flex gap-10">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
            />
            Free Course
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            Published
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-3 rounded-lg"
        >
          {saving ? (isEdit ? "Updating..." : "Saving...") : isEdit ? "Update Course" : "Save Course"}
        </button>
      </form>
    </div>
  );
}