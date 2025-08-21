import { openai } from "@ai-sdk/openai";
import { experimental_generateImage as generateImage } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const { image } = await generateImage({
      model: openai.imageModel("dall-e-3"),
      prompt,
      size: "1024x1024",
      providerOptions: {
        openai: {
          style: "vivid",
          quality: "hd",
        },
      },
    });
    return Response.json(image.base64);
  } catch (err) {
    console.log("Error Streaming Image");

    return Response.json(
      { error: err || "Failed to generate Image" },
      { status: 500 }
    );
  }
}
