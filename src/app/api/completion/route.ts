import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const response = await generateText({
      model: openai("gpt-4.1-nano"),
      prompt,
    });

    return Response.json({ text: response.text });
  } catch (err) {
    console.log("API::::: COMPLETION::::::ERR:", err);

    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
