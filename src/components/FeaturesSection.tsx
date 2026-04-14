import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useDefiStats } from "@/hooks/useDefiStats";

const categories = [
  { icon: "📊", label: "DEX" },
  { icon: "🏦", label: "Lending" },
  { icon: "🔒", label: "Staking" },
  { icon: "🌉", label: "Bridge" },
  { icon: "💰", label: "Yield" },
  { icon: "🎨", label: "NFT" },
  { icon: "🔗", label: "Cross-chain" },
  { icon: "📈", label: "Derivatives" },
  { icon: "💎", label: "Liquid Staking" },
  { icon: "🏛️", label: "CDP" },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = useDefiStats();

  return (
    <section id="features" ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4"
        >
          Protocol Categories
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight"
        >
          Beyond Token Balances
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mb-16 text-sm leading-relaxed"
        >
          Orbitfolio tracks your onchain activity across the full spectrum of DeFi — not just token balances, but lending positions, staking, LP positions, bridges, and derivatives.
        </motion.p>

        {/* Category grid - matches RegenAtlas 5-column layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-16">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="flex flex-col items-center justify-center py-6 px-4 border border-border rounded-xl bg-card hover:border-primary transition-colors"
            >
              <span className="text-2xl mb-2">{cat.icon}</span>
              <span className="text-sm font-medium text-foreground">{cat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Top protocols from real data */}
        {data?.protocols && data.protocols.length > 0 && (
          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-6">
              Top Protocols by TVL (Live Data)
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.protocols.slice(0, 8).map((protocol, i) => (
                <motion.div
                  key={protocol.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-center gap-3 p-4 border border-border rounded-xl bg-card"
                >
                  {protocol.logo && (
                    <img
                      src={protocol.logo}
                      alt={protocol.name}
                      className="w-8 h-8 rounded-full"
                      loading="lazy"
                      width={32}
                      height={32}
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{protocol.name}</p>
                    <p className="text-xs text-muted-foreground">
                      TVL: {protocol.tvl >= 1e9 ? `$${(protocol.tvl / 1e9).toFixed(1)}B` : `$${(protocol.tvl / 1e6).toFixed(0)}M`}
                    </p>
                  </div>
                  <span className={`ml-auto text-xs font-medium ${protocol.change_1d >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {protocol.change_1d >= 0 ? '+' : ''}{protocol.change_1d?.toFixed(2) || '0.00'}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
