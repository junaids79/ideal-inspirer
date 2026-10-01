
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import ProgressBar from "@/components/dashboard/ProgressBar";

const adminStats = [
  { label: "Total Learners", value: "128" },
  { label: "Active Enrollments", value: "84" },
  { label: "Paid Access", value: "37" },
  { label: "Revenue", value: "₹48.2K" },
];

const courseHealth = [
  { title: "SAP FICO", progress: 82, learners: 18, status: "Active" },
  { title: "English Communication", progress: 100, learners: 26, status: "Completed" },
  { title: "Python Fundamentals", progress: 54, learners: 14, status: "Growing" },
  { title: "AI for Beginners", progress: 21, learners: 9, status: "New" },
];

const recentActivity = [
  "3 learners completed SAP MM today",
  "2 paid enrollments were granted access",
  "1 new course request was submitted",
  "5 learners resumed videos this morning",
];


export default function AdminDashboardPage() {
const { user, loading, isAdmin } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center font-body text-sm text-ink/50">
        Loading admin dashboard...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
          Admin Access
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
          You do not have access to this dashboard
        </h1>
        <p className="mt-3 font-body text-sm text-ink/60">
          This area is reserved for administrators. Sign in with the admin
          account and reload this page.
        </p>
        <Link href="/dashboard" className="btn-primary mt-8 inline-flex">
          Back to learner dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-10">
      <div className="rounded-[2rem] border border-ink/10 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.12),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.78))] p-5 shadow-card sm:p-7 md:p-8">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-teal-700">
              Admin Dashboard
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-ink md:text-5xl">
              Manage courses, learners, and access
            </h1>
            <p className="mt-3 max-w-2xl font-body text-sm leading-6 text-ink/60 md:text-base">
              This is the control center for publishing programs, watching
              progress, and handling paid access later.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/courses" className="btn-secondary">
              View courses
            </Link>
            <Link href="/dashboard" className="btn-primary">
              Learner dashboard
            </Link>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Admin stats">
          {adminStats.map((item) => (
            <div key={item.label} className="card p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
                {item.label}
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
                  Course Health
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                  Track course progress
                </h2>
              </div>
              <Link href="/admin/courses" className="font-body text-sm font-semibold text-teal-700 hover:text-teal-700/80">
                Manage content
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {courseHealth.map((course) => (
                <div key={course.title} className="rounded-2xl border border-ink/10 bg-ink/5 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink">
                        {course.title}
                      </h3>
                      <p className="font-body text-xs text-ink/55">
                        {course.learners} learners active
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink/55">
                      {course.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <ProgressBar value={course.progress} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
              Activity Feed
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-ink">
              Recent admin activity
            </h2>

            <ul className="mt-6 space-y-3">
              {recentActivity.map((item) => (
                <li key={item} className="rounded-2xl border border-ink/10 bg-ink/5 px-4 py-3 font-body text-sm text-ink/65">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-dashed border-ink/15 bg-white px-4 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
                Coming next
              </p>
              <p className="mt-2 font-body text-sm text-ink/60">
                Add learner management, paid access controls, and course/video
                publishing tools here.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
