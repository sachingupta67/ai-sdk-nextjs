import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { pokemonSchema } from "./schema";

export async function POST(req: Request) {
  try {
    const { type } = await req.json();
    const result = streamObject({
      model: openai("gpt-5-nano"),
      output: "array",
      schema: pokemonSchema,
      prompt: `Generate a list of 5 ${type} type pokemon`,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.log("Error Pokemon Generator::::", err);
    return new Response("Error Pokemon Generator", { status: 500 });
  }
}
