import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Mobile menu icons
import styles from "../styles/Navbar.module.css"; // Import module CSS

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
    >
      {/* Logo */}
      <h1 className={styles.logo}>Spheron Create</h1>

      {/* Desktop Menu */}
      <div className={styles.desktopMenu}>
        <Link href="/generate" className={styles.navLink}>
          Generate
        </Link>
        <Link href="/history" className={styles.navLink}>
          History
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className={styles.mobileMenuButton}>
        <button onClick={() => setIsOpen(!isOpen)} className={styles.menuIcon}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.mobileDropdown}
        >
          <Link href="/generate" className={styles.navLink} onClick={() => setIsOpen(false)}>
            Generate
          </Link>
          <Link href="/history" className={styles.navLink} onClick={() => setIsOpen(false)}>
            History
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}




  