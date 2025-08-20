"use client";

// since we are using and single text we have to we will not use useObject
import { useState } from "react";

export default function StructuredEnumPage() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const analyseSentiment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSentiment("");
    try {
      const response = await fetch("/api/structured-enum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");
      setSentiment(data);
    } catch (err) {
      console.error(err);
      setErr(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentData = () => {
    switch (sentiment) {
      case "positive":
        return { text: "Positive", icon: "😊", style: "bg-green-100 text-green-800" };
      case "negative":
        return { text: "Negative", icon: "😞", style: "bg-red-100 text-red-800" };
      case "neutral":
      case "neural":
        return { text: "Neutral", icon: "😐", style: "bg-gray-100 text-gray-800" };
      default:
        return { text: "NOT SURE", icon: "", style: "" };
    }
  };

  const sentimentData = getSentimentData();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Sentiment Analyzer
      </h1>

      {err && (
        <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg shadow">
          {err}
        </div>
      )}

      {isLoading && (
        <div className="mb-4 text-gray-500 animate-pulse">⏳ Analyzing sentiment...</div>
      )}

      {!isLoading && sentiment && (
        <div
          className={`mb-4 px-6 py-4 rounded-xl font-semibold shadow flex items-center gap-3 ${sentimentData.style}`}
        >
          <span className="text-xl">{sentimentData.icon}</span>
          <span className="text-lg">{sentimentData.text}</span>
        </div>
      )}

      <form
        onSubmit={analyseSentiment}
        className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Enter text to analyze"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition shadow"
        >
          Analyze
        </button>
      </form>
    </div>
  );
}
