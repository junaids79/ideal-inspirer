"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import {
  getCourseById,
  getModulesForCourse,
  getLessonsForModule,
  getCompletedModuleIds,
  markModuleComplete,
  getEnrollment,
} from "@/lib/data";
import ProgressBar from "@/components/dashboard/ProgressBar";

function ModuleState({ unlocked, completed, isPreview }) {
  if (completed) return { label: "Completed", tone: "text-teal-700" };
  if (isPreview) return { label: "Free preview", tone: "text-marigold-600" };
  if (unlocked) return { label: "Unlocked", tone: "text-ink/70" };
  return { label: "Locked", tone: "text-ink/30" };
}

function getEmbedUrl(url) {
  if (!url) return null;

  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null; // not a known embed host — treat as a direct video file
}

function LessonPlayer({ module, isLocked }) {
  const embedUrl = getEmbedUrl(module.video_url);
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-card">
      <div className="border-b border-ink/10 px-5 py-4 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-700">
          Video Lesson
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold text-ink">
          {module.title}
        </h3>
        <p className="mt-1 font-body text-sm text-ink/55">
          {isLocked
            ? "This lesson is locked until the course is purchased or access is granted."
            : "Watch the lesson here. When your real video URL is ready, it can be plugged in without changing the layout."}
        </p>
      </div>

      <div className="bg-ink">
        <div className="relative aspect-video w-full">
          {isLocked ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.28),_transparent_35%),linear-gradient(135deg,_#0f172a,_#10233f_45%,_#0f766e)]">
              <div className="text-center text-white">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 text-2xl">
                  🔒
                </div>
                <p className="mt-4 font-display text-lg font-semibold">
                  Access required
                </p>
                <p className="mt-1 max-w-sm px-6 font-body text-sm text-white/75">
                  After payment, you can unlock the full video library or send a
                  private access link to the learner&apos;s Gmail.
                </p>
              </div>
            </div>
          ) : embedUrl ? (
            <iframe
              key={module.id}
              className="h-full w-full"
              src={embedUrl}
              title={module.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : module.video_url ? (
            <video
              key={module.id}
              controls
              className="h-full w-full object-cover"
              src={module.video_url}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/90">
              <div className="text-center text-white">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl">
                  🎬
                </div>
                <p className="mt-4 font-display text-lg font-semibold">
                  Video coming soon
                </p>
                <p className="mt-1 max-w-sm px-6 font-body text-sm text-white/75">
                  No video has been uploaded for this lesson yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 border-t border-ink/10 p-5 sm:grid-cols-[1.2fr_0.8fr] sm:p-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
            Lesson Notes
          </p>
          <p className="mt-2 font-body text-sm leading-6 text-ink/60">
            {module.description ||
              "This area can hold lesson notes, downloadable resources, and future playback controls."}
          </p>
        </div>
        <div className="rounded-2xl bg-ink/5 px-4 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
            Access Status
          </p>
          <p
            className={`mt-2 font-display text-base font-semibold ${
              isLocked ? "text-ink/70" : "text-teal-700"
            }`}
          >
            {isLocked ? "Locked" : "Available"}
          </p>
          <p className="mt-1 font-body text-sm text-ink/55">
            {isLocked
              ? "Unlock this lesson after purchase."
              : "This lesson is ready to view."}
          </p>
        </div>
      </div>
    </div>
  );
}

function isModuleUnlocked(module, index, { isFree, enrolled } = {}) {
  if (module.is_preview) return true;
  // A learner has full access if the course is free, or they have an
  // active enrollment (granted manually by an admin, or by a future
  // payment webhook writing to the enrollments table).
  return Boolean(isFree || enrolled);
}

function getNextUnlockedModule(modules, completedIds, access) {
  return (
    modules.find((module, index) => {
      const unlocked = isModuleUnlocked(module, index, access);
      const completed = completedIds.includes(module.id);
      return unlocked && !completed;
    }) ?? null
  );
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busyModuleId, setBusyModuleId] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [courseData, moduleData] = await Promise.all([
      getCourseById(id),
      getModulesForCourse(id),
    ]);

    // Each module's actual video lives in the "lessons" table (added via
    // the admin "Manage Videos" page), not on the module row itself —
    // pull the first lesson in per module so the player has something to show.
   const modulesWithLessons = await Promise.all(
      (moduleData ?? []).map(async (module) => {
        const lessons = await getLessonsForModule(module.id);
        const firstLesson = lessons[0];
        return {
          ...module,
          lessons,
          video_url: firstLesson?.video_url ?? null,
          description: module.description || firstLesson?.description || "",
          is_preview: firstLesson?.is_preview ?? false,
        };
      })
    );

    setCourse(courseData);
    setModules(modulesWithLessons);
    setSelectedModuleId((current) => current ?? modulesWithLessons?.[0]?.id ?? null);

    if (user) {
      const [done, enrollment] = await Promise.all([
        getCompletedModuleIds(user.id),
        getEnrollment(user.id, id),
      ]);
      setCompletedIds(done);
      setEnrolled(Boolean(enrollment));
    } else {
      setCompletedIds([]);
      setEnrolled(false);
    }
    setLoading(false);
  }, [id, user]);

  useEffect(() => {
    if (!authLoading) load();
  }, [authLoading, load]);

  const handleComplete = async (moduleId) => {
    if (!user) return;
    setBusyModuleId(moduleId);
    const result = await markModuleComplete(user.id, moduleId);
    if (result.ok) {
      setCompletedIds((prev) => [...prev, moduleId]);
    }
    setBusyModuleId(null);
  };

  const selectedModule =
    modules.find((module) => module.id === selectedModuleId) ?? modules[0] ?? null;
  const progressPercent =
    modules.length > 0 ? Math.round((completedIds.length / modules.length) * 100) : 0;
  const nextModule = getNextUnlockedModule(modules, completedIds, {
    isFree: course?.is_free,
    enrolled,
  });

  if (loading || authLoading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center font-body text-sm text-ink/50">
        Loading program...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-xl font-semibold text-ink">
          Program not found
        </h1>
        <p className="mt-2 font-body text-sm text-ink/55">
          It may have been unpublished or the link is out of date.
        </p>
        <Link href="/courses" className="btn-secondary mt-6 inline-flex">
          Back to all programs
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)]">
        <section>
          {course.category && (
            <span className="rounded-full bg-teal-50 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-teal-700">
              {course.category}
            </span>
          )}
          <h1 className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl">
            {course.title}
          </h1>

          {course.thumbnail_url && (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="mt-6 w-full h-72 object-cover rounded-xl"
            />
          )}

          {course.description && (
            <p className="mt-3 max-w-2xl font-body text-sm text-ink/60">
              {course.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-ink/40">
            {course.instructor && <span>Instructor: {course.instructor}</span>}
            {course.duration && <span>{course.duration}</span>}
            {course.level && <span>{course.level}</span>}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <p className="font-display text-lg font-semibold text-ink">
              {course.is_free ? "Free" : `₹${course.price}`}
            </p>
           <button
              type="button"
              onClick={() => {
                // TODO: no payment gateway wired up yet.
                alert("Payment Gateway Coming Soon");
              }}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Purchase Course
            </button>
          </div>

          {course.syllabus_url && (
            
             <a href={course.syllabus_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-ink/10 bg-white px-5 py-2.5 font-body text-sm font-semibold text-ink hover:border-teal-700/30 hover:text-teal-700"
            >
              📄 Download Syllabus (PDF)
            </a>
          )}

          {!user && (
            <div className="card mt-8 flex flex-wrap items-center justify-between gap-4 px-6 py-5">
              <p className="font-body text-sm text-ink/65">
                Sign in to unlock the full video player and track your progress.
              </p>
              <Link href="/login" className="btn-primary shrink-0">
                Log in
              </Link>
            </div>
          )}

          <div className="mt-8">
            {selectedModule ? (
              <LessonPlayer
                module={selectedModule}
                isLocked={
                  !isModuleUnlocked(
                    selectedModule,
                    modules.findIndex((m) => m.id === selectedModule.id),
                    { isFree: course?.is_free, enrolled }
                  )
                }
              />
            ) : (
              <div className="card px-6 py-10 font-body text-sm text-ink/55">
                No lessons available yet.
              </div>
            )}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-700">
                  Progress Tracking
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                  Video Finished
                </h2>
                <p className="mt-1 font-body text-sm text-ink/55">
                  When a learner finishes a video, the course progress updates
                  automatically.
                </p>
              </div>
              <div className="rounded-2xl bg-ink/5 px-4 py-3 text-left sm:min-w-40">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
                  Progress
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">
                  {progressPercent}%
                </p>
              </div>
            </div>

            <div className="mt-4">
              <ProgressBar value={progressPercent} size="lg" />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-body text-sm text-ink/55">
                {nextModule
                  ? `Next up: ${nextModule.title}`
                  : "You’ve caught up with the available lessons."}
              </p>
              <div className="flex flex-wrap gap-3">
                {nextModule && (
                  <button
                    type="button"
                    onClick={() => setSelectedModuleId(nextModule.id)}
                    className="btn-secondary px-5 py-2.5 text-sm"
                  >
                    Continue Learning
                  </button>
                )}
                <Link href="/dashboard" className="btn-primary px-5 py-2.5 text-sm">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card sm:p-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
              Lessons
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-ink">
              Module list
            </h2>
            <p className="mt-1 font-body text-sm text-ink/55">
              Free previews stay open. Paid lessons can later be unlocked by
              purchase or by sending a private Gmail access link.
            </p>
          </div>

          {modules.length === 0 ? (
            <p className="mt-6 font-body text-sm text-ink/50">
              Modules for this program haven&apos;t been added yet.
            </p>
          ) : (
            <ol className="mt-6 space-y-3">
              {modules.map((module, i) => {
                const isPreview = !!module.is_preview;
                const completed = completedIds.includes(module.id);
                const unlocked = isModuleUnlocked(module, i, {
                  isFree: course?.is_free,
                  enrolled,
                });
                const state = ModuleState({
                  unlocked,
                  completed,
                  isPreview,
                });
                const active = selectedModuleId === module.id;
                const locked = !unlocked && !isPreview;

                return (
                  <li key={module.id}>
                    <button
                      type="button"
onClick={() => {
  if (locked) {
    alert("Purchase the course to unlock this lesson.");
    return;
  }

  setSelectedModuleId(module.id);
}}                      className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                        active
                          ? "border-teal-700 bg-teal-50/60"
                          : "border-ink/10 bg-white hover:border-teal-700/30 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-ink/30">
                              0{i + 1}
                            </span>
                            <span className="font-display text-base font-semibold text-ink">
                              {module.title}
                            </span>
                          </div>
                          {(isPreview || unlocked) && module.description && (
                            <p className="mt-1 line-clamp-2 font-body text-sm text-ink/55">
                              {module.description}
                            </p>
                          )}
                          <span
                            className={`mt-2 block font-mono text-[11px] uppercase tracking-wide ${state.tone}`}
                          >
                            {state.label}
                          </span>
                        </div>

                        <span
                          className={`mt-0.5 shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
                            locked
                              ? "bg-ink/5 text-ink/35"
                              : "bg-teal-50 text-teal-700"
                          }`}
                        >
                          
                        </span>
                      </div>
                    </button>

                    {unlocked && !completed && (
                      <button
                        onClick={() => handleComplete(module.id)}
                        disabled={busyModuleId === module.id}
                        className="mt-2 inline-flex rounded-full border border-ink/10 px-4 py-2 font-body text-xs font-semibold text-ink transition hover:border-teal-700/30 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {busyModuleId === module.id ? "Saving..." : "Mark complete"}
                      </button>
                    )}
                  </li>
                );
              })}
              
            </ol>
            
          )}
        </aside>
      </div>
    </div>
  );
}