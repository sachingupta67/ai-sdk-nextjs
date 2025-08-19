import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: openai("gpt-4.1-nano"),
      prompt,
    });
    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.log("Error Streaming text");

    return Response.json(
      { error: err || "Failed to generate text" },
      { status: 500 }
    );
  }
}
