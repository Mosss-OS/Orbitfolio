export interface GraphNode {
  id: string;
  label: string;
  category: 'wallet' | 'dex' | 'lending' | 'staking' | 'bridge' | 'nft' | 'other';
  value: number;
  color: string;
  size: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  value: number;
  token: string;
  color: string;
  direction: 'inflow' | 'outflow';
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface PortfolioPosition {
  protocol: string;
  category: 'dex' | 'lending' | 'staking' | 'bridge' | 'nft' | 'other';
  tokens: {
    symbol: string;
    amount: number;
    usdValue: number;
  }[];
  totalUsdValue: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  dex: '#3B82F6',
  lending: '#F59E0B',
  staking: '#10B981',
  bridge: '#8B5CF6',
  nft: '#EC4899',
  other: '#6B7280',
};

const TOKEN_COLORS: Record<string, string> = {
  ETH: '#627EEA',
  WETH: '#627EEA',
  USDC: '#2775CA',
  USDT: '#26A17B',
  DAI: '#F5AC37',
  WBTC: '#F7931A',
  UNI: '#FF007A',
  AAVE: '#2EB8AC',
  STETH: '#00A3FF',
  LDOWSTETH: '#00A3FF',
};

function calculateNodeSize(value: number, maxValue: number): number {
  const minSize = 20;
  const maxSize = 60;
  if (maxValue === 0) return minSize;
  const normalized = value / maxValue;
  return minSize + normalized * (maxSize - minSize);
}

export function buildGraphData(
  walletAddress: string,
  positions: PortfolioPosition[]
): GraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  
  const totalPortfolioValue = positions.reduce((sum, p) => sum + p.totalUsdValue, 0);
  
  nodes.push({
    id: walletAddress.toLowerCase(),
    label: 'Wallet',
    category: 'wallet',
    value: totalPortfolioValue,
    color: '#1F2937',
    size: 70,
  });

  const maxPositionValue = Math.max(...positions.map(p => p.totalUsdValue), 1);

  positions.forEach((position) => {
    const nodeId = `${position.protocol}-${walletAddress}`.toLowerCase();
    
    nodes.push({
      id: nodeId,
      label: position.protocol,
      category: position.category,
      value: position.totalUsdValue,
      color: CATEGORY_COLORS[position.category] || CATEGORY_COLORS.other,
      size: calculateNodeSize(position.totalUsdValue, maxPositionValue),
    });

    position.tokens.forEach((token) => {
      if (token.usdValue > 0) {
        const edgeId = `${walletAddress}-${position.protocol}-${token.symbol}`.toLowerCase();
        
        edges.push({
          id: edgeId,
          source: walletAddress.toLowerCase(),
          target: nodeId,
          value: token.usdValue,
          token: token.symbol,
          color: TOKEN_COLORS[token.symbol] || '#6B7280',
          direction: 'outflow',
        });
      }
    });
  });

  return { nodes, edges };
}

export function getGraphStats(data: GraphData) {
  const totalValue = data.nodes.reduce((sum, n) => sum + n.value, 0);
  const categories = data.nodes.reduce((acc, n) => {
    acc[n.category] = (acc[n.category] || 0) + n.value;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalValue,
    nodeCount: data.nodes.length,
    edgeCount: data.edges.length,
    categories,
  };
}