import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import styles from "../styles/Background.module.css"; // Import module CSS

export default function Background() {
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      bgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={bgRef} className={styles.background}>
      {/* Deep-Space Starfield Effect */}
      <div className={styles.stars}></div>

      {/* Animated Floating Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        className={styles.orbBlue}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror" }}
        className={styles.orbCyan}
      />
    </div>
  );
}










