"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I can help you pick a program or answer questions about a module. What are you working on?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        throw new Error(`Chat request failed (${res.status})`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(
        "Couldn't reach the advisor right now. Check that ANTHROPIC_API_KEY is set on the server."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card flex h-96 flex-col overflow-hidden">
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-2 font-body text-sm ${
              m.role === "user"
                ? "ml-auto bg-ink text-white"
                : "bg-teal-50 text-ink"
            }`}
          >
            {m.content}
          </div>
        ))}
        {error && (
          <p className="font-body text-xs text-red-600">{error}</p>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={send} className="flex gap-2 border-t border-ink/10 p-3">
        <input
          className="field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a course or module…"
          disabled={sending}
        />
        <button type="submit" disabled={sending} className="btn-primary px-4 py-2 text-sm">
          {sending ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}
