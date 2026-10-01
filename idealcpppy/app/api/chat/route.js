import Groq from "groq-sdk";
import { getCourses } from "@/lib/data";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const PRIMARY_MODEL =
  process.env.GROQ_MODEL || "openai/gpt-oss-120b";

const FALLBACK_MODEL =
  process.env.GROQ_FALLBACK_MODEL || "openai/gpt-oss-20b";

export async function POST(req) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { error: "GROQ_API_KEY is missing" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    const courses = await getCourses();

    const courseList = courses.length
      ? courses
          .map((c) => {
            const price = c.is_free ? "Free" : `₹${c.price}`;

            const bits = [c.category, c.level, c.duration]
              .filter(Boolean)
              .join(" · ");

            return `- ${c.title} (${price}${bits ? `, ${bits}` : ""})${
              c.description ? `: ${c.description}` : ""
            }`;
          })
          .join("\n")
      : "No courses are currently published.";

    const systemMessage = {
      role: "system",
      content:
        "You are a helpful training advisor for Ideal Inspirer. Answer questions about courses, careers, and learning.\n\n" +
        "Only recommend courses from the list below — these are the actual programs currently available. " +
        "Never invent a course name, price, or detail that isn't in this list. " +
        "If nothing in the list fits what the learner is asking for, say so honestly instead of making something up.\n\n" +
        `Currently available courses:\n${courseList}`,
    };

    let completion;

    try {
      // Try primary model
      completion = await groq.chat.completions.create({
        model: PRIMARY_MODEL,
        messages: [systemMessage, ...messages],
      });
    } catch (primaryError) {
      console.error(
        `Primary model failed (${PRIMARY_MODEL}):`,
        primaryError.message
      );

      // Try fallback model
      completion = await groq.chat.completions.create({
        model: FALLBACK_MODEL,
        messages: [systemMessage, ...messages],
      });
    }

    return Response.json({
      reply:
        completion.choices[0].message.content +
        "\n\n📞 Contact our admission counsellor at +91 9703979806 for more queries.",
    });
  } catch (err) {
    console.error("Chat API error:", err);

    return Response.json(
      {
        error: "The AI advisor is temporarily unavailable. Please try again.",
      },
      { status: 500 }
    );
  }
}