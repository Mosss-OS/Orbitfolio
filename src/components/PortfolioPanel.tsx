import { useGraphStore } from '@/store/graphStore';
import { getGraphStats } from '@/lib/graphBuilder';
import { formatAddress, getDemoENSName } from '@/hooks/useENS';
import { TrendingUp, Wallet, Database, Coins, ArrowDownLeft, ArrowUpRight, Download } from 'lucide-react';

interface PortfolioPanelProps {
  className?: string;
}

const CATEGORY_LABELS: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  wallet: { label: 'Wallet', icon: <Wallet className="w-4 h-4" />, color: '#1F2937' },
  dex: { label: 'DEX', icon: <ArrowUpRight className="w-4 h-4" />, color: '#3B82F6' },
  lending: { label: 'Lending', icon: <TrendingUp className="w-4 h-4" />, color: '#F59E0B' },
  staking: { label: 'Staking', icon: <Database className="w-4 h-4" />, color: '#10B981' },
  bridge: { label: 'Bridge', icon: <ArrowDownLeft className="w-4 h-4" />, color: '#8B5CF6' },
  nft: { label: 'NFT', icon: <Coins className="w-4 h-4" />, color: '#EC4899' },
  other: { label: 'Other', icon: <Coins className="w-4 h-4" />, color: '#6B7280' },
};

const MOCK_TOKENS = [
  { symbol: 'ETH', name: 'Ethereum', balance: 12.5, value: 31250, logo: '🔷' },
  { symbol: 'USDC', name: 'USD Coin', balance: 15000, value: 15000, logo: '💵' },
  { symbol: 'UNI', name: 'Uniswap', balance: 2500, value: 12500, logo: '🦄' },
  { symbol: 'AAVE', name: 'Aave', balance: 85, value: 8500, logo: '👻' },
  { symbol: 'STETH', name: 'Lido Staked ETH', balance: 8.2, value: 20500, logo: '💎' },
];

export default function PortfolioPanel({ className = '' }: PortfolioPanelProps) {
  const { nodes, links } = useGraphStore();
  const stats = getGraphStats({ nodes, edges: links });

  const ensName = getDemoENSName();

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const categoryBreakdown = Object.entries(stats.categories).map(([category, value]) => ({
    ...CATEGORY_LABELS[category] || { label: category, icon: <Coins className="w-4 h-4" />, color: '#6B7280' },
    value,
    percentage: stats.totalValue > 0 ? (value / stats.totalValue) * 100 : 0,
  }));

  return (
    <div className={`flex flex-col gap-6 p-6 bg-card border rounded-lg ${className}`}>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
        <span className="text-4xl font-bold">{formatUSD(stats.totalValue || 87500)}</span>
        <span className="text-sm text-muted-foreground font-medium">{ensName}</span>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium">Category Breakdown</span>
        {categoryBreakdown.map((cat) => (
          <div key={cat.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-sm">{cat.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{formatUSD(cat.value)}</span>
              <span className="text-xs text-muted-foreground">{cat.percentage.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium">Top Assets</span>
        {MOCK_TOKENS.map((token) => (
          <div key={token.symbol} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{token.logo}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{token.symbol}</span>
                <span className="text-xs text-muted-foreground">{token.balance.toLocaleString()}</span>
              </div>
            </div>
            <span className="text-sm font-medium">{formatUSD(token.value)}</span>
          </div>
        ))}
      </div>

      <button className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
        <Download className="w-4 h-4" />
        <span className="text-sm font-medium">Export Snapshot</span>
      </button>
    </div>
  );
}