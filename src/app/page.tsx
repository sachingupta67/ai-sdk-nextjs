import Link from "next/link";

export default function Home() {
  const data = {
    message: "Available Completion API Examples",
    routes: [
      {
        name: "Without Stream Response",
        path: "/ui/completion",
        type: "static",
      },
      {
        name: "With Stream Response",
        path: "/ui/completion/stream",
        type: "streaming",
      },
      {
        name: "Chat UI | So it can't forget previous chat info or context",
        path: "/ui/chat",
        type: "streaming",
      },
       {
        name: "Structured Data | Ex: A Recipe Maker with Custom Schema - Stream Object",
        path: "/ui/structured-data",
        type: "streaming",
      },
      {
        name: "Structured Data as Array | Ex: Pokemon list generator",
        path: "/ui/structured-array",
        type: "streaming",
      },
      {
        name: "Structured Data as Enum | Ex: get sentiment - positive , negative, neutral",
        path: "/ui/structured-enum",
        type: "streaming",
      },
      {
        name: "MultiModal Modal | Analyze Image & PDF as attachment",
        path: "/ui/multi-modal-chat",
        type: "streaming",
      },
      {
        name: "Generate Image | Dalle-3 - OPENAI",
        path: "/ui/generate-image",
        type: "streaming",
      },
       {
        name: "Transcribe Audio | Whisper-1 - OPENAI",
        path: "/ui/transcribe-audio",
        type: "streaming",
      },
      {
        name: "Text to Speech | tts-1 - OPENAI",
        path: "/ui/generate-speech",
        type: "streaming",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {data.message}
      </h1>

      <div className="space-y-4 w-full max-w-md">
        {data.routes.map((route, idx) => (
          <Link
            key={idx}
            href={route.path}
            className="block px-6 py-4 bg-white rounded-xl shadow hover:shadow-lg border border-gray-200 transition"
          >
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-medium">{route.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
