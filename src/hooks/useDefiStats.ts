import { useQuery } from "@tanstack/react-query";

export interface DefiProtocol {
  name: string;
  tvl: number;
  category: string;
  chain: string;
  change_1d: number;
  logo: string;
  slug: string;
}

export interface DefiStats {
  totalTvl: number;
  totalProtocols: number;
  totalChains: number;
  protocols: DefiProtocol[];
}

async function fetchDefiStats(): Promise<DefiStats> {
  const [protocolsRes, chainsRes] = await Promise.all([
    fetch("https://api.llama.fi/protocols"),
    fetch("https://api.llama.fi/v2/chains"),
  ]);

  const protocols = await protocolsRes.json();
  const chains = await chainsRes.json();

  const totalTvl = protocols.reduce((sum: number, p: any) => sum + (p.tvl || 0), 0);

  const topProtocols: DefiProtocol[] = protocols
    .filter((p: any) => p.tvl > 0)
    .sort((a: any, b: any) => b.tvl - a.tvl)
    .slice(0, 20)
    .map((p: any) => ({
      name: p.name,
      tvl: p.tvl,
      category: p.category || "Other",
      chain: p.chain || "Multi",
      change_1d: p.change_1d || 0,
      logo: p.logo || "",
      slug: p.slug || "",
    }));

  return {
    totalTvl,
    totalProtocols: protocols.filter((p: any) => p.tvl > 0).length,
    totalChains: chains.length,
    protocols: topProtocols,
  };
}

export function useDefiStats() {
  return useQuery({
    queryKey: ["defi-stats"],
    queryFn: fetchDefiStats,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function formatTvl(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}
