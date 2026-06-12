"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Award, Trophy, ScrollText, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { education, achievements, certificates } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [zoomed, setZoomed] = useState<string | null>(null);

  return (
    <section
      id="experience"
      aria-labelledby="education-heading"
      className="section-padding bg-surface-container-low"
    >
      <div ref={ref} className="container-width">
        {/* Header */}
        <div className="text-center mb-12">
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

        {/* Education cards — 3 columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {education.map((item, i) => (
            <motion.div
              key={item.level}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className={`glass-card rounded-xl overflow-hidden border-t-4 ${
                item.active ? "border-t-primary" : "border-t-outline-variant/50"
              }`}
            >
              <div
                className={`px-5 py-3 flex items-center justify-between gap-3 ${
                  item.active ? "bg-primary/10" : "bg-surface-container/60"
                }`}
              >
                <span className="font-body text-label-sm text-secondary uppercase tracking-widest">
                  {item.tag}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  {item.active && (
                    <span className="inline-flex items-center gap-1 text-primary font-body text-label-sm">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                      Ongoing
                    </span>
                  )}
                  <span className="font-body text-label-sm text-secondary font-semibold">
                    {item.year}
                  </span>
                </div>
              </div>

              <div className="px-5 py-4">
                <h3 className="font-display text-[clamp(15px,2vw,19px)] text-on-surface leading-snug">
                  {item.degree}
                </h3>
                <p className="font-body text-[13px] text-primary font-medium mt-1">
                  {item.major}
                </p>
                <div className="flex items-start gap-1.5 mt-2">
                  <MapPin size={11} className="mt-0.5 shrink-0 text-secondary/60" aria-hidden="true" />
                  <p className="font-body text-[11px] text-secondary/70 leading-snug">
                    {item.institution}
                    <span className="text-on-surface-variant/60"> · {item.location}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <div className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-2.5 py-0.5">
                    <Award size={10} aria-hidden="true" />
                    <span className="font-body text-[11px] font-semibold">{item.metric}</span>
                  </div>
                  <div className="flex items-center bg-surface-container rounded-full px-2.5 py-0.5 border border-outline-variant/30">
                    <span className="font-body text-[11px] text-secondary/60">{item.extra}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements subsection */}
        <div className="mt-10">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-display text-headline-sm text-on-surface mb-6"
          >
            Achievements
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(["Awards", "Competitions & Workshops"] as const).map((group) => {
              const items = achievements.filter((a) => a.group === group);
              const GroupIcon = group === "Awards" ? Award : Trophy;
              return (
                <motion.div
                  key={group}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="glass-card rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-outline-variant/30">
                    <GroupIcon size={13} className="text-primary" aria-hidden="true" />
                    <h4 className="font-body text-label-sm text-primary uppercase tracking-widest">
                      {group}
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {items.map((item) => (
                      <li key={item.title} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" aria-hidden="true" />
                        <span className="font-body text-[13px] text-on-surface leading-snug">
                          {item.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Certificates — separate row below */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-6 glass-card rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-outline-variant/30">
              <ScrollText size={13} className="text-primary" aria-hidden="true" />
              <h4 className="font-body text-label-sm text-primary uppercase tracking-widest">
                Certificates
              </h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {certificates.map((cert) => (
                <button
                  key={cert.title}
                  onClick={() => setZoomed(cert.image)}
                  className="group flex flex-col items-center gap-1.5"
                  style={{ width: 120 }}
                  aria-label={`View certificate: ${cert.title}`}
                >
                  <div className="relative rounded-lg overflow-hidden border border-outline-variant/30 group-hover:border-primary/40 transition-all duration-200 bg-surface-container w-full" style={{ height: 85 }}>
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="120px"
                    />
                    <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="text-center w-full">
                    <p className="font-body text-[11px] text-on-surface leading-tight truncate">{cert.title}</p>
                    <p className="font-body text-[11px] text-secondary/70 truncate">{cert.issuer}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setZoomed(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* X button */}
              <button
                onClick={() => setZoomed(null)}
                className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-surface flex items-center justify-center shadow-lg hover:bg-surface-container transition-colors"
                aria-label="Close certificate"
              >
                <X size={18} className="text-on-surface" />
              </button>
              <Image
                src={zoomed}
                alt="Certificate"
                width={1200}
                height={850}
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
