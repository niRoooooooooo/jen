"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Code2 } from "lucide-react";
import { projects } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-padding bg-surface-container"
    >
      <div ref={ref} className="container-width">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <h2
            id="projects-heading"
            className="font-display text-headline-lg text-on-surface"
          >
            Selected Works
          </h2>
          <p className="font-body text-body-md text-on-surface-variant mt-2">
            Signature projects that showcase technical depth and creative vision.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12"
          role="list"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[number];
  index: number;
  inView: boolean;
}

function ProjectCard({ project, index, inView }: ProjectCardProps) {
  return (
    <motion.article
      role="listitem"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
      }}
      className="group cursor-pointer"
      aria-label={`Project: ${project.title}`}
    >
      {/* Image wrapper */}
      <div className="relative overflow-hidden rounded-xl mb-6 shadow-md aspect-video">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} live`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="btn-primary p-3 rounded-full shadow-lg"
          >
            <ExternalLink size={18} />
          </motion.a>
          <motion.a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="btn-primary p-3 rounded-full shadow-lg"
          >
            <Code2 size={18} />
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-display text-headline-sm text-on-surface mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="font-body text-body-md text-on-surface-variant mb-4 max-w-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-x-3 gap-y-1" role="list" aria-label="Technologies used">
          {project.tags.map((tag, i) => (
            <span key={tag} className="flex items-center gap-1" role="listitem">
              <span className="font-body text-label-sm text-secondary uppercase tracking-tight">
                {tag}
              </span>
              {i < project.tags.length - 1 && (
                <span className="font-body text-secondary/30 text-label-sm" aria-hidden="true">
                  •
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
