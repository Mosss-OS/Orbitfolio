import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ctaImg from "@/assets/hero-cta.jpg";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaImg}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={800}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight"
        >
          Start exploring
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white/50 max-w-lg mx-auto mb-10 text-sm leading-relaxed"
        >
          Real-time DeFi data from hundreds of protocols, across all major chains — open-source and verifiable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <a
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors"
          >
            Explore the Graph
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12l5-5-5-5" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
