"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/AuthProvider";

export default function VideosPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading, isAdmin } = useAuth();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
const [position, setPosition] = useState(1);
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (isAdmin) fetchVideos();
  }, [isAdmin]);

  async function fetchVideos() {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("module_id", id);

    if (!error) {
      setVideos(data);
    }

    setLoading(false);
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setDuration("");
    setEditingVideo(null);
    setShowForm(false);
  }

  function startEdit(video) {
    setEditingVideo(video);
    setTitle(video.title ?? "");
    setDescription(video.description ?? "");
    setVideoUrl(video.video_url ?? "");
    setDuration(video.duration ?? "");
    setShowForm(true);
  }

  async function addVideo() {
    setSaving(true);
    const { error } = await supabase.from("lessons").insert({
  module_id: id,
  title,
  description,
  video_url: videoUrl,
  duration,
  position,
})
    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    resetForm();
    fetchVideos();
  }

  async function updateVideo() {
    setSaving(true);
    const { error } = await supabase
      .from("lessons")
      .update({
        title,
        description,
        video_url: videoUrl,
        duration,
      })
      .eq("id", editingVideo.id);
    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    resetForm();
    fetchVideos();
  }

  async function deleteVideo(videoId) {
    const confirmed = window.confirm(
      "Delete this video? This can't be undone."
    );
    if (!confirmed) return;

    const { error } = await supabase.from("lessons").delete().eq("id", videoId);

    if (error) {
      alert(error.message);
      return;
    }

    fetchVideos();
  }

  if (authLoading || !user || loading) return <p className="p-6">Loading...</p>;

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
        <h1 className="text-3xl font-bold">Manage Videos</h1>

        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : "+ Add Video"}
        </button>
      </div>

      {showForm && (
        <div className="border rounded-lg p-4 mb-6">
          <input
            type="text"
            placeholder="Video Title"
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
            type="text"
            placeholder="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />
            <input
  type="number"
  placeholder="Position"
  value={position}
  onChange={(e) => setPosition(Number(e.target.value))}
  className="border p-2 rounded w-full mb-3"
/>
          <button
            onClick={editingVideo ? updateVideo : addVideo}
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {saving
              ? editingVideo
                ? "Updating..."
                : "Saving..."
              : editingVideo
              ? "Update Video"
              : "Save Video"}
          </button>
        </div>
      )}

      {videos.length === 0 ? (
        <p>No videos added yet.</p>
      ) : (
        videos.map((video, index) => (
          <div key={video.id} className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="font-semibold">
                  {index + 1}. {video.title}
                </h2>

                <p>{video.description}</p>

                <p className="text-sm text-gray-500">
                  Duration: {video.duration} min
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(video)}
                  className="text-sm px-3 py-1.5 rounded border hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteVideo(video.id)}
                  className="text-sm px-3 py-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50"
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