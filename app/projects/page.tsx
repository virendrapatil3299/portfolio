"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

// 3D Tilt Helper
const calculateTilt = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement | null) => {
  if (!card) return { rotateX: 0, rotateY: 0 };
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 10;
  const rotateY = ((centerX - x) / centerX) * -10;
  return { rotateX, rotateY };
};

const Projects = () => {
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState<{ [key: number]: { rotateX: number; rotateY: number } }>({});
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const projects = [
    {
      id: 1,
      title: "FinTech Dashboard",
      description: "Real-time analytics dashboard for financial management with advanced reporting.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "TypeScript", "D3.js", "Node.js"],
      category: "Web Application",
      color: "from-cyan-400 to-blue-600",
    },
    {
      id: 2,
      title: "AI Content Studio",
      description: "AI-powered content creation with automated workflows and collaborative editing.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Next.js", "Python", "OpenAI", "PostgreSQL"],
      category: "AI Platform",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      title: "Smart Home Hub",
      description: "IoT solution for home automation, energy monitoring, and voice control.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Vue.js", "IoT", "WebSocket", "MongoDB"],
      category: "IoT Solution",
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: 4,
      title: "E-Learning Platform",
      description: "Interactive learning system with gamification, video streaming, and progress tracking.",
      image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["React", "Firebase", "WebRTC", "Stripe"],
      category: "Education",
      color: "from-orange-400 to-red-500",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse-slow -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse-slow translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mb-6 backdrop-blur-md border border-white/10"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-purple-200 font-semibold text-sm tracking-wide uppercase">
              Featured Work
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-black text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Recent{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore my latest work showcasing innovative solutions and cutting-edge technologies
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              ref={(el: HTMLDivElement | null) => {
                cardRefs.current[idx] = el;
              }}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-3xl"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
                const tiltData = calculateTilt(e, cardRefs.current[idx]);
                setTilt((prev) => ({ ...prev, [project.id]: tiltData }));
              }}
              onMouseLeave={() =>
                setTilt((prev) => ({ ...prev, [project.id]: { rotateX: 0, rotateY: 0 } }))
              }
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(600px) rotateX(${tilt[project.id]?.rotateX || 0}deg) rotateY(${tilt[project.id]?.rotateY || 0}deg)`,
              }}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-70 transition-all duration-500 rounded-3xl`}
              ></div>

              {/* Project Image */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay Buttons */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 space-x-4">
                  <button className="p-4 bg-white rounded-2xl text-slate-900 hover:bg-white/90 shadow-lg hover:scale-110 transition-all duration-200 transform">
                    <ExternalLink className="w-6 h-6" />
                  </button>
                  <button className="p-4 bg-white rounded-2xl text-slate-900 hover:bg-white/90 shadow-lg hover:scale-110 transition-all duration-200 transform">
                    <Github className="w-6 h-6" />
                  </button>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-medium shadow-md">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300" />
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-white/20 to-white/10 text-gray-200 rounded-xl text-sm font-medium hover:from-white/30 hover:to-white/20 transition-all duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <button className="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <span>View All Projects</span>
            <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
