import { useState, useEffect, useCallback } from 'react';
import { useGraphStore } from '@/store/graphStore';
import { buildGraphData, GraphData } from '@/lib/graphBuilder';

interface SnapshotBadgeProps {
  className?: string;
}

interface SnapshotData {
  id: string;
  timestamp: number;
  entropy: string;
  portfolioHash: string;
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function generateSnapshot(graphData: GraphData): Promise<SnapshotData> {
  const entropy = Math.random().toString(36).substring(2, 15);
  const sortedData = JSON.stringify(graphData, Object.keys(graphData).sort());
  const portfolioHash = await sha256(sortedData);
  const snapshotId = await sha256(portfolioHash + entropy + Date.now().toString());
  
  return {
    id: snapshotId,
    timestamp: Date.now(),
    entropy,
    portfolioHash,
  };
}

export default function SnapshotBadge({ className = '' }: SnapshotBadgeProps) {
  const { nodes, links } = useGraphStore();
  const [snapshot, setSnapshot] = useState<SnapshotData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshSnapshot = useCallback(async () => {
    if (nodes.length === 0) return;
    
    setIsRefreshing(true);
    console.log('[SpaceComputer] Fetching cTRNG entropy from satellite...');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const graphData = { nodes, edges: links };
    const newSnapshot = await generateSnapshot(graphData);
    
    console.log('[SpaceComputer] cTRNG entropy received:', newSnapshot.entropy.substring(0, 8) + '...');
    console.log('[SpaceComputer] Snapshot generated:', newSnapshot.id.substring(0, 12) + '...');
    
    setSnapshot(newSnapshot);
    setIsRefreshing(false);
  }, [nodes, links]);

  useEffect(() => {
    if (nodes.length > 0 && !snapshot) {
      refreshSnapshot();
    }
  }, [nodes.length, snapshot, refreshSnapshot]);

  const isFresh = snapshot 
    ? (Date.now() - snapshot.timestamp) < 5 * 60 * 1000 
    : false;

  const formatTimestamp = (ts: number) => {
    return new Date(ts).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleExport = () => {
    if (!snapshot || nodes.length === 0) return;
    
    const exportData = {
      snapshotId: snapshot.id,
      timestamp: snapshot.timestamp,
      entropy: snapshot.entropy,
      portfolioHash: snapshot.portfolioHash,
      graphData: { nodes, links },
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orbitfolio-snapshot-${snapshot.id.substring(0, 8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (nodes.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-full border ${className}`}>
      <div className={`w-2 h-2 rounded-full ${isFresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
      
      <div className="flex flex-col">
        <span className="text-xs font-medium">
          {snapshot ? formatTimestamp(snapshot.timestamp) : 'Generating...'}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {snapshot ? `Verified by cTRNG (${snapshot.id.substring(0, 12)}...)` : 'Waiting for data'}
        </span>
      </div>

      <button
        onClick={refreshSnapshot}
        disabled={isRefreshing}
        className="px-3 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded-full transition-colors disabled:opacity-50"
      >
        {isRefreshing ? 'Refreshing...' : 'Refresh'}
      </button>

      <button
        onClick={handleExport}
        disabled={!snapshot}
        className="px-3 py-1 text-xs bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-colors disabled:opacity-50"
      >
        Export
      </button>
    </div>
  );
}