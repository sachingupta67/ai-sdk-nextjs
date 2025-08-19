"use client";

import { useCompletion } from "@ai-sdk/react";

export default function StreamPage() {
  const {
    input,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
    error,
    stop,
    setInput, // Auto clear when submit
  } = useCompletion({
    api: "/api/stream",
  });

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[500px]">
      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
        {error && (
          <div className="rounded-lg bg-red-100 text-red-700 px-3 py-2 text-sm">
            {error.message}
          </div>
        )}

        {isLoading && !completion && (
          <div className="animate-pulse text-gray-500 text-sm">Loading...</div>
        )}

        {completion ? (
          <div className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 whitespace-pre-wrap">
            {completion}
          </div>
        ) : (
          !isLoading &&
          !error && (
            <div className="text-gray-400 text-center text-xs">
              Start a conversation 👋
            </div>
          )
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setInput("");
          handleSubmit(e);
        }}
        className="flex items-center gap-2 border-t border-gray-200 bg-gray-50 p-2"
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
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
