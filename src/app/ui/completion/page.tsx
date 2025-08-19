"use client";

import { useState } from "react";

export default function ChatForm() {
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState(""); // API Response
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setCompletion(data.text);
      setPrompt("");
    } catch (err) {
      console.log("Error:::::", err);
      setErr(
        err instanceof Error ? err.message : "Completion API Failure: Try Again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md">
      <div className="flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Chat Body */}
        <div className="flex-1 max-h-80 overflow-y-auto p-4 space-y-3 text-sm">
          {err && (
            <div className="rounded-lg bg-red-100 text-red-700 px-3 py-2">
              {err}
            </div>
          )}

          {isLoading ? (
            <div className="animate-pulse text-gray-500">Loading...</div>
          ) : completion ? (
            <div className="rounded-lg bg-gray-100 px-3 py-2 text-gray-800">
              {completion}
            </div>
          ) : (
            <div className="text-gray-400 text-center text-xs">
              Start a conversation 👋
            </div>
          )}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-gray-200 bg-gray-50 p-2"
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={prompt || ""}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
