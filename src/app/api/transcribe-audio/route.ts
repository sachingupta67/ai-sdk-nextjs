import { openai } from "@ai-sdk/openai";
import { experimental_transcribe as transcribe } from "ai";

export async function POST(req: Request) {
  try {
    // browser will send file as formData
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    if (!audioFile) {
      return new Response("No Audio file provided", { status: 400 });
    }

    // Transcribe function needs an audio in uInt8array not a file object

    // 1. Convert file to arrayBuffer
    const arrayBuffer = await audioFile.arrayBuffer();

    // 2. uint8Array

    const uint8Array = new Uint8Array(arrayBuffer);

    const transcript = await transcribe({
      model: openai.transcription("whisper-1"),
      audio: uint8Array,
    });
    return Response.json(transcript);
    
  } catch (err) {
    console.log("Error Transcribe audio");

    return Response.json(
      { error: err || "Failed to Transcribe" },
      { status: 500 }
    );
  }
}
