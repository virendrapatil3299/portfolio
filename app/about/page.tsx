"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Palette, Zap, Users, Award, Coffee } from "lucide-react";

// Types
type Skill = {
  name: string;
  level: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
};

type Stat = {
  number: number;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const About: React.FC = () => {
  const skills: Skill[] = [
    { name: "Frontend Development", level: 95, icon: Code2, color: "from-cyan-400 to-blue-500" },
    { name: "UI/UX Design", level: 88, icon: Palette, color: "from-purple-400 to-pink-500" },
    { name: "Backend Development", level: 82, icon: Zap, color: "from-emerald-400 to-teal-500" },
    { name: "Team Leadership", level: 90, icon: Users, color: "from-orange-400 to-red-500" },
  ];

  const stats: Stat[] = [
    { number: 50, label: "Projects Completed", icon: Award },
    { number: 3, label: "Years Experience", icon: Coffee },
    { number: 25, label: "Happy Clients", icon: Users },
  ];

  const [tilt, setTilt] = useState<{ [key: string]: { rotateX: number; rotateY: number } }>({});
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const calcTilt = (e: React.MouseEvent, card: HTMLDivElement | null) => {
    if (!card) return { rotateX: 0, rotateY: 0 };
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * 15;
    const rotateY = ((rect.width / 2 - x) / rect.width) * 15;
    return { rotateX, rotateY };
  };

  if (!mounted) return null;

  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Floating background lights */}
      <div className="absolute inset-0 -z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-sm font-semibold uppercase tracking-wider">
            About Me
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mt-6">
            Turning Ideas into{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Digital Magic
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mt-4 leading-relaxed">
            I craft immersive and functional digital experiences by blending creativity, design, and technology.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-lg text-center hover:scale-105 hover:shadow-cyan-500/40 transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl mb-5">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-extrabold text-white">{stat.number}+</h3>
              <p className="text-slate-300 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Skills & Journey */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Skills */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 shadow-xl overflow-y-auto custom-scrollbar">
            <h3 className="text-3xl font-bold text-white mb-8">My Expertise</h3>
            <div className="space-y-6">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  ref={(el: HTMLDivElement | null) => {
                    skillRefs.current[idx] = el;
                  }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg hover:shadow-cyan-500/30 transition-all cursor-pointer"
                   onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
                    const tiltData = calcTilt(e, skillRefs.current[idx]);
                    setTilt((prev) => ({ ...prev, [skill.name]: tiltData }));
                  }}
                  onMouseLeave={() =>
                    setTilt((prev) => ({ ...prev, [skill.name]: { rotateX: 0, rotateY: 0 } }))
                  }
                  style={{
                    transform: `perspective(600px) rotateX(${tilt[skill.name]?.rotateX || 0}deg) rotateY(${
                      tilt[skill.name]?.rotateY || 0
                    }deg)`,
                    transition: "transform 0.2s ease-out",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`p-2 bg-gradient-to-r ${skill.color} rounded-lg mr-4`}>
                        <skill.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-white">{skill.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-300">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className={`bg-gradient-to-r ${skill.color} h-3 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Journey */}
          <motion.div
            className="bg-gradient-to-br from-purple-700/20 to-cyan-700/20 backdrop-blur-md rounded-3xl p-10 text-white border border-white/10 shadow-xl"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-3xl font-bold mb-6">My Journey</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              I started as a curious developer, passionate about design & problem-solving. I’ve worked
              with startups and global teams, delivering products that combine creativity and functionality.
            </p>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Lifelong learning is my mantra; I explore new technologies to deliver solutions that inspire and provide meaningful experiences.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Figma", "Docker"].map(
                (tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-medium hover:bg-white/20 hover:scale-105 transition-all duration-300 text-center border border-white/10"
                  >
                    {tech}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom Scrollbar CSS */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 255, 0.3);
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default About;
