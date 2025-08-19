import Link from "next/link";

export default function Home() {
  const data = {
    message: "Available Completion API Examples",
    routes: [
      {
        name: "Without Stream Response",
        path: "/completion",
        type: "static",
      },
      {
        name: "With Stream Response",
        path: "/completion/stream",
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
