import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Generate() {
  const [type, setType] = useState("text"); // Default type
  const [prompt, setPrompt] = useState(""); // User input
  const [output, setOutput] = useState(null); // Generated content
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput(null);

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, prompt }), // Changed input to prompt
      });

      const data = await response.json();
      if (data.result) {
        setOutput(data.result);
      } else {
        setOutput("Error generating content.");
      }
    } catch (error) {
      console.error("Error generating:", error);
      setOutput("Error generating content.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-4xl font-bold">AI Generation</h1>

        {/* Select Generation Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 text-black rounded-md"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>

        {/* User Input */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="p-2 text-black rounded-md w-80 h-20"
        ></textarea>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        {/* Display Output */}
        {output && (
          <div className="mt-4 p-4 bg-gray-800 rounded-md text-center">
            {type === "image" ? (
              <img src={output} alt="Generated" className="max-w-full h-auto rounded-md" />
            ) : type === "video" ? (
              <video controls className="max-w-full h-auto rounded-md">
                <source src={output} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : type === "audio" ? (
              <audio controls className="w-full">
                <source src={output} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p>{output}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



