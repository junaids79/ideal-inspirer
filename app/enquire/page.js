import EnquireForm from "@/components/EnquireForm";
import { getCourses } from "@/lib/data";

export const metadata = {
  title: "Talk to a trainer | Ideal Inspirer",
};
export const dynamic = "force-dynamic";

export default async function EnquirePage() {
  const courses = await getCourses();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-700">
        Get in touch
      </p>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">
        Talk to a trainer
      </h1>
      <p className="mt-2 font-body text-sm text-ink/60">
        Tell us where you're starting from and where you want to go — we'll
        point you at the right course and get back to you.
      </p>

      <EnquireForm courses={courses} />
    </div>
  );
}