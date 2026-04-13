import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useGraphStore } from '@/store/graphStore';

interface FlowControlsProps {
  startDate?: number;
  endDate?: number;
  transfers?: Array<{ timestamp: number }>;
}

export default function FlowControls({ 
  startDate = Date.now() - 30 * 24 * 60 * 60 * 1000,
  endDate = Date.now(),
  transfers = []
}: FlowControlsProps) {
  const { isPlaying, playbackSpeed, setPlaying, setPlaybackSpeed } = useGraphStore();
  const [currentDate, setCurrentDate] = useState(startDate);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && transfers.length > 0) {
      let currentIndex = 0;
      const baseInterval = 2000 / playbackSpeed;
      
      intervalRef.current = window.setInterval(() => {
        if (currentIndex < transfers.length) {
          setCurrentDate(transfers[currentIndex].timestamp);
          currentIndex++;
        } else {
          setPlaying(false);
        }
      }, baseInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, transfers, setPlaying]);

  const handlePlayPause = () => {
    setPlaying(!isPlaying);
  };

  const handleReset = () => {
    setPlaying(false);
    setCurrentDate(startDate);
  };

  const handleSkipForward = () => {
    if (transfers.length > 0) {
      const currentIndex = transfers.findIndex(t => t.timestamp >= currentDate);
      const nextIndex = Math.min(currentIndex + 5, transfers.length - 1);
      if (nextIndex >= 0) {
        setCurrentDate(transfers[nextIndex].timestamp);
      }
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const progress = transfers.length > 0 
    ? ((currentDate - startDate) / (endDate - startDate)) * 100 
    : 0;

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
      <button
        onClick={handleReset}
        className="p-2 hover:bg-accent rounded-md transition-colors"
        aria-label="Reset"
      >
        <SkipBack className="w-5 h-5" />
      </button>

      <button
        onClick={handlePlayPause}
        className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      <button
        onClick={handleSkipForward}
        className="p-2 hover:bg-accent rounded-md transition-colors"
        aria-label="Skip forward"
      >
        <SkipForward className="w-5 h-5" />
      </button>

      <div className="flex-1 flex flex-col gap-1">
        <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-primary transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatDate(startDate)}</span>
          <span className="font-medium">{formatDate(currentDate)}</span>
          <span>{formatDate(endDate)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 min-w-[120px]">
        <span className="text-sm text-muted-foreground">Speed:</span>
        <input
          type="range"
          min="0.5"
          max="5"
          step="0.5"
          value={playbackSpeed}
          onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
          className="w-20 accent-primary"
        />
        <span className="text-sm font-medium w-8">{playbackSpeed}x</span>
      </div>
    </div>
  );
}