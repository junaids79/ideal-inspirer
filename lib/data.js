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