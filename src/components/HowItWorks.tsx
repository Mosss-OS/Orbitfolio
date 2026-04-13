import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    title: "Graph Explorer",
    description:
      "Your DeFi positions rendered as a 3D force-directed graph. Protocol nodes float in space; value flows between them as animated, thickness-weighted edges.",
    cta: "Launch Demo",
    ctaLink: "#",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    title: "Wallet Intelligence",
    description:
      "Connect your Ethereum wallet to visualise real token balances, DeFi positions across Uniswap, Aave, Lido, Compound, and more. ENS names replace all addresses.",
    cta: "Connect Wallet",
    ctaLink: "#",
    badge: "Live",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M16 12h.01M2 10h20" />
      </svg>
    ),
  },
  {
    title: "Cosmic Verification",
    description:
      "Portfolio snapshots are anchored to SpaceComputer's cosmic true-random number generation (cTRNG) from satellite entropy — making every snapshot cryptographically verifiable.",
    cta: "Learn More",
    ctaLink: "#",
    badge: "SpaceComputer",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="label-caps mb-4 text-center"
        >
          How It Works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-16 tracking-tight"
        >
          Connect. Visualise. Verify.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              className="bg-card-gradient border border-border rounded-xl p-8 hover:border-primary/30 transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {step.icon}
                </div>
                {step.badge && (
                  <span className="text-2xs font-medium tracking-wider uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {step.badge}
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {step.description}
              </p>
              <a
                href={step.ctaLink}
                className="inline-flex items-center text-sm font-medium text-primary hover:brightness-110 transition-all group-hover:gap-2 gap-1"
              >
                {step.cta}
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5-5-5-5" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
