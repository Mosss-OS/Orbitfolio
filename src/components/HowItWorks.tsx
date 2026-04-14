import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useDefiStats, formatTvl } from "@/hooks/useDefiStats";

const protocols = [
  "Ethereum", "Uniswap", "Aave", "Lido", "Compound", "Curve",
  "MakerDAO", "Balancer", "Yearn", "Convex", "Arbitrum", "Optimism",
  "Polygon", "Base", "Solana", "Avalanche",
  "Ethereum", "Uniswap", "Aave", "Lido", "Compound", "Curve",
  "MakerDAO", "Balancer", "Yearn", "Convex", "Arbitrum", "Optimism",
  "Polygon", "Base", "Solana", "Avalanche",
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = useDefiStats();

  return (
    <section id="how-it-works" ref={ref} className="bg-[#eaecef]">
      {/* Protocol ticker */}
      <div className="overflow-hidden border-b border-border py-5">
        <div className="flex animate-[scroll_30s_linear_infinite] gap-8 whitespace-nowrap">
          {protocols.map((name, i) => (
            <span key={i} className="text-sm font-medium text-foreground/30">
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-24 md:py-32">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4"
        >
          How It Works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight"
        >
          Connect. Visualise. Verify.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mb-16 text-sm leading-relaxed"
        >
          DeFi positions on Ethereum. Lending pools on Aave. Staking on Lido. Nobody has the full picture — so we built one. Every protocol mapped to your wallet, valued in real-time, verified onchain.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-background border border-border rounded-xl p-8"
          >
            <div className="mb-6">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                <circle cx="14" cy="14" r="12" />
                <path d="M14 2a18 18 0 0 1 5 12 18 18 0 0 1-5 12 18 18 0 0 1-5-12 18 18 0 0 1 5-12z" />
                <path d="M2 14h24" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Graph Explorer
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Browse {data?.totalProtocols?.toLocaleString() || "1,000+"} protocols across {data?.totalChains || "200+"} chains. Filter by category, TVL, or chain. Every position mapped to your wallet address.
            </p>
            <a href="/explore" className="inline-flex items-center text-sm font-medium text-primary gap-1">
              Open Graph
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12l5-5-5-5" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="bg-background border border-border rounded-xl p-8 relative"
          >
            <span className="absolute top-6 right-6 text-[10px] font-medium tracking-wider uppercase text-primary border border-primary/30 px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
            <div className="mb-6">
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                <rect x="3" y="7" width="22" height="14" rx="2" />
                <path d="M18 14h.01M3 11h22" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Wallet Intelligence
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Track where your assets are deployed and how they perform. Real-time data from {data ? formatTvl(data.totalTvl) : "$100B+"} in total value locked, benchmarked across the ecosystem.
            </p>
            <a href="#" className="inline-flex items-center text-sm font-medium text-primary gap-1">
              Read Docs
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12l5-5-5-5" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
