
import React from 'react';
import { Card } from '@/components/ui/card';
import { Pin, PinOff, Mic, Play, Pause } from 'lucide-react';
import AudioWaveform from './AudioWaveform';
import { Memory } from '../types/memory';
import { getMemoryAge, getAgeStyles } from '../utils/memoryUtils';

interface MemoryCardProps {
  memory: Memory;
  index: number;
  hoveredMemory: string | null;
  playingAudio: string | null;
  onTogglePin: (memoryId: string) => void;
  onToggleAudioPlayback: (memoryId: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MemoryCard = ({
  memory,
  index,
  hoveredMemory,
  playingAudio,
  onTogglePin,
  onToggleAudioPlayback,
  onMouseEnter,
  onMouseLeave,
}: MemoryCardProps) => {
  const age = getMemoryAge(memory.timestamp);
  const ageStyles = getAgeStyles(age, memory.isPinned || false);

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ 
        animationDelay: `${index * 100}ms`,
        opacity: ageStyles.opacity,
        filter: `saturate(${ageStyles.saturate})`
      }}
    >
      {/* Pin indicator for pinned memories */}
      {memory.isPinned && (
        <div className="absolute -top-2 -right-2 z-20">
          <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
            <Pin className="w-3 h-3 text-amber-800" />
          </div>
        </div>
      )}
      
      <div
        className={`w-24 h-24 rounded-full bg-gradient-to-br ${memory.emotionColor} mx-auto mb-4 
          transition-all duration-500 transform group-hover:scale-110 shadow-lg
          ${hoveredMemory === memory.id ? 'animate-pulse' : ''}
          ${memory.isPinned ? 'ring-2 ring-amber-300 ring-opacity-50' : ''}`}
      >
        <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          {memory.type === 'audio' ? (
            <AudioWaveform isPlaying={playingAudio === memory.id} />
          ) : (
            <div className="w-3 h-3 bg-white/80 rounded-full"></div>
          )}
        </div>
      </div>
      
      {hoveredMemory === memory.id && (
        <Card className="absolute top-28 left-1/2 transform -translate-x-1/2 w-72 p-4 bg-white/95 backdrop-blur-sm border-0 shadow-xl z-10 animate-fade-in">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${memory.emotionColor} text-slate-700`}>
                {memory.emotion}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePin(memory.id);
                  }}
                  className="p-1 rounded-full hover:bg-slate-100 transition-colors"
                  title={memory.isPinned ? "Unpin memory" : "Pin as talisman"}
                >
                  {memory.isPinned ? (
                    <PinOff className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Pin className="w-4 h-4 text-slate-600" />
                  )}
                </button>
                <span className="text-xs text-slate-500">
                  {memory.timestamp.toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {memory.type === 'text' && (
              <p className="text-sm text-slate-700 leading-relaxed">{memory.content}</p>
            )}
            
            {memory.type === 'image' && (
              <img src={memory.content} alt="Memory" className="w-full h-32 object-cover rounded-md" />
            )}
            
            {memory.type === 'audio' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mic className="w-4 h-4" />
                  <span className="text-sm">Voice memory</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleAudioPlayback(memory.id);
                  }}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  {playingAudio === memory.id ? (
                    <Pause className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Play className="w-4 h-4 text-slate-600" />
                  )}
                </button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default MemoryCard;
