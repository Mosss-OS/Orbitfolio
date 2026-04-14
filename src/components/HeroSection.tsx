import { motion } from "framer-motion";
import heroImg from "@/assets/hero-space.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt=""
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </div>

      {/* Content */}
      <div className="relative z-[2] text-center px-4 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs font-medium tracking-[0.2em] uppercase text-white/60 mb-6"
        >
          Open-Source / Onchain
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-[3.5rem] font-bold tracking-tight text-white leading-[1.1] mb-6"
        >
          Your DeFi universe
          <br />
          — mapped, valued, verified
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm md:text-base text-white/50 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Every DeFi position, token balance, and onchain action — unified across protocols and chains.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/explore"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors"
          >
            Explore the Graph
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
              <path d="M5 12l5-5-5-5" />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border border-white/20 text-white/80 font-medium text-sm hover:bg-white/10 transition-colors"
          >
            Connect Wallet
          </a>
        </motion.div>
      </div>
    </section>
  );
}
