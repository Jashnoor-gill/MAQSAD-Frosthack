import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "../styles/Home.module.css"; // Importing Home.module.css

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.2 }
    );
  }, []);

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

        {/* "Get Started" Button - Now Properly Styled */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #38bdf8" }}
          whileTap={{ scale: 0.95 }}
          className={styles.ctaButton} // Corrected class name
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}




