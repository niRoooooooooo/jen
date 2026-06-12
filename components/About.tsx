"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/motion";

const WORKSPACE_SRC =
  "https://lh3.googleusercontent.com/aida/AP1WRLuN8x8LqMJ46pfwjnT5VX_K0wKgRQfJ228GpFD09h1V8UZ00Dq_imhr4XycpXUMVwJVjAEwOCfLdwiEgXd8gKrEHzSvWFkiKMXmi_FZEJzxY27VdFdNsqFGOVXLul3XN9_NAy_uAn4q9IDJ2Hs7Z_msy3cDCP3NcIa6yJF6mkxL2oDUMjqC9ra-cPDU7q42Jg6A34HZdiMEIDJYz0vi_fMu-BpvBlTnrUl7E-oKWDticHJkN5i3QYW6aaA";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-surface-container-low section-padding"
    >
      <div ref={ref} className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image column */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <Image
                src={WORKSPACE_SRC}
                alt="A minimalist developer workspace with a laptop, notebook, and coffee"
                width={600}
                height={450}
                className="w-full object-cover grayscale-[0.25] hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-4 sm:-right-8 w-40 h-40 rounded-full border border-primary/20 bg-surface flex items-center justify-center p-4 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              <p className="text-center font-body text-label-sm text-secondary leading-relaxed">
                PASSIONATE ABOUT INNOVATION
              </p>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-8 md:mt-0"
          >
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-body text-label-sm text-primary uppercase tracking-widest mb-4 block"
            >
              Editorial Intro
            </motion.span>

            <h2
              id="about-heading"
              className="font-display text-headline-lg text-on-surface mb-6 text-balance"
            >
              Bridging the Gap Between Technical Rigor and Creative Expression
            </h2>

            <div className="space-y-4 text-on-surface-variant font-body text-body-lg">
              <p>
                I am currently pursuing a B.Sc. in Software Engineering, where
                I&apos;ve developed a deep appreciation for the intersection of logic
                and aesthetics. My journey is defined by a commitment to creating
                digital solutions that are not only efficient but also meaningful
                to the people who use them.
              </p>
              <p>
                With a foundation built on rigorous academic study and hands-on
                project work, I specialize in architecting systems that solve
                real-world problems. Whether I&apos;m debugging a complex algorithm or
                refining a user interface, I approach every challenge with
                precision and purpose.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-1.5 sm:gap-4">
              {[
                { value: "2+", label: "Years Coding" },
                { value: "5+", label: "Projects Built" },
                { value: "3+", label: "Technologies" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center p-2 sm:p-4 bg-surface rounded-xl border border-outline-variant/30 overflow-hidden">
                  <p className="font-display text-[clamp(14px,4.5vw,30px)] text-primary font-bold leading-tight">
                    {value}
                  </p>
                  <p className="font-body text-[clamp(9px,2vw,13px)] text-secondary mt-0.5 sm:mt-1 leading-snug break-words">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
