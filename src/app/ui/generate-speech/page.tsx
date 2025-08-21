"use client";

import React, { useState } from "react";

export default function GenerateSpeechToTextPage() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    try {
      const response = await fetch("/api/generate-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate");
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      console.log("audo::::",audioUrl)
      audio.play();

      audio.addEventListener("ended", () => {
        URL.revokeObjectURL(audioUrl);
      });
    } catch (err) {
      console.error("Speech generation failed:", err);
      if (err instanceof Error) {
        setErr(err.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🗣️ Text to Speech
        </h1>

        {err && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600">
            {err}
          </div>
        )}

        {isLoading && (
          <div className="mb-4 text-blue-600 text-sm font-medium">
            Generating audio...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Enter text to convert..."
            type="text"
            value={text}
            disabled={isLoading}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:bg-gray-100"
          />

          <button
            type="submit"
            disabled={isLoading || !text}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isLoading ? "Generating..." : "Generate Speech"}
          </button>
        </form>
      </div>
    </div>
  );
}
