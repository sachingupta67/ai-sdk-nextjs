import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      // model: openai("gpt-4.1-nano"),
      // model: anthropic("claude-3-5-haiku-20241022"),
         model: google("gemini-1.5-flash"),
      prompt,
    });

    // because this will be available once the stream is done thats why we have to handle this async

    result.usage.then((usage) => {
      console.log({
        inputToken: usage.inputTokens,
        outputToken: usage.outputTokens,
        totalToken: usage.totalTokens,
      });
    }); 
    // END 
    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.log("Error Streaming text");

    return Response.json(
      { error: err || "Failed to generate text" },
      { status: 500 }
    );
  }
}
