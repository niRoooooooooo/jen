"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Facebook, MapPin, Heart } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { fadeUp } from "@/lib/motion";

const footerLinks = [
  {
    icon: Mail,
    href: `mailto:${siteConfig.email}`,
    label: "Send an email",
    external: false,
  },
  {
    icon: Github,
    href: siteConfig.github,
    label: "GitHub profile",
    external: true,
  },
  {
    icon: Linkedin,
    href: siteConfig.linkedin,
    label: "LinkedIn profile",
    external: true,
  },
  {
    icon: Instagram,
    href: siteConfig.instagram,
    label: "Instagram profile",
    external: true,
  },
  {
    icon: Facebook,
    href: siteConfig.facebook,
    label: "Facebook profile",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-surface border-t-4 border-primary rounded-t-xl shadow-lg"
    >
      <div className="container-width py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Brand */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-5"
          >
            <p className="font-display text-headline-md text-on-surface mb-1">
              {siteConfig.name}
            </p>
            <p className="font-body text-body-md text-secondary">
              {siteConfig.title}
            </p>
            <div className="flex items-center gap-2 mt-3 text-secondary">
              <MapPin size={14} aria-hidden="true" />
              <span className="font-body text-label-sm">{siteConfig.location}</span>
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-7 flex flex-col items-start md:items-end justify-center"
          >
            <h2 className="font-body text-label-sm text-primary uppercase tracking-widest mb-5">
              Connect
            </h2>
            <nav aria-label="Social links">
              <ul className="flex gap-4" role="list">
                {footerLinks.map(({ icon: Icon, href, label, external }) => (
                  <li key={label} role="listitem">
                    <motion.a
                      href={href}
                      aria-label={label}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      whileHover={{ y: -3, scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container transition-colors"
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </motion.a>
                  </li>
                ))}
                <li role="listitem">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-secondary"
                    aria-label={`Located in ${siteConfig.location}`}
                    title={siteConfig.location}
                  >
                    <MapPin size={20} strokeWidth={1.5} />
                  </div>
                </li>
              </ul>
            </nav>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left"
        >
          <p className="font-body text-label-sm text-secondary">
            Copyright &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="font-body text-label-sm text-secondary flex items-center gap-1.5">
            Designed &amp; Developed with Passion
            <Heart
              size={12}
              className="text-error fill-error"
              aria-hidden="true"
            />
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
