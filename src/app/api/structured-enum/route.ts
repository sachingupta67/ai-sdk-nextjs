import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const result = await generateObject({
      model: openai("gpt-5-nano"),
      output: "enum",
      enum: ["positive", "negative", "enum"],
      prompt: `Classify the sentiment in this text : ${text}`,
    });
    return result.toJsonResponse(); // enum return single value, not need of streaming
  } catch (err) {
    console.log("Error  ::::", err);
    return new Response("Error  ", { status: 500 });
  }
}
