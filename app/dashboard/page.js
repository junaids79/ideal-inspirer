"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabaseClient";
import ChatWidget from "@/components/ChatWidget";
import StatsCard from "@/components/dashboard/StatsCard";
import ContinueLearningCard from "@/components/dashboard/ContinueLearningCard";
import MyCourseCard from "@/components/dashboard/MyCourseCard";
import RecommendedCourseCard from "@/components/dashboard/RecommendedCourseCard";
import CourseThumbnail from "@/components/dashboard/CourseThumbnail";
import {
  dashboardStats,
  continueLearningCourses,
  enrolledCourses,
  recentlyViewed,
  recommendedCourses,
} from "@/lib/dashboardData";

function getFirstName(user) {
  const fullName = user?.user_metadata?.full_name;
  if (fullName) return fullName.split(" ")[0];
  if (user?.email) return user.email.split("@")[0];
  return "Junaid";
}

const courseFilters = [
  "All",
  "SAP",
  "English",
  "Finance",
  "AI",
  "Programming",
];

function matchesFilter(course, query, filter) {
  const needle = query.trim().toLowerCase();
  const haystack = `${course.title} ${course.category ?? ""} ${
    course.description ?? ""
  }`.toLowerCase();
  const queryMatch = !needle || haystack.includes(needle);
  const filterMatch =
    filter === "All" ||
    haystack.includes(filter.toLowerCase()) ||
    course.id.toLowerCase().includes(filter.toLowerCase());
  return queryMatch && filterMatch;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    async function ensureProfile() {
      if (!user) return;

      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!existing) {
        await supabase.from("profiles").insert({
          id: user.id,
          full_name: user.user_metadata?.full_name ?? "",
          email: user.email,
        });
      }
    }
    ensureProfile();
  }, [user]);

  const firstName = getFirstName(user);
  const filteredContinueLearning = useMemo(
    () =>
      continueLearningCourses.filter((course) =>
        matchesFilter(course, searchTerm, activeFilter)
      ),
    [activeFilter, searchTerm]
  );
  const filteredEnrolledCourses = useMemo(
    () =>
      enrolledCourses.filter((course) =>
        matchesFilter(course, searchTerm, activeFilter)
      ),
    [activeFilter, searchTerm]
  );
  const filteredRecentlyViewed = useMemo(
    () =>
      recentlyViewed.filter((course) =>
        matchesFilter(course, searchTerm, activeFilter)
      ),
    [activeFilter, searchTerm]
  );
  const filteredRecommendedCourses = useMemo(
    () =>
      recommendedCourses.filter((course) =>
        matchesFilter(course, searchTerm, activeFilter)
      ),
    [activeFilter, searchTerm]
  );

  if (authLoading || !user) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center font-body text-sm text-ink/50">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-10">
      <div className="rounded-[2rem] border border-ink/10 bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.12),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(255,255,255,0.72))] p-5 shadow-card backdrop-blur-sm sm:p-7 md:p-8">
        <header className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-teal-700">
              My Learning
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-5xl">
              Welcome, {firstName}
            </h1>
            <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-ink/60 md:text-base">
              Your courses, progress, certificates, and recommendations in one
              clean LMS dashboard.
            </p>
          </div>

          <div className="card grid grid-cols-2 gap-3 p-4 sm:p-5">
            {[
              { label: "Courses Enrolled", value: dashboardStats.coursesEnrolled },
              { label: "Average Progress", value: `${dashboardStats.averageProgress}%` },
              { label: "Certificates", value: dashboardStats.certificates },
              { label: "Learning Hours", value: dashboardStats.learningHours },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-ink/5 px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </header>

        <section className="mt-8" aria-label="Learning statistics">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              icon="📚"
              label="Courses Enrolled"
              value={dashboardStats.coursesEnrolled}
              accent="teal"
            />
            <StatsCard
              icon="📈"
              label="Average Progress"
              value={`${dashboardStats.averageProgress}%`}
              accent="marigold"
            />
            <StatsCard
              icon="🎓"
              label="Certificates"
              value={dashboardStats.certificates}
              accent="teal"
            />
            <StatsCard
              icon="⏱"
              label="Learning Hours"
              value={dashboardStats.learningHours}
              accent="ink"
            />
          </div>
        </section>

        <section className="mt-10" aria-label="Search Courses">
          <div className="rounded-3xl border border-ink/10 bg-white/80 p-4 shadow-card sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
                  Search Courses
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink md:text-2xl">
                  Find the right course faster
                </h2>
                <p className="mt-1 font-body text-sm text-ink/55">
                  Search by course title, topic, or use a quick category filter.
                </p>
              </div>

              <div className="w-full max-w-xl">
                <label className="sr-only" htmlFor="dashboard-course-search">
                  Search Courses
                </label>
                <input
                  id="dashboard-course-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search courses"
                  className="field w-full rounded-full px-5 py-3"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {courseFilters.map((filter) => {
                const active = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                      active
                        ? "bg-teal-700 text-white shadow-sm"
                        : "border border-ink/10 bg-white text-ink/65 hover:border-teal-700/30 hover:text-teal-700"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="continue-learning-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                id="continue-learning-heading"
                className="font-display text-xl font-semibold text-ink md:text-2xl"
              >
                Continue Learning
              </h2>
              <p className="mt-1 font-body text-sm text-ink/55">
                Resume the lessons you were last working on.
              </p>
            </div>
            <Link
              href="/courses"
              className="hidden shrink-0 font-body text-sm font-semibold text-teal-700 hover:text-teal-700/80 sm:inline"
            >
              Browse all courses
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredContinueLearning.map((course) => (
              <ContinueLearningCard key={course.id} course={course} />
            ))}
            {!filteredContinueLearning.length && (
              <p className="rounded-2xl border border-dashed border-ink/15 bg-white/70 px-5 py-8 font-body text-sm text-ink/55 md:col-span-2 xl:col-span-3">
                No continue-learning courses match your search.
              </p>
            )}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="my-courses-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                id="my-courses-heading"
                className="font-display text-xl font-semibold text-ink md:text-2xl"
              >
                My Courses
              </h2>
              <p className="mt-1 font-body text-sm text-ink/55">
                Every enrolled course, with progress and completion status.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filteredEnrolledCourses.map((course) => (
              <MyCourseCard key={course.id} course={course} />
            ))}
            {!filteredEnrolledCourses.length && (
              <p className="rounded-2xl border border-dashed border-ink/15 bg-white/70 px-5 py-8 font-body text-sm text-ink/55 sm:col-span-2 xl:col-span-4">
                No enrolled courses match your search.
              </p>
            )}
          </div>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section aria-labelledby="recently-viewed-heading">
            <h2
              id="recently-viewed-heading"
              className="font-display text-xl font-semibold text-ink"
            >
              Recently Viewed
            </h2>
            <p className="mt-1 font-body text-sm text-ink/55">
              The last courses you opened.
            </p>

            <ul className="mt-5 space-y-3">
              {filteredRecentlyViewed.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/courses/${course.id}`}
                    className="card reveal flex items-center gap-4 px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <CourseThumbnail
                      title={course.title}
                      gradient="from-teal-600 to-teal-800"
                      className="h-10 w-10 text-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-semibold text-ink">
                        {course.title}
                      </p>
                      {course.category && (
                        <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
                          {course.category}
                        </p>
                      )}
                    </div>
                    <span className="font-body text-sm text-teal-700" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
              {!filteredRecentlyViewed.length && (
                <li className="rounded-2xl border border-dashed border-ink/15 bg-white/70 px-5 py-8 font-body text-sm text-ink/55">
                  No recently viewed courses match your search.
                </li>
              )}
            </ul>
          </section>

          <section aria-labelledby="recommended-heading">
            <h2
              id="recommended-heading"
              className="font-display text-xl font-semibold text-ink"
            >
              Recommended Courses
            </h2>
            <p className="mt-1 font-body text-sm text-ink/55">
              Suggested next steps based on your learning path.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {filteredRecommendedCourses.map((course) => (
                <RecommendedCourseCard key={course.id} course={course} />
              ))}
              {!filteredRecommendedCourses.length && (
                <p className="rounded-2xl border border-dashed border-ink/15 bg-white/70 px-5 py-8 font-body text-sm text-ink/55 sm:col-span-2">
                  No recommended courses match your search.
                </p>
              )}
            </div>
          </section>
        </div>

        <section
          className="mt-10 rounded-xl2 border border-ink/10 bg-white shadow-card"
          aria-label="Quick summary"
        >
          <div className="grid divide-y divide-ink/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {[
              { label: "Courses", value: dashboardStats.coursesEnrolled },
              { label: "Certificates", value: dashboardStats.certificates },
              { label: "Hours", value: dashboardStats.learningHours },
              { label: "Completed", value: dashboardStats.completed },
            ].map((item) => (
              <div key={item.label} className="px-6 py-5 text-center">
                <p className="font-display text-2xl font-semibold text-ink">
                  {item.value}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink/40">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="advisor-heading">
          <h2
            id="advisor-heading"
            className="font-display text-lg font-semibold text-ink"
          >
            Ask a training advisor
          </h2>
          <p className="mt-1 font-body text-sm text-ink/55">
            Questions about a module or which course to take next? Ask here.
          </p>
          <div className="mt-4">
            <ChatWidget />
          </div>
        </section>
      </div>
    </div>
  );
}
