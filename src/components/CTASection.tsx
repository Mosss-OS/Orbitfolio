import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight"
        >
          Start exploring
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-lg mx-auto mb-10 text-sm"
        >
          Your complete DeFi portfolio — visualised in 3D, verified by cosmic entropy. Built for ETHPrague 2026.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all glow-primary">
            Explore the Graph
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12l5-5-5-5" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
