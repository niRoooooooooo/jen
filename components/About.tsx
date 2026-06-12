"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/motion";

const WORKSPACE_SRC = "/aboutsection.jpg";

const stats = [
  { target: 2, suffix: "+", label: "Years Coding" },
  { target: 5, suffix: "+", label: "Projects Built" },
  { target: 10, suffix: "+", label: "Technologies" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);

  return <>{count}{suffix}</>;
}

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
        {/* Section label — full width centered */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-body text-label-md text-primary uppercase tracking-widest mb-8 block text-center"
        >
          About Me
        </motion.span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Image column */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Main image */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
              <Image
                src={WORKSPACE_SRC}
                alt="Developer workspace"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent pointer-events-none" />

              {/* Floating badge — inside image box */}
              <motion.div
                className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-sm rounded-xl border border-outline-variant/40 px-4 py-3 shadow-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                <p className="font-body text-label-sm text-primary font-semibold uppercase tracking-widest">
                  Passionate
                </p>
                <p className="font-body text-label-sm text-secondary">
                  About Innovation
                </p>
              </motion.div>
            </div>

            {/* Decorative dot grid */}
            <div
              className="absolute -top-4 -left-4 w-24 h-24 opacity-20 pointer-events-none"
              aria-hidden="true"
              style={{
                backgroundImage: "radial-gradient(circle, #854f12 1px, transparent 1px)",
                backgroundSize: "8px 8px",
              }}
            />

            {/* Stats row — below image */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              {stats.map(({ target, suffix, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                  className="relative text-center p-3 sm:p-4 bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden group hover:border-primary/40 transition-colors duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="font-display text-[clamp(20px,3vw,32px)] text-primary font-bold leading-none relative z-10">
                    <CountUp target={target} suffix={suffix} active={inView} />
                  </p>
                  <p className="font-body text-[clamp(11px,1.2vw,13px)] text-secondary mt-1.5 leading-snug relative z-10">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-10 md:mt-0"
          >
            <h2
              id="about-heading"
              className="font-display text-headline-lg text-on-surface mb-6 leading-tight"
            >
              Bridging Technical Rigor &amp; Creative Expression
            </h2>

            <div className="space-y-4 font-body text-body-lg text-on-surface-variant">
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

          </motion.div>

        </div>
      </div>
    </section>
  );
}
