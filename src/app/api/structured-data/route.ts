import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { recipeSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { dish } = await req.json();
    const result = streamObject({
      model: openai("gpt-5-nano"),
      schema: recipeSchema,
      prompt: `Generate recipe for ${dish}`,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.log("Structured data failed to stream", err);
    return new Response("Failed to generate recipe", { status: 500 });
  }
}
