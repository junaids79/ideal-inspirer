import { supabase } from "./supabaseClient";

/**
 * Schema assumptions (matches the 5 tables created by supabase-setup.sql):
 *
 * courses      id, title, category, description, image_url, duration, level, created_at
 * modules      id, course_id (fk -> courses.id), title, description, position, is_preview (bool)
 * lessons      id, module_id (fk -> modules.id), title, description, video_url, duration, position
 * profiles     id (uuid = auth.users.id), full_name, email, created_at
 * completions  id, user_id (fk -> profiles.id), module_id (fk -> modules.id), completed_at
 *
 * If your actual column names differ, adjust the `.select()` / field
 * references below to match — the Table Editor in Supabase shows the
 * real column names for each table.
 */

export async function getCourses() {
  // Only show published courses on the public site — the admin "Published"
  // checkbox previously had no effect here, so drafts were publicly visible.
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getCourses error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getCourseById(id) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getCourseById error:", error.message);
    return null;
  }
  return data;
}

export async function getModulesForCourse(courseId) {
  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", courseId)
    .order("position", { ascending: true });

  if (error) {
    console.error("getModulesForCourse error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getLessonsForModule(moduleId) {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("module_id", moduleId)
    .order("position", { ascending: true });

  if (error) {
    console.error("getLessonsForModule error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getCompletedModuleIds(userId) {
  if (!userId) return [];
  const { data, error } = await supabase
    .from("completions")
    .select("module_id")
    .eq("user_id", userId);

  if (error) {
    console.error("getCompletedModuleIds error:", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.module_id);
}

export async function markModuleComplete(userId, moduleId) {
  const { error } = await supabase
    .from("completions")
    .insert({ user_id: userId, module_id: moduleId });

  if (error) {
    console.error("markModuleComplete error:", error.message);
    return { ok: false, message: error.message };
  }
  return { ok: true };
}

export async function getEnrollment(userId, courseId) {
  if (!userId) return null;
  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("status", true)
    .maybeSingle();

  if (error) {
    console.error("getEnrollment error:", error.message);
    return null;
  }
  return data;
}

export async function getEnrolledCourseIds(userId) {
  if (!userId) return [];
  const { data, error } = await supabase
    .from("enrollments")
    .select("course_id")
    .eq("user_id", userId)
    .eq("status", true);

  if (error) {
    console.error("getEnrolledCourseIds error:", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.course_id);
}

// Admin-only: RLS requires the caller's profile to have role = 'admin'.
// Use this for manually granting access (e.g. comped seats), not for
// payment-triggered enrollment — that should happen server-side after
// verifying a payment webhook, not from a client call like this one.
export async function grantEnrollment(userId, courseId) {
  const { error } = await supabase
    .from("enrollments")
    .insert({ user_id: userId, course_id: courseId, status: true });

  if (error) {
    console.error("grantEnrollment error:", error.message);
    return { ok: false, message: error.message };
  }
  return { ok: true };
}

const THUMBNAIL_PALETTE = [
  "from-teal-600 to-teal-800",
  "from-ink-700 to-ink-900",
  "from-marigold-600 to-marigold",
  "from-teal-400 to-teal-700",
  "from-ink-400 to-ink-700",
  "from-teal-700 to-teal-900",
  "from-marigold-400 to-marigold-600",
  "from-teal-500 to-ink-700",
];

function paletteFor(courseId) {
  let hash = 0;
  for (let i = 0; i < courseId.length; i++) {
    hash = (hash * 31 + courseId.charCodeAt(i)) % THUMBNAIL_PALETTE.length;
  }
  return THUMBNAIL_PALETTE[hash];
}

// Real learner dashboard data, replacing lib/dashboardData.js mocks.
// Pulls enrollments, modules, and completions for the signed-in learner.
export async function getLearnerDashboardData(userId) {
  const empty = {
    stats: { coursesEnrolled: 0, averageProgress: 0, completed: 0 },
    continueLearningCourses: [],
    enrolledCourses: [],
    recentlyViewed: [],
    recommendedCourses: [],
  };
  if (!userId) return empty;

  const [{ data: enrollments }, { data: allCourses }, { data: completions }] =
    await Promise.all([
      supabase
        .from("enrollments")
        .select("course_id, courses(*)")
        .eq("user_id", userId)
        .eq("status", true),
      supabase.from("courses").select("*").eq("is_published", true),
      supabase
        .from("completions")
        .select("module_id, completed_at, modules(course_id)")
        .eq("user_id", userId)
        .order("completed_at", { ascending: false }),
    ]);

  const enrolledCourseRows = (enrollments ?? [])
    .map((row) => row.courses)
    .filter(Boolean);
  const enrolledIds = new Set(enrolledCourseRows.map((c) => c.id));

  // Module counts per course, so we can compute progress %.
  const courseIds = enrolledCourseRows.map((c) => c.id);
  const { data: modules } = courseIds.length
    ? await supabase.from("modules").select("id, course_id").in("course_id", courseIds)
    : { data: [] };

  const moduleCountByCourse = {};
  (modules ?? []).forEach((m) => {
    moduleCountByCourse[m.course_id] = (moduleCountByCourse[m.course_id] ?? 0) + 1;
  });

  const completedModuleIdsByCourse = {};
  (completions ?? []).forEach((row) => {
    const courseId = row.modules?.course_id;
    if (!courseId) return;
    completedModuleIdsByCourse[courseId] = completedModuleIdsByCourse[courseId] ?? new Set();
    completedModuleIdsByCourse[courseId].add(row.module_id);
  });

  const enrolledCourses = enrolledCourseRows.map((course) => {
    const totalModules = moduleCountByCourse[course.id] ?? 0;
    const completedCount = completedModuleIdsByCourse[course.id]?.size ?? 0;
    const progress = totalModules > 0
      ? Math.round((completedCount / totalModules) * 100)
      : 0;
    return {
      id: course.id,
      title: course.title,
      progress,
      completed: totalModules > 0 && completedCount === totalModules,
      category: course.category ?? null,
      thumbnailColor: paletteFor(course.id),
    };
  });

  const continueLearningCourses = enrolledCourses
    .filter((c) => !c.completed)
    .map((c) => ({ ...c, lastLesson: null }));

  // Recently viewed: distinct courses behind the most recent completions.
  const recentlyViewed = [];
  const seen = new Set();
  for (const row of completions ?? []) {
    const courseId = row.modules?.course_id;
    if (!courseId || seen.has(courseId)) continue;
    const course = enrolledCourseRows.find((c) => c.id === courseId);
    if (!course) continue;
    seen.add(courseId);
    recentlyViewed.push({
      id: course.id,
      title: course.title,
      category: course.category ?? null,
    });
    if (recentlyViewed.length >= 3) break;
  }

  const recommendedCourses = (allCourses ?? [])
    .filter((c) => !enrolledIds.has(c.id))
    .slice(0, 4)
    .map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description ?? "",
      category: c.category ?? null,
      duration: c.duration ?? null,
      thumbnailColor: paletteFor(c.id),
    }));

  const coursesEnrolled = enrolledCourses.length;
  const averageProgress = coursesEnrolled
    ? Math.round(
        enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / coursesEnrolled
      )
    : 0;
  const completedCount = enrolledCourses.filter((c) => c.completed).length;

  return {
    stats: {
      coursesEnrolled,
      averageProgress,
      completed: completedCount,
    },
    continueLearningCourses,
    enrolledCourses,
    recentlyViewed,
    recommendedCourses,
  };
}

export async function submitEnquiry({ name, email, phone, service, message }) {
  const { error } = await supabase
    .from("enquiries")
    .insert({ name, email, phone, service, message });

  if (error) {
    console.error("submitEnquiry error:", error.message);
    return { ok: false, message: error.message };
  }
  return { ok: true };
}