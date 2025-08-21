"use client";

import Link from "next/link";
import {
  Layers,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  Mic,
  Volume2,
  Code,
} from "lucide-react";

export default function Home() {
  const data = {
    message: "🚀 Playground: AI API Examples",
    routes: [
      {
        name: "Without Stream Response",
        path: "/ui/completion",
        type: "static",
        icon: FileText,
        color: "from-purple-500 to-indigo-500",
      },
      {
        name: "With Stream Response",
        path: "/ui/completion/stream",
        type: "streaming",
        icon: Layers,
        color: "from-pink-500 to-red-500",
      },
      {
        name: "Chat UI | Context-Persistent Conversations",
        path: "/ui/chat",
        type: "streaming",
        icon: MessageSquare,
        color: "from-blue-500 to-cyan-500",
      },
      {
        name: "Structured Data | Recipe Maker (Schema)",
        path: "/ui/structured-data",
        type: "streaming",
        icon: Code,
        color: "from-green-500 to-emerald-500",
      },
      {
        name: "Structured Data as Array | Pokémon Generator",
        path: "/ui/structured-array",
        type: "streaming",
        icon: Code,
        color: "from-yellow-500 to-orange-500",
      },
      {
        name: "Structured Data as Enum | Sentiment Analysis",
        path: "/ui/structured-enum",
        type: "streaming",
        icon: Code,
        color: "from-indigo-500 to-violet-500",
      },
      {
        name: "MultiModal | Analyze Image & PDF",
        path: "/ui/multi-modal-chat",
        type: "streaming",
        icon: ImageIcon,
        color: "from-fuchsia-500 to-pink-500",
      },
      {
        name: "Generate Image | DALL·E 3",
        path: "/ui/generate-image",
        type: "streaming",
        icon: ImageIcon,
        color: "from-orange-500 to-pink-500",
      },
      {
        name: "Transcribe Audio | Whisper-1",
        path: "/ui/transcribe-audio",
        type: "streaming",
        icon: Mic,
        color: "from-teal-500 to-cyan-500",
      },
      {
        name: "Text to Speech | tts-1",
        path: "/ui/generate-speech",
        type: "streaming",
        icon: Volume2,
        color: "from-rose-500 to-red-500",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 tracking-tight">
        {data.message}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {data.routes.map((route, idx) => {
          const Icon = route.icon;
          return (
            <Link
              key={idx}
              href={route.path}
              className="group relative flex flex-col p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105 border border-gray-200"
            >
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${route.color} text-white mb-4 shadow-md group-hover:scale-110 transition`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition">
                {route.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1 capitalize">
                {route.type}
              </p>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-10 pointer-events-none transition ${route.color}"></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
