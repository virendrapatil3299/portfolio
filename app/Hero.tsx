"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshWobbleMaterial, Stars } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";

const texts = ["Creative Developer", "Digital Artist", "Problem Solver"];

const socials = [
  { Icon: FaGithub, href: "https://github.com/virendrapatil3299" },
  { Icon: FiLinkedin, href: "https://www.linkedin.com/in/virendra-patil-127961304" },
  { Icon: Mail, href: "mailto:virendrapatil3299@gmail.com" },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate titles every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden text-center px-6">
      {/* === 3D STAR + OBJECT BACKGROUND === */}
      <div className="absolute inset-0 -z-20">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Suspense fallback={null}>
            {/* Starry background */}
            <Stars radius={100} depth={50} count={5000} factor={4} fade />

            {/* Floating rotating cube */}
            <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
              <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <MeshWobbleMaterial
                  factor={2}
                  speed={1.5}
                  color="#06b6d4"
                  transparent
                  opacity={0.7}
                />
              </mesh>
            </Float>

            {/* Floating sphere */}
            <Float speed={3} rotationIntensity={1} floatIntensity={2}>
              <mesh position={[3, 1.5, -2]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#9333ea" emissive="#9333ea" emissiveIntensity={0.5} />
              </mesh>
            </Float>

            {/* Lights */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />

            {/* Orbit controls */}
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
          </Suspense>
        </Canvas>
      </div>

      {/* === UI FOREGROUND (Text + Buttons + Socials) === */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto bg-white/5 p-12 rounded-3xl shadow-2xl backdrop-blur-md border border-white/10"
        style={{ perspective: 1000 }}
        whileHover={{ rotateX: 8, rotateY: -8, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
      >
        {/* Name */}
        <motion.h1
          className="text-4xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient drop-shadow-lg"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Hi, I’m Virendra Patil
        </motion.h1>

        {/* Rotating titles */}
        <AnimatePresence mode="wait">
          <motion.p
            key={texts[currentIndex]}
            className="text-xl md:text-3xl mb-8 text-gray-300 h-14 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {texts[currentIndex]}
            <span className="ml-1 text-cyan-400 animate-pulse">|</span>
          </motion.p>
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white shadow-lg shadow-cyan-500/30 transition-colors hover:from-cyan-400 hover:to-blue-500">
              View My Work
            </button>
          </motion.a>

          <motion.a
            href="/cv.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-8 py-4 rounded-full font-semibold border-2 border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-300 transition-all">
              Download CV
            </button>
          </motion.a>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-6 mt-10">
          {socials.map(({ Icon, href }, idx) => (
            <motion.a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.2, rotate: 12 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
