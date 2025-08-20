"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema } from "@/app/api/structured-data/schema";

const StructuredData = () => {
  const [dishName, setDishName] = useState("");
  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/structured-data",
    schema: recipeSchema,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit({ dish: dishName });
    setDishName("")
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden h-[600px]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-lg font-semibold">🍽 AI Recipe Generator</h1>
        <p className="text-sm opacity-90">
          Get structured recipe details instantly
        </p>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 text-sm">
        {error && (
          <div className="rounded-lg bg-red-100 text-red-700 px-3 py-2 text-sm shadow">
            {error.message}
          </div>
        )}

        {isLoading && (
          <div className="animate-pulse text-gray-500 text-sm">
            ⏳ Cooking your recipe...
          </div>
        )}

        {/* Recipe Output */}
        {object?.recipe && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {object.recipe.name}
              </h2>
            </div>

            {object.recipe.ingredients && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  🥗 Ingredients
                </h3>
                <ul className="grid grid-cols-2 gap-3">
                  {object.recipe.ingredients.map((item, index) => (
                    <li
                      key={index}
                      className="p-3 border rounded-xl bg-gray-50 shadow-sm"
                    >
                      <p className="font-medium text-gray-800">{item?.name}</p>
                      <p className="text-gray-600 text-sm">{item?.amount}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {object.recipe.steps && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  👨‍🍳 Steps
                </h3>
                <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-700">
                  {object.recipe.steps.map((item, index) => (
                    <li
                      key={index}
                      className="p-2 bg-gray-50 rounded-lg shadow-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-gray-200 bg-gray-50 p-4"
      >
        <input
          type="text"
          placeholder="Enter your dish name (e.g., Pasta)"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isLoading ? (
          <button
            type="button"
            onClick={stop}
            className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 transition shadow"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!dishName || isLoading}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition shadow"
          >
            Generate
          </button>
        )}
      </form>
    </div>
  );
};

export default StructuredData;
