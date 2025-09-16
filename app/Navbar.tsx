"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Client-only flag

  useEffect(() => {
    setMounted(true); // set mounted after first client render
  }, []);

  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/virendrapatil3299" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/virendra-patil-127961304" },
    { icon: Mail, href: "mailto:virendrapatil3299@gmail.com" },
  ];

  // Don't render until client
  if (!mounted) return null;

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4
        bg-gradient-to-r from-slate-900/60 via-slate-800/40 to-slate-900/60 
        backdrop-blur-xl border-b border-cyan-400/20 rounded-b-2xl shadow-[0_8px_30px_rgb(0,0,0,0.25)]"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-lg"
            whileHover={{ rotateY: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            VP
          </motion.div>
          <span className="font-extrabold text-white text-2xl tracking-wide group-hover:text-cyan-400 transition-colors">
            Virendra Patil
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={item.href}
                  className={`relative font-semibold tracking-wide transition-colors duration-300 group ${
                    isActive ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full transition-all duration-500 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-3">
          {socialLinks.map(({ icon: Icon, href }, idx) => (
            <motion.a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-5 h-5 text-cyan-300" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/20"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-cyan-400/20 px-6 py-6 space-y-4 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block font-semibold tracking-wide ${
                    isActive ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Mobile Social Icons */}
            <div className="flex space-x-4 pt-4 border-t border-white/10">
              {socialLinks.map(({ icon: Icon, href }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5 text-cyan-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
