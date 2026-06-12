"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/motion";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL: FormState = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send.");
      setStatus("error");
    }
  };

  const fields: {
    id: keyof FormState;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    { id: "name",    label: "Name",    type: "text",  placeholder: "Your Name"  },
    { id: "email",   label: "Email",   type: "email", placeholder: "Your Email" },
    { id: "subject", label: "Subject", type: "text",  placeholder: "Subject"    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-padding"
    >
      <div ref={ref} className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Info column */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h2
              id="contact-heading"
              className="font-display text-headline-lg text-on-surface mb-6"
            >
              Let&apos;s Connect
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant mb-10 leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Whether you have a
              specific inquiry or just want to say hello, feel free to reach out.
            </p>

            <address className="not-italic space-y-6">
              <motion.a
                href={`mailto:${siteConfig.email}`}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 group"
                aria-label={`Send email to ${siteConfig.email}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary-fixed-dim transition-colors">
                  <Mail size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-body text-label-sm text-secondary uppercase tracking-widest">
                    Email Me
                  </p>
                  <p className="font-body text-body-md font-bold text-on-surface group-hover:text-primary transition-colors break-all">
                    {siteConfig.email}
                  </p>
                </div>
              </motion.a>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-body text-label-sm text-secondary uppercase tracking-widest">
                    Current Location
                  </p>
                  <p className="font-body text-body-md font-bold text-on-surface">
                    {siteConfig.location}
                  </p>
                </div>
              </motion.div>
            </address>
          </motion.div>

          {/* Form column */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="glass-card p-8 md:p-10 rounded-xl"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center min-h-[360px] text-center gap-4"
                  role="status"
                  aria-live="polite"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <CheckCircle size={56} className="text-primary" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-display text-headline-sm text-on-surface">
                    Message Sent!
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setForm(INITIAL); }}
                    className="mt-2 font-body text-label-md text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                  aria-label="Contact form"
                >
                  {fields.map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label
                        htmlFor={id}
                        className="block font-body text-label-sm text-secondary uppercase tracking-widest mb-2"
                      >
                        {label}
                      </label>
                      <motion.input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        value={form[id]}
                        onChange={set(id)}
                        required
                        whileFocus={{ scale: 1.01 }}
                        className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 outline-none transition-colors py-3 font-body text-body-md text-on-surface placeholder:text-on-surface-variant/40"
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-body text-label-sm text-secondary uppercase tracking-widest mb-2"
                    >
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      rows={4}
                      placeholder="Your Message"
                      value={form.message}
                      onChange={set("message")}
                      required
                      whileFocus={{ scale: 1.01 }}
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 outline-none transition-colors py-3 font-body text-body-md text-on-surface placeholder:text-on-surface-variant/40 resize-none"
                    />
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-error font-body text-label-md"
                        role="alert"
                      >
                        <AlertCircle size={16} />
                        {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full btn-primary py-4 rounded-lg font-body text-label-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    {status === "sending" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
