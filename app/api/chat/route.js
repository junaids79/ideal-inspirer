import Groq from "groq-sdk";

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

    // const { message } = await req.json();

const { messages } = await req.json();

const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "system",
      content:
        "You are a helpful training advisor for Ideal Inspirer. Answer questions about courses, careers, and learning.",
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