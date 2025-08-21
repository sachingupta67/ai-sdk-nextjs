"use client";

import { RotateCcw } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export default function GenerateSpeechToTextPage() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [hasAudio, setHasAudio] = useState(false);
  const audioUrlRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
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
      audioUrlRef.current = URL.createObjectURL(blob);
      audioRef.current = new Audio(audioUrlRef.current);
      setHasAudio(true);

      audioRef.current.play();

      // audio.addEventListener("ended", () => {
      //   URL.revokeObjectURL(audioUrl); // not cleaning up , audio wuill be availble to replay
      // });
    } catch (err) {
      console.error("Speech generation failed:", err);
      if (err instanceof Error) {
        setErr(err.message || "Something went wrong");
      }
      setHasAudio(false);
    } finally {
      setIsLoading(false);
    }
  };

  const replayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    return () => {
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🗣️ Text to Speech
        </h1>

        {hasAudio && !isLoading && (
          <button
            onClick={replayAudio}
            className="flex mb-2 items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:opacity-90 active:scale-95 transition"
          >
            <RotateCcw size={18} />
            Replay Audio
          </button>
        )}
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
