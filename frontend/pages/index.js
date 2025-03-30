import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "../styles/Home.module.css"; // Importing Home.module.css

export default function Home() {
  const containerRef = useRef(null);
  const [backendMessage, setBackendMessage] = useState(""); // Store backend response
  const [prompt, setPrompt] = useState(""); // User input for AI prompt
  const [aiResponse, setAiResponse] = useState(""); // AI response state

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.2 }
    );

    // ✅ Connect frontend to backend
    fetch("http://localhost:5000/") // Ensure backend is running on port 5000
      .then((response) => response.json()) // ✅ Corrected to JSON
      .then((data) => setBackendMessage(data.message)) // ✅ Extract "message" key
      .catch((error) => console.error("Error connecting to backend:", error));
  }, []);

  // ✅ Function to fetch AI-generated text
  const handleGenerateText = async () => {
    if (!prompt) return;
    try {
      const response = await fetch("http://localhost:5000/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setAiResponse(data.response || "Error generating text");
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className={styles.container}> {/* Using correct class from Home.module.css */} 
      {/* Animated Background */} 
      <Background />

      {/* Navbar Component */} 
      <Navbar />

      {/* Hero Section */}
      <motion.div
        ref={containerRef}
        className={styles.heroSection} // Using correct class
      >
        {/* "Create with AI" - Adjusted Lower */}
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={styles.heroTitle} // Matches CSS Module
          style={{ marginTop: "20px" }} // Moves it lower
        >
          Create with AI
        </motion.h2>

        {/* Updated class name to match CSS */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className={styles.heroDescription} // Corrected class name
        >
          Generate AI-powered images, text, music, and videos effortlessly with
          Spheron’s decentralized GPU network.
        </motion.p>

        {/* ✅ Show backend response */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={styles.backendMessage}
          style={{ color: "#38bdf8", fontWeight: "bold" }}
        >
          {backendMessage ? `Backend says: ${backendMessage}` : "Connecting to backend..."}
        </motion.p>

        {/* ✅ User Input for AI Text Generation */}
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={styles.textInput}
          />
          <motion.button
            onClick={handleGenerateText}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #38bdf8" }}
            whileTap={{ scale: 0.95 }}
            className={styles.ctaButton} // Corrected class name
          >
            Generate
          </motion.button>
        </div>

        {/* ✅ Display AI Response */}
        {aiResponse && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={styles.aiResponse}
          >
            {aiResponse}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}






