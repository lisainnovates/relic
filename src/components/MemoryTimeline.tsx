
import React from 'react';
import MemoryCard from './MemoryCard';
import { Memory } from '../types/memory';
import { sortMemories } from '../utils/memoryUtils';

interface MemoryTimelineProps {
  memories: Memory[];
  hoveredMemory: string | null;
  setHoveredMemory: (id: string | null) => void;
  playingAudio: string | null;
  onTogglePin: (memoryId: string) => void;
  onToggleAudioPlayback: (memoryId: string) => void;
}

const MemoryTimeline = ({
  memories,
  hoveredMemory,
  setHoveredMemory,
  playingAudio,
  onTogglePin,
  onToggleAudioPlayback,
}: MemoryTimelineProps) => {
  const sortedMemories = sortMemories(memories);

  if (memories.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 text-lg font-light">
          Your first memory awaits above...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-light text-slate-700 text-center">Your Preserved Moments</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMemories.map((memory, index) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            index={index}
            hoveredMemory={hoveredMemory}
            playingAudio={playingAudio}
            onTogglePin={onTogglePin}
            onToggleAudioPlayback={onToggleAudioPlayback}
            onMouseEnter={() => setHoveredMemory(memory.id)}
            onMouseLeave={() => setHoveredMemory(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryTimeline;
