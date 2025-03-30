import { useState } from "react";
import { motion } from "framer-motion";

export default function Settings() {
  const [theme, setTheme] = useState("neon");
  const [quality, setQuality] = useState(80);
  const [speed, setSpeed] = useState(50);
  const [creativity, setCreativity] = useState(60);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold text-glow text-center"
      >
        Settings
      </motion.h2>

      {/* Theme Selection */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-neon-blue">Theme</h3>
        <div className="flex gap-4 mt-2">
          {['light', 'dark', 'neon'].map((mode) => (
            <button
              key={mode}
              onClick={() => setTheme(mode)}
              className={`px-4 py-2 rounded-lg border border-neon-blue transition-all hover:shadow-neon ${theme === mode ? 'bg-neon-blue text-black' : 'bg-gray-900 text-white'}`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* AI Settings */}
      <div className="mt-8 w-full max-w-lg">
        <h3 className="text-xl font-bold text-neon-blue">AI Generation Settings</h3>
        <div className="mt-4">
          <label className="block text-white">Quality ({quality}%)</label>
          <input type="range" min="50" max="100" value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full" />
        </div>
        <div className="mt-4">
          <label className="block text-white">Speed ({speed}%)</label>
          <input type="range" min="20" max="100" value={speed} onChange={(e) => setSpeed(e.target.value)} className="w-full" />
        </div>
        <div className="mt-4">
          <label className="block text-white">Creativity ({creativity}%)</label>
          <input type="range" min="30" max="100" value={creativity} onChange={(e) => setCreativity(e.target.value)} className="w-full" />
        </div>
      </div>
    </div>
  );
}

