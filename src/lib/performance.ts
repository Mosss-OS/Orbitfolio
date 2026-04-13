import { GraphNode, GraphEdge, GraphData } from '@/lib/graphBuilder';

const MAX_NODES = 50;
const MAX_EDGES = 100;
const SMALL_VALUE_THRESHOLD = 100;

export interface OptimizedGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  truncated: boolean;
}

export function optimizeGraphData(graphData: GraphData): OptimizedGraphData {
  const { nodes, edges } = graphData;
  
  if (nodes.length <= MAX_NODES && edges.length <= MAX_EDGES) {
    return { nodes, edges, truncated: false };
  }

  const sortedNodes = [...nodes].sort((a, b) => b.value - a.value);
  
  const mainNodes = sortedNodes.slice(0, MAX_NODES - 1);
  const smallNodes = sortedNodes.slice(MAX_NODES - 1);
  
  let otherValue = 0;
  smallNodes.forEach(node => {
    if (node.category !== 'wallet') {
      otherValue += node.value;
    }
  });

  const optimizedNodes: GraphNode[] = mainNodes.filter(n => n.category !== 'wallet');
  
  if (otherValue > 0) {
    optimizedNodes.push({
      id: 'other',
      label: 'Other',
      category: 'other',
      value: otherValue,
      color: '#6B7280',
      size: 20,
    });
  }

  const walletNode = nodes.find(n => n.category === 'wallet');
  if (walletNode) {
    optimizedNodes.unshift(walletNode);
  }

  const nodeIds = new Set(optimizedNodes.map(n => n.id));
  const optimizedEdges: GraphEdge[] = [];
  
  const edgesBySource = new Map<string, GraphEdge[]>();
  edges.forEach(edge => {
    const list = edgesBySource.get(edge.source) || [];
    list.push(edge);
    edgesBySource.set(edge.source, list);
  });

  edgesBySource.forEach((edgeList) => {
    const sorted = [...edgeList].sort((a, b) => b.value - a.value);
    sorted.slice(0, Math.floor(MAX_EDGES / edgesBySource.size)).forEach(edge => {
      if (nodeIds.has(edge.source) && nodeIds.has(edge.target)) {
        optimizedEdges.push(edge);
      }
    });
  });

  return {
    nodes: optimizedNodes,
    edges: optimizedEdges,
    truncated: optimizedNodes.length < nodes.length || optimizedEdges.length < edges.length,
  };
}

export function useMemoGraphData(graphData: GraphData): OptimizedGraphData {
  return optimizeGraphData(graphData);
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private frames: number[] = [];
  private lastTime: number = performance.now();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  recordFrame(): void {
    const now = performance.now();
    const delta = now - this.lastTime;
    this.frames.push(1000 / delta);
    this.lastTime = now;

    if (this.frames.length > 60) {
      this.frames.shift();
    }
  }

  getFPS(): number {
    if (this.frames.length === 0) return 60;
    return Math.round(this.frames.reduce((a, b) => a + b, 0) / this.frames.length);
  }

  isPerformanceGood(): boolean {
    return this.getFPS() >= 55;
  }

  reset(): void {
    this.frames = [];
    this.lastTime = performance.now();
  }
}

export function createOptimizedThreeObject() {
  return {
    dispose: () => {},
  };
}

export const LAZY_COMPONENTS = {
  Chart: () => import('@/components/FallbackChart').then(m => ({ default: m.default })),
  Panel: () => import('@/components/PortfolioPanel').then(m => ({ default: m.default })),
};