
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import MemoryInput from '../components/MemoryInput';
import MemoryTimeline from '../components/MemoryTimeline';
import { Memory, emotions, Emotion } from '../types/memory';

const Index = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>(emotions[0]);
  const [inputType, setInputType] = useState<'text' | 'image' | 'audio'>('text');
  const [isRecording, setIsRecording] = useState(false);
  const [hoveredMemory, setHoveredMemory] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const { toast } = useToast();

  const weeklyPrompt = "What would you like to remember that no one else will?";

  const handleAddMemory = () => {
    if (!currentInput.trim()) {
      toast({
        title: "Your moment awaits",
        description: "Please share something to preserve this memory.",
      });
      return;
    }

    const newMemory: Memory = {
      id: Date.now().toString(),
      type: inputType,
      content: currentInput,
      emotion: selectedEmotion.name,
      emotionColor: selectedEmotion.color,
      timestamp: new Date(),
      isPinned: false,
    };

    setMemories(prev => [newMemory, ...prev]);
    setCurrentInput('');
    
    toast({
      title: "Memory preserved",
      description: "Your moment has been gently saved.",
    });
  };

  const togglePin = (memoryId: string) => {
    setMemories(prev => prev.map(memory => 
      memory.id === memoryId 
        ? { ...memory, isPinned: !memory.isPinned }
        : memory
    ));
    
    const memory = memories.find(m => m.id === memoryId);
    toast({
      title: memory?.isPinned ? "Memory unpinned" : "Memory pinned",
      description: memory?.isPinned 
        ? "Released back to the timeline" 
        : "Held close as your talisman",
    });
  };

  const toggleAudioPlayback = (memoryId: string) => {
    if (playingAudio === memoryId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(memoryId);
      // Simulate audio playback duration
      setTimeout(() => setPlayingAudio(null), 3000);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentInput(e.target?.result as string);
      };
      
      if (file.type.startsWith('image/')) {
        setInputType('image');
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('audio/')) {
        setInputType('audio');
        reader.readAsDataURL(file);
      }
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Speak your memory into existence...",
      });
    } else {
      toast({
        title: "Recording stopped",
        description: "Your voice has been captured.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-12">
          <h1 className="text-5xl font-light text-slate-700 mb-4 tracking-wide">
            Relic
          </h1>
          <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            {weeklyPrompt}
          </p>
        </div>

        {/* Input Section */}
        <MemoryInput
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
          selectedEmotion={selectedEmotion}
          setSelectedEmotion={setSelectedEmotion}
          inputType={inputType}
          setInputType={setInputType}
          isRecording={isRecording}
          onAddMemory={handleAddMemory}
          onFileUpload={handleFileUpload}
          onToggleRecording={toggleRecording}
        />

        {/* Memory Timeline */}
        <MemoryTimeline
          memories={memories}
          hoveredMemory={hoveredMemory}
          setHoveredMemory={setHoveredMemory}
          playingAudio={playingAudio}
          onTogglePin={togglePin}
          onToggleAudioPlayback={toggleAudioPlayback}
        />
      </div>
    </div>
  );
};

export default Index;
