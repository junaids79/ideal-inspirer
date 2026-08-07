import Groq from "groq-sdk";
import { getCourses } from "@/lib/data";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { error: "GROQ_API_KEY is missing" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    // Pull the actual published courses so the advisor recommends real
    // programs instead of inventing plausible-sounding ones.
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

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful training advisor for Ideal Inspirer. Answer questions about courses, careers, and learning.\n\n" +
            "Only recommend courses from the list below — these are the actual programs currently available. " +
            "Never invent a course name, price, or detail that isn't in this list. " +
            "If nothing in the list fits what the learner is asking for, say so honestly instead of making something up.\n\n" +
            `Currently available courses:\n${courseList}`,
        },
        ...messages,
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}