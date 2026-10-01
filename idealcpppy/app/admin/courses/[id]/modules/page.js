"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/AuthProvider";

export default function CourseModulesPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [position, setPosition] = useState(1);
const [showForm, setShowForm] = useState(false);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingModule, setEditingModule] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (isAdmin) fetchModules();
  }, [isAdmin]);

  async function deleteModule(moduleId) {
    const confirmed = window.confirm(
      "Delete this module? Its videos will need to be reassigned or removed separately."
    );
    if (!confirmed) return;

    const { error } = await supabase.from("modules").delete().eq("id", moduleId);

    if (error) {
      alert(error.message);
      return;
    }

    fetchModules();
  }

  async function fetchModules() {
    const { data, error } = await supabase
      .from("modules")
      .select("*")
      .eq("course_id", id)
      .order("position");

    if (!error) {
      setModules(data);
    }

    setLoading(false);
  }

  if (authLoading || !user || loading) {
    return <p className="p-6">Loading modules...</p>;
  }

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-lg text-red-600">
        You do not have access to this page.
      </div>
    );
  }
async function addModule() {
    const { error } = await supabase
        .from("modules")
        .insert({
            course_id: id,
            title,
            description,
            position,
        });

    if (error) {
        alert(error.message);
        return;
    }

    setTitle("");
    setDescription("");
    setPosition(1);
    setShowForm(false);

    fetchModules();
}
async function updateModule() {
  const { error } = await supabase
    .from("modules")
    .update({
      title,
      description,
      position,
    })
    .eq("id", editingModule.id);

  if (error) {
    alert(error.message);
    return;
  }

  setEditingModule(null);
  setTitle("");
  setDescription("");
  setPosition(1);
  setShowForm(false);

  fetchModules();
}
  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Manage Modules
        </h1>

      <button
    onClick={() => setShowForm(!showForm)}
    className="bg-blue-600 text-white px-4 py-2 rounded"
>
    + Add Module
</button>

{showForm && (
  <div className="border rounded-lg p-4 mt-6">

    <input
      type="text"
      placeholder="Module Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border p-2 rounded w-full mb-3"
    />

    <textarea
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="border p-2 rounded w-full mb-3"
    />

    <input
      type="number"
      value={position}
      onChange={(e) => setPosition(Number(e.target.value))}
      className="border p-2 rounded w-full mb-3"
    />

    <button
      onClick={editingModule ? updateModule : addModule}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      {editingModule ? "Update Module" : "Save Module"}
    </button>

  </div>
)}
      </div>

      {modules.length === 0 ? (
        <p>No modules added yet.</p>
      ) : (
        modules.map((module, index) => (
          <div
            key={module.id}
            className="border rounded-lg p-4 mb-4"
          >
            <h2 className="font-semibold">
              {index + 1}. {module.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {module.description}
            </p>

            <div className="mt-4 flex gap-3">
  <Link
    href={`/admin/modules/${module.id}/videos`}
    className="bg-blue-600 text-white px-3 py-1 rounded"
  >
    Manage Videos
  </Link>

  <button
    onClick={() => {
      setEditingModule(module);
      setTitle(module.title);
      setDescription(module.description);
      setPosition(module.position);
      setShowForm(true);
    }}
    className="bg-yellow-500 text-white px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => deleteModule(module.id)}
    className="bg-red-600 text-white px-3 py-1 rounded"
  >
    Delete
  </button>

</div>
          </div>
        ))
      )}

    </div>
  );
}