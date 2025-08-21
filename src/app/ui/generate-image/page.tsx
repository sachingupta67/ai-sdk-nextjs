"use client";
import Image from "next/image";
import { useState } from "react";

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setImgSrc("");
    setPrompt("");
    setError("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setImgSrc(`data:image/png;base64,${data}`);
    } catch (err) {
      console.log("Image Generation failed::::", err);
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[500px]">
      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
        {error && (
          <div className="rounded-lg bg-red-100 text-red-700 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="animate-pulse text-gray-500 text-sm">Loading...</div>
        ) : imgSrc ? (
          <div>
            <Image
              src={imgSrc}
              alt="Generated image"
              width={1024}
              height={1024}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ) : null}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-gray-200 bg-gray-50 p-2"
      >
        <input
          type="text"
          placeholder="Describe your image..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isLoading ? (
          <button
            onClick={stop}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
