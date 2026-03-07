"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaBrain, FaShieldAlt, FaCode,
    FaPython, FaReact, FaLinux, FaGitAlt, FaDocker, FaNetworkWired
} from "react-icons/fa";
import {
    SiTensorflow, SiPytorch, SiOpencv, SiRos, SiNextdotjs,
    SiNodedotjs, SiWireshark
} from "react-icons/si";
import SectionWrapper from "./SectionWrapper";

const domains = [
    {
        key: "aiml",
        label: "AI & ML",
        icon: FaBrain,
        accent: "var(--color-teal)",
        bg: "rgba(0, 242, 209, 0.08)",
        border: "rgba(0, 242, 209, 0.2)",
        badgeClass: "badge-ai",
        description: "Building intelligent systems — from computer vision to deep learning research.",
        skills: [
            { name: "Python", Icon: FaPython },
            { name: "TensorFlow", Icon: SiTensorflow },
            { name: "PyTorch", Icon: SiPytorch },
            { name: "OpenCV", Icon: SiOpencv },
            { name: "ROS", Icon: SiRos },
            { name: "NumPy / Pandas", Icon: FaBrain },
            { name: "Scikit-learn", Icon: FaBrain },
            { name: "ConvLSTM / LSTM", Icon: FaBrain },
            { name: "YOLO / Object Det.", Icon: FaBrain },
            { name: "NLP / LLMs", Icon: FaBrain },
            { name: "Knowledge Graphs", Icon: FaBrain },
            { name: "Physics-Informed ML", Icon: FaBrain },
        ],
    },
    {
        key: "cyber",
        label: "Cybersecurity",
        icon: FaShieldAlt,
        accent: "var(--color-cyber)",
        bg: "rgba(249, 115, 22, 0.08)",
        border: "rgba(249, 115, 22, 0.2)",
        badgeClass: "badge-cyber",
        description: "Securing systems through offensive research, VAPT, and AI-powered threat detection.",
        skills: [
            { name: "Network Security", Icon: FaNetworkWired },
            { name: "VAPT", Icon: FaShieldAlt },
            { name: "OWASP Top 10", Icon: FaShieldAlt },
            { name: "Wireshark", Icon: SiWireshark },
            { name: "Burp Suite", Icon: FaShieldAlt },
            { name: "Linux / Kali", Icon: FaLinux },
            { name: "Threat Modelling", Icon: FaShieldAlt },
            { name: "Secure Code Review", Icon: FaShieldAlt },
            { name: "Incident Response", Icon: FaShieldAlt },
            { name: "AI-driven Threat Det.", Icon: FaBrain },
        ],
    },
    {
        key: "dev",
        label: "Software Dev",
        icon: FaCode,
        accent: "var(--color-info)",
        bg: "rgba(56, 189, 248, 0.08)",
        border: "rgba(56, 189, 248, 0.2)",
        badgeClass: "badge-dev",
        description: "Crafting performant, scalable applications from backend APIs to interactive frontends.",
        skills: [
            { name: "React / Next.js", Icon: FaReact },
            { name: "Next.js", Icon: SiNextdotjs },
            { name: "Node.js", Icon: SiNodedotjs },
            { name: "REST APIs", Icon: FaCode },
            { name: "Git / GitHub", Icon: FaGitAlt },
            { name: "Docker", Icon: FaDocker },
            { name: "TypeScript", Icon: FaCode },
            { name: "FastAPI / Flask", Icon: FaCode },
            { name: "PostgreSQL", Icon: FaCode },
            { name: "System Design", Icon: FaCode },
        ],
    },
];

const Skills = () => {
    const [active, setActive] = useState("aiml");
    const current = domains.find((d) => d.key === active);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => {
                const currentIndex = domains.findIndex((d) => d.key === prev);
                const nextIndex = (currentIndex + 1) % domains.length;
                return domains[nextIndex].key;
            });
        }, 4000); // Auto-switch every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <SectionWrapper id="skills">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full"
            >
                <h2 className="section-title">Skills & Tools</h2>

                {/* Domain Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {domains.map(({ key, label, icon: Icon, accent, bg, border }) => (
                        <motion.button
                            key={key}
                            onClick={() => setActive(key)}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border transition-all duration-300"
                            style={
                                active === key
                                    ? { color: accent, background: bg, borderColor: border, boxShadow: `0 0 14px ${bg}` }
                                    : { color: "var(--color-text-secondary)", background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }
                            }
                        >
                            <Icon />
                            {label}
                        </motion.button>
                    ))}
                </div>

                {/* Active Domain Panel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="card max-w-5xl mx-auto"
                        style={{ borderColor: current.border }}
                    >
                        {/* Domain header */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
                            <div
                                className="p-4 rounded-2xl w-fit"
                                style={{ background: current.bg, border: `1px solid ${current.border}` }}
                            >
                                <current.icon style={{ color: current.accent, fontSize: "2.2rem" }} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight mb-2" style={{ color: current.accent }}>
                                    {current.label}
                                </h3>
                                <p className="text-text-secondary max-w-2xl text-[15px] sm:text-base leading-relaxed">{current.description}</p>
                            </div>
                        </div>

                        {/* Skill pill grid */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            {current.skills.map(({ name, Icon }, i) => (
                                <motion.span
                                    key={name}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.25, delay: i * 0.04 }}
                                    className={`${current.badgeClass} cursor-default py-2.5 px-4 shadow-none`}
                                    whileHover={{ y: -2, scale: 1.03 }}
                                >
                                    <Icon className="text-xl" />
                                    <span className="font-medium text-sm">{name}</span>
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </SectionWrapper>
    );
};

export default Skills;
