import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

const Globe3D = lazy(() => import("./Globe3D"));

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-space-gradient pt-14">
      {/* Globe background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-background" />}>
          <Globe3D />
        </Suspense>
      </div>

      {/* Radial overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-transparent to-background" />

      {/* Content */}
      <div className="relative z-[2] text-center px-4 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="label-caps mb-6"
        >
          DeFi Portfolio Visualiser / ETHPrague 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
        >
          Your DeFi universe
          <br />
          <span className="text-gradient-primary">— mapped in 3D</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Connect your wallet and watch your DeFi positions, token balances, and on-chain money flows come alive as an interactive 3D force-directed graph.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="/explore" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all glow-primary">
            Explore the Graph
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
              <path d="M5 12l5-5-5-5" />
            </svg>
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/50 hover:bg-primary/5 transition-all">
            Connect Wallet
          </button>
        </motion.div>
      </div>
    </section>
  );
}
