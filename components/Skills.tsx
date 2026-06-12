"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Terminal, Wrench } from "lucide-react";
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiFigma,
} from "react-icons/si";
import { Coffee, Code2 as VsCodeIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { skills } from "@/lib/data";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/motion";

const iconMap: Record<string, { icon: IconType; color: string }> = {
  "C++":        { icon: SiCplusplus as IconType, color: "#00599C" },
  "Java":       { icon: Coffee as unknown as IconType, color: "#f89820" },
  "Python":     { icon: SiPython as IconType,    color: "#3776AB" },
  "JavaScript": { icon: SiJavascript as IconType, color: "#d4a900" },
  "HTML5":      { icon: SiHtml5 as IconType,     color: "#E34F26" },
  "CSS3":       { icon: SiCss as IconType,       color: "#1572B6" },
  "React":      { icon: SiReact as IconType,     color: "#00b8d4" },
  "Node.js":    { icon: SiNodedotjs as IconType, color: "#339933" },
  "Git":        { icon: SiGit as IconType,       color: "#F05032" },
  "GitHub":     { icon: SiGithub as IconType,    color: "#24292e" },
  "VS Code":    { icon: VsCodeIcon as unknown as IconType, color: "#007ACC" },
  "Figma":      { icon: SiFigma as IconType,     color: "#F24E1E" },
};

const categoryIconMap = {
  code:     Code2,
  terminal: Terminal,
  wrench:   Wrench,
} as const;

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-padding"
    >
      <div ref={ref} className="container-width">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2
            id="skills-heading"
            className="font-display text-headline-lg text-on-surface mb-4"
          >
            Technical Proficiency
          </h2>
          <p className="font-body text-body-md text-on-surface-variant max-w-md mx-auto">
            A curated collection of tools and technologies I&apos;ve mastered.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
          role="list"
        >
          {skills.map((skill) => {
            const CatIcon =
              categoryIconMap[skill.icon as keyof typeof categoryIconMap] ?? Code2;

            return (
              <motion.article
                key={skill.category}
                variants={scaleIn}
                role="listitem"
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px -10px rgba(166,107,45,0.15)",
                }}
                className="glass-card p-8 rounded-xl transition-all duration-300 cursor-default"
                aria-label={`${skill.category} skills`}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-7 text-primary">
                  <CatIcon size={22} strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="font-display text-headline-sm text-on-surface">
                    {skill.category}
                  </h3>
                </div>

                {/* Icon badges */}
                <ul
                  className="flex flex-wrap gap-3"
                  role="list"
                  aria-label={`${skill.category} technologies`}
                >
                  {skill.items.map((name, i) => {
                    const entry = iconMap[name];
                    if (!entry) return null;
                    const { icon: TechIcon, color } = entry;

                    return (
                      <motion.li
                        key={name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.25 + i * 0.07 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="flex flex-col items-center gap-1.5 p-3 bg-surface rounded-xl border border-outline-variant/30 hover:border-primary/30 hover:shadow-sm transition-all duration-200 min-w-[68px]"
                        title={name}
                      >
                        {/* Icon in tinted circle */}
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${color}18` }}
                          aria-hidden="true"
                        >
                          <TechIcon size={22} style={{ color }} />
                        </div>
                        <span className="font-body text-[11px] font-medium text-secondary whitespace-nowrap">
                          {name}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Accent line */}
                <div
                  className="mt-6 h-px bg-gradient-to-r from-primary/20 to-transparent"
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
