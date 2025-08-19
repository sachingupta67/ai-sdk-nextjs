"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

/*
How Message Look Like

const message: UIMessage[];

type UIMessage = {
  id: string;
  role: "user" | "assistant";
  part: TextUIPart[];
};

type TextUIPart = {
  type: "text";
  text: string;
};

const messages = [
  {
    id: "msg-1",
    role: "user",
    parts: [
      {
        type: "text",
        text: "What is react",
      },
    ],
  },
  {
    id: "msg-2",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Its a react library...",
      },
    ],
  },
];

*/

export default function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };


  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[500px]">
      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`px-3 py-2 rounded-lg whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto max-w-[80%]"
                : "bg-gray-100 text-gray-800 self-start mr-auto max-w-[80%]"
            }`}
          >
            {m.parts.map((item, index) => {
              switch (item.type) {
                case "text":
                  return <div key={`${m.id}-${index}`}>{item.text}</div>;

                default:
                  return null;
              }
            })}
          </div>
        ))}

        {error && (
          <div className="rounded-lg bg-red-100 text-red-700 px-3 py-2 text-sm">
            {error.message}
          </div>
        )}

        {(status === "streaming" || status === "submitted") && (
          <div className="animate-pulse text-gray-500 text-sm">{status}</div>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={submitHandler}
        className="flex items-center gap-2 border-t border-gray-200 bg-gray-50 p-2"
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {status === "streaming" || status === "submitted" ? (
          <button
            onClick={stop}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={status !== "ready"}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
