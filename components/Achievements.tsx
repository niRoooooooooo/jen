"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Cpu, BookOpen, Trophy, Award } from "lucide-react";
import { achievements, careerVision } from "@/lib/data";
import { fadeUp, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";

const achievementIconMap = {
  Competition: Trophy,
  Certification: Award,
} as const;

const visionIconMap = {
  monitor: Monitor,
  cpu: Cpu,
  "book-open": BookOpen,
} as const;

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      aria-labelledby="achievements-heading"
      className="section-padding"
    >
      <div ref={ref} className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Achievements */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="md:col-span-5"
          >
            <h2
              id="achievements-heading"
              className="font-display text-headline-md text-on-surface mb-8"
            >
              Achievements
            </h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-5"
              role="list"
            >
              {achievements.map((item) => {
                const Icon =
                  achievementIconMap[item.type as keyof typeof achievementIconMap] ?? Trophy;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    role="listitem"
                    whileHover={{ x: 4, boxShadow: "0 8px 24px -6px rgba(133,79,18,0.12)" }}
                    className="glass-card p-6 rounded-lg border-l-4 border-l-primary transition-all duration-200"
                    aria-label={`${item.type}: ${item.title}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={14} className="text-primary" aria-hidden="true" />
                      <span className="font-body text-label-sm text-primary uppercase tracking-widest">
                        {item.type}
                      </span>
                    </div>
                    <h4 className="font-display text-headline-sm text-on-surface mb-1">
                      {item.title}
                    </h4>
                    <p className="font-body text-body-md text-on-surface-variant">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Career Vision */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="md:col-span-7"
          >
            <h2 className="font-display text-headline-md text-on-surface mb-8">
              Career Vision
            </h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              role="list"
            >
              {careerVision.map((item) => {
                const Icon =
                  visionIconMap[item.icon as keyof typeof visionIconMap] ?? Monitor;
                return (
                  <motion.div
                    key={item.title}
                    variants={scaleIn}
                    role="listitem"
                    whileHover={{
                      y: -6,
                      boxShadow: "0 16px 32px -8px rgba(133,79,18,0.12)",
                    }}
                    className="p-6 bg-surface-container rounded-xl flex flex-col items-center text-center transition-all duration-300 group"
                  >
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-14 h-14 rounded-xl bg-primary-fixed/40 flex items-center justify-center mb-4 group-hover:bg-primary-fixed/70 transition-colors"
                      aria-hidden="true"
                    >
                      <Icon size={28} className="text-primary" strokeWidth={1.5} />
                    </motion.div>
                    <h5 className="font-body text-label-md font-bold text-on-surface mb-2">
                      {item.title}
                    </h5>
                    <p className="font-body text-label-sm text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
