"use client";

import React, { useRef, useState } from "react";

interface TranscriptResult {
  text: string;
  segments?: Array<{ start: number; end: number; text: string }>;
  language?: string;
  durationInSeconds: number;
}

export default function TranscribeAudioPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [transcript, setTranscript] = useState<TranscriptResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an audio file.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("audio", selectedFile);

      const response = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setTranscript(data);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Transcription failed:", err);
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setTranscript(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setTranscript(null);
      setError("");
    }
  };

  console.log("Error:::",error)
  console.log("transcript:::",transcript)

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">🎙️ Audio Transcription</h2>

      {error && (
        <div className="p-3 text-red-700 bg-red-100 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="text-blue-600 animate-pulse">⏳ Transcribing...</div>
      )}

      {transcript && !isLoading && (
        <div className="p-4 border rounded-xl bg-gray-50 space-y-2">
          <h3 className="font-medium text-gray-800">Transcript:</h3>
          <p className="text-gray-700">{transcript.text}</p>
          {transcript.language && (
            <p className="text-sm text-gray-500">Language: {transcript.language}</p>
          )}
          {transcript.durationInSeconds && (
            <p className="text-sm text-gray-500">
              Duration: {transcript.durationInSeconds}s
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {selectedFile && (
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
            <span className="text-sm text-gray-700 truncate">
              🎵 {selectedFile.name}
            </span>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        )}

        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            id="audio-upload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="audio-upload"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300 transition"
          >
            {selectedFile ? "Change File" : "Select Audio File"}
          </label>

          <button
            type="submit"
            disabled={isLoading || !selectedFile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Transcribing..." : "Transcribe"}
          </button>
        </div>
      </form>
    </div>
  );
}
