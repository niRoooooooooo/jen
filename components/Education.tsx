"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, BookOpen, School, MapPin, Award } from "lucide-react";
import { education } from "@/lib/data";
import { fadeUp } from "@/lib/motion";

const levelIcon = {
  University: GraduationCap,
  "Higher Secondary": BookOpen,
  "Secondary School": School,
} as const;

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      aria-labelledby="education-heading"
      className="section-padding bg-surface-container-low"
    >
      <div ref={ref} className="container-width">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-body text-label-sm text-primary uppercase tracking-widest mb-4 block"
          >
            Qualifications
          </motion.span>
          <motion.h2
            id="education-heading"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.08 }}
            className="font-display text-headline-lg text-on-surface"
          >
            Academic Journey
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-outline-variant/40"
            aria-hidden="true"
          />

          <ol className="space-y-8 md:space-y-10" aria-label="Education timeline">
            {education.map((item, i) => {
              const Icon =
                levelIcon[item.level as keyof typeof levelIcon] ??
                GraduationCap;
              return (
                <motion.li
                  key={item.level}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: i * 0.14 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline icon bubble */}
                  <div
                    className={`absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 shadow-md z-10 ${
                      item.active
                        ? "bg-primary border-primary text-white"
                        : "bg-surface border-outline-variant text-secondary"
                    }`}
                    aria-hidden="true"
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </div>

                  {/* Card */}
                  <div className="glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative">
                    {/* Left accent bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        item.active ? "bg-primary" : "bg-outline-variant"
                      }`}
                      aria-hidden="true"
                    />

                    {/* Card top bar */}
                    <div
                      className={`pl-5 pr-6 md:pr-8 py-4 flex items-center justify-between gap-4 ${
                        item.active
                          ? "bg-primary/10"
                          : "bg-surface-container/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-body text-label-sm text-secondary uppercase tracking-widest">
                          {item.tag}
                        </span>
                        {item.active && (
                          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-body text-label-sm px-3 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                            Ongoing
                          </span>
                        )}
                      </div>
                      <span className="font-body text-label-sm text-secondary font-semibold shrink-0">
                        {item.year}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="pl-5 pr-6 md:pr-8 py-5 md:py-6">
                      <h3 className="font-display text-headline-sm text-on-surface leading-tight">
                        {item.degree}
                      </h3>
                      <p className="font-body text-body-md text-primary font-medium mt-1">
                        {item.major}
                      </p>

                      <div className="flex items-start gap-2 mt-3">
                        <MapPin
                          size={14}
                          className="mt-0.5 shrink-0 text-secondary"
                          aria-hidden="true"
                        />
                        <p className="font-body text-body-md text-secondary">
                          {item.institution}
                          <span className="text-on-surface-variant">
                            {" "}· {item.location}
                          </span>
                        </p>
                      </div>

                      {/* Stats pills */}
                      <div className="flex flex-wrap gap-3 mt-5">
                        <div className="flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5">
                          <Award size={13} aria-hidden="true" />
                          <span className="font-body text-label-md font-semibold">
                            {item.metric}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-surface-container rounded-full px-4 py-1.5 border border-outline-variant/40">
                          <span className="font-body text-label-md text-secondary">
                            {item.extra}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
