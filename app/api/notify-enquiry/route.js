import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Using Resend's shared test sender until a domain is verified in Resend.
// With this sender, Resend only delivers to the email your Resend account
// is registered under — once you verify a domain (e.g. idealinspirer.com),
// switch FROM_EMAIL to something like "notify@idealinspirer.com" and this
// will deliver to anyone.
const FROM_EMAIL = "Ideal Inspirer <onboarding@resend.dev>";
const NOTIFY_EMAIL = "Idealinspirer@gmail.com";

export async function POST(request) {
  try {
    const { name, email, phone, course, message } = await request.json();

    if (!name || !phone) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      reply_to: email || undefined,
      subject: `New enquiry: ${name}`,
      text: [
        `New "Talk to a trainer" enquiry`,
        ``,
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "-"}`,
        `Course interest: ${course || "-"}`,
        `Message: ${message || "-"}`,
      ].join("\n"),
    });

    if (error) {
      console.error("notify-enquiry error:", error);
      return Response.json({ ok: false, error: error.message }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("notify-enquiry error:", err);
    return Response.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}