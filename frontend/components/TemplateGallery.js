import { useState } from "react";
import { motion } from "framer-motion";

const templates = [
  { id: 1, type: "image", name: "Cyberpunk Cityscape", prompt: "Generate a futuristic cyberpunk city at night with neon lights." },
  { id: 2, type: "text", name: "Sci-Fi Story Starter", prompt: "In the year 2145, humanity discovered..." },
  { id: 3, type: "music", name: "Synthwave Beat", prompt: "Create an 80s-inspired synthwave music loop." },
  { id: 4, type: "video", name: "AI-Generated Animation", prompt: "Generate a short animated sequence of a space journey." },
];

export default function Templates() {
  const [selectedType, setSelectedType] = useState("all");

  const filteredTemplates = selectedType === "all" ? templates : templates.filter(t => t.type === selectedType);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white flex flex-col items-center justify-center p-6">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold text-glow text-center"
      >
        Template Gallery
      </motion.h2>
      
      {/* Filter Buttons */}
      <div className="flex gap-4 mt-4">
        {['all', 'image', 'text', 'music', 'video'].map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg border border-neon-blue transition-all hover:shadow-neon ${selectedType === type ? 'bg-neon-blue text-black' : 'bg-gray-900 text-white'}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="w-full max-w-4xl mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-gray-900 border border-neon-blue rounded-lg shadow-md hover:shadow-neon transition-all cursor-pointer"
          >
            <h3 className="text-lg font-bold text-neon-blue">{template.name}</h3>
            <p className="text-gray-300 mt-1">{template.prompt}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
