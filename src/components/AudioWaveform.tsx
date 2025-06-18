
interface AudioWaveformProps {
  isPlaying: boolean;
}

const AudioWaveform = ({ isPlaying }: AudioWaveformProps) => {
  const bars = Array.from({ length: 8 }, (_, i) => i);
  
  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {bars.map((bar) => (
        <div
          key={bar}
          className={`w-1 bg-white/80 rounded-full transition-all duration-300 ${
            isPlaying ? 'animate-pulse' : ''
          }`}
          style={{
            height: isPlaying 
              ? `${Math.random() * 20 + 8}px` 
              : '8px',
            animationDelay: `${bar * 100}ms`,
            animationDuration: `${Math.random() * 500 + 800}ms`
          }}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;
