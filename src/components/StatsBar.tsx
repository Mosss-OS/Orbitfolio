import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useDefiStats, formatTvl } from "@/hooks/useDefiStats";

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { data, isLoading } = useDefiStats();

  const stats = [
    {
      value: isLoading ? "..." : formatTvl(data?.totalTvl || 0),
      label: "TOTAL TVL",
    },
    {
      value: isLoading ? "..." : `${data?.totalProtocols?.toLocaleString() || 0}+`,
      label: "PROTOCOLS",
    },
    {
      value: isLoading ? "..." : `${data?.totalChains || 0}`,
      label: "CHAINS",
    },
    {
      value: "20+",
      label: "TOP PROTOCOLS",
    },
  ];

  return (
    <section ref={ref} className="relative z-10 bg-[#1a1f2e] border-t border-white/10">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center justify-center py-8 md:py-10"
          >
            <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              {stat.value}
            </span>
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-white/40 mt-2">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
