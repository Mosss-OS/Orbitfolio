import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const protocols = [
  "Ethereum", "Uniswap", "Aave", "Lido", "Compound", "Curve",
  "MakerDAO", "Balancer", "Yearn", "Convex",
  "Ethereum", "Uniswap", "Aave", "Lido", "Compound", "Curve",
  "MakerDAO", "Balancer", "Yearn", "Convex",
];

const features = [
  { icon: "◎", title: "ENS Resolution", desc: "Human-readable names replace all wallet addresses throughout the interface." },
  { icon: "⬡", title: "Protocol Detection", desc: "Auto-detects positions across top DeFi protocols — Uniswap, Aave, Lido, Compound, and more." },
  { icon: "◈", title: "Flow Timeline", desc: "Replay historical transactions chronologically and watch value flows animate on the graph." },
  { icon: "✦", title: "Snapshot Export", desc: "Export a verifiable JSON snapshot of your portfolio, anchored to satellite cosmic entropy." },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="py-24 md:py-32 bg-surface-gradient">
      <div className="container mx-auto px-4 md:px-8">
        {/* Scrolling protocol ticker */}
        <div className="mb-20 overflow-hidden">
          <div className="flex animate-[scroll_30s_linear_infinite] gap-8 whitespace-nowrap">
            {protocols.map((name, i) => (
              <span key={i} className="text-sm font-medium text-muted-foreground/40">
                {name}
              </span>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="label-caps mb-4 text-center"
        >
          Ecosystem Services
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-6 tracking-tight"
        >
          Beyond Token Balances
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 text-sm leading-relaxed"
        >
          Orbitfolio visualises the full spectrum of your on-chain activity — not just balances, but positions, flows, protocol interactions, and verifiable snapshots.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors shadow-sm"
            >
              <div className="text-2xl mb-4 text-primary">{f.icon}</div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
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
