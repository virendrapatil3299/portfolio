"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure code runs only on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Message sent successfully 🚀");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message ❌");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "virendrapatil3299@gmail.com",
      description: "Send me an email anytime",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8390153102",
      description: "Call me during business hours",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Maharashtra, India",
      description: "Available for local meetings",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Toast notifications */}
      <Toaster position="top-right" />

      {/* 3D Starry Background */}
      <div className="absolute inset-0 -z-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={3000} factor={4} fade />
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating Orbs */}
      {isClient &&
        Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 blur-xl opacity-20"
            style={{
              top: Math.random() * window.innerHeight,
              left: Math.random() * window.innerWidth,
              zIndex: 0,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-white font-semibold text-sm tracking-wide uppercase">
              Get In Touch
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Lets Create
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              Together
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Lets discuss your project and create something amazing
            together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
            {contactMethods.map((method) => (
              <motion.div
                key={method.title}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-gradient-to-r ${method.color} rounded-xl`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{method.title}</h4>
                    <p className="text-cyan-400 font-medium mb-1">{method.value}</p>
                    <p className="text-slate-400 text-sm">{method.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-8">Send me a message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 text-white placeholder-slate-400 rounded-xl border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 text-white placeholder-slate-400 rounded-xl border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    required
                  />
                </div>

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="project">New Project</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 text-white placeholder-slate-400 rounded-xl border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
