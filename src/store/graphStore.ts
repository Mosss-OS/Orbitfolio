import { create } from 'zustand';
import { GraphNode, GraphEdge, GraphData } from '@/lib/graphBuilder';

export interface SnapshotResult {
  timestamp: number;
  data: GraphData;
}

interface GraphState {
  nodes: GraphNode[];
  links: GraphEdge[];
  selectedNodeId: string | null;
  snapshot: SnapshotResult | null;
  isLoading: boolean;
  error: string | null;
  isPlaying: boolean;
  playbackSpeed: number;
  setGraphData: (data: GraphData) => void;
  setNodes: (nodes: GraphNode[]) => void;
  setLinks: (links: GraphEdge[]) => void;
  selectNode: (nodeId: string | null) => void;
  setSnapshot: (snapshot: SnapshotResult | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setPlaying: (isPlaying: boolean) => void;
  setPlaybackSpeed: (speed: number) => void;
  clearGraph: () => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  nodes: [],
  links: [],
  selectedNodeId: null,
  snapshot: null,
  isLoading: false,
  error: null,
  isPlaying: false,
  playbackSpeed: 1,

  setGraphData: (data: GraphData) => set({ nodes: data.nodes, links: data.edges }),
  
  setNodes: (nodes: GraphNode[]) => set({ nodes }),
  
  setLinks: (links: GraphEdge[]) => set({ links }),
  
  selectNode: (nodeId: string | null) => set({ selectedNodeId: nodeId }),
  
  setSnapshot: (snapshot: SnapshotResult | null) => set({ snapshot }),
  
  setLoading: (isLoading: boolean) => set({ isLoading }),
  
  setError: (error: string | null) => set({ error }),
  
  setPlaying: (isPlaying: boolean) => set({ isPlaying }),
  
  setPlaybackSpeed: (playbackSpeed: number) => 
    set({ playbackSpeed: Math.min(5, Math.max(0.5, playbackSpeed)) }),
  
  clearGraph: () => set({
    nodes: [],
    links: [],
    selectedNodeId: null,
    snapshot: null,
    error: null,
    isPlaying: false,
  }),
}));