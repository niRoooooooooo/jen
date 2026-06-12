"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download, Github, Linkedin, Instagram, Facebook } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { heroSequence } from "@/lib/motion";
import HeroCanvas from "@/components/HeroCanvas";

const AVATAR_SRC = "/jenny.jpeg";

const socials = [
  { icon: Github, href: siteConfig.github, label: "GitHub profile" },
  { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn profile" },
  { icon: Instagram, href: siteConfig.instagram, label: "Instagram profile" },
  { icon: Facebook, href: siteConfig.facebook, label: "Facebook profile" },
];

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated canvas background */}
      <HeroCanvas />

      <div className="container-width w-full py-28 md:py-36 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14 lg:gap-24">
          {/* Text content */}
          <div className="order-2 md:order-1">
            <motion.p
              custom={0}
              variants={heroSequence}
              initial="hidden"
              animate="visible"
              className="font-body text-label-sm text-primary uppercase tracking-widest mb-4"
            >
              Software Engineering Student
            </motion.p>

            <motion.h1
              custom={0.1}
              variants={heroSequence}
              initial="hidden"
              animate="visible"
              className="font-display text-display text-on-surface mb-5 text-balance"
            >
              {siteConfig.name}
            </motion.h1>

            <motion.div
              custom={0.2}
              variants={heroSequence}
              initial="hidden"
              animate="visible"
              className="w-20 h-1.5 bg-primary rounded-full mb-8"
            />

            <motion.p
              custom={0.3}
              variants={heroSequence}
              initial="hidden"
              animate="visible"
              className="font-body text-body-lg text-secondary mb-12 max-w-xl leading-relaxed"
            >
              {siteConfig.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={0.4}
              variants={heroSequence}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary px-9 py-4 rounded-lg font-body text-label-md flex items-center gap-2 group"
                aria-label="View my projects"
              >
                View Projects
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                download="Ummay_Arifun_Nahar_Jani_CV.pdf"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary px-9 py-4 rounded-lg font-body text-label-md flex items-center gap-2"
                aria-label="Download resume PDF"
              >
                Download Resume
                <Download size={16} />
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              custom={0.5}
              variants={heroSequence}
              initial="hidden"
              animate="visible"
              className="flex gap-5"
              role="list"
              aria-label="Social media links"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  role="listitem"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-secondary hover:text-primary transition-colors p-2 rounded-lg hover:bg-surface-container"
                >
                  <Icon size={26} strokeWidth={1.5} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="relative group">
              {/* Glow ring */}
              <motion.div
                className="absolute -inset-6 rounded-full bg-primary-fixed/25 blur-3xl"
                animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />

              {/* Decorative ring */}
              <div
                className="absolute -inset-3 rounded-full border border-primary/20"
                aria-hidden="true"
              />

              <Image
                src={AVATAR_SRC}
                alt={`${siteConfig.name} – Software Engineering Student`}
                width={384}
                height={384}
                priority
                className="relative w-72 h-72 sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] object-cover [object-position:center_65%] rounded-full border-4 border-surface shadow-2xl z-10 group-hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 sm:bottom-4 sm:right-4 glass-card rounded-xl px-4 py-3 z-20 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="font-body text-label-sm text-primary font-bold">
                  Open to Work
                </p>
                <p className="font-body text-label-sm text-secondary mt-0.5">
                  {siteConfig.location}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
