"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { pokemonUISchema } from "@/app/api/structured-array/schema";

const StructuredArray = () => {
  const [type, setType] = useState("");
  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/structured-array",
    schema: pokemonUISchema,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit({ type });
    setType("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Pokémon Generator
      </h1>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-100 text-red-700 px-4 py-3 mb-4 shadow">
          {error.message}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="animate-pulse text-gray-500 text-sm text-center mb-4">
          ⏳ Loading...
        </div>
      )}

      {/* Pokémon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {object?.map((pokemon) => (
          <div
            key={pokemon?.name}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              {pokemon?.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {pokemon?.abilities?.map((ability) => (
                <span
                  key={ability}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {ability}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-3 border-t border-gray-200 bg-gray-50 p-4 rounded-xl shadow-inner"
      >
        <input
          type="text"
          placeholder="Enter Pokémon type (e.g., Fire)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {isLoading ? (
          <button
            type="button"
            onClick={stop}
            className="w-full sm:w-auto px-5 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 transition shadow"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!type || isLoading}
            className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition shadow"
          >
            Generate
          </button>
        )}
      </form>
    </div>
  );
};

export default StructuredArray;
