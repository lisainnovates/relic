
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Upload, Mic, MicOff, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Memory {
  id: string;
  type: 'text' | 'image' | 'audio';
  content: string;
  emotion: string;
  timestamp: Date;
  emotionColor: string;
}

const emotions = [
  { name: 'wistful', color: 'from-blue-200 to-purple-200', bg: 'bg-gradient-to-br from-blue-100 to-purple-100' },
  { name: 'joyful', color: 'from-yellow-200 to-orange-200', bg: 'bg-gradient-to-br from-yellow-100 to-orange-100' },
  { name: 'aching', color: 'from-gray-200 to-blue-200', bg: 'bg-gradient-to-br from-gray-100 to-blue-100' },
  { name: 'peaceful', color: 'from-green-200 to-teal-200', bg: 'bg-gradient-to-br from-green-100 to-teal-100' },
  { name: 'nostalgic', color: 'from-pink-200 to-rose-200', bg: 'bg-gradient-to-br from-pink-100 to-rose-100' },
];

const Index = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState(emotions[0]);
  const [inputType, setInputType] = useState<'text' | 'image' | 'audio'>('text');
  const [isRecording, setIsRecording] = useState(false);
  const [hoveredMemory, setHoveredMemory] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    };

    setMemories(prev => [newMemory, ...prev]);
    setCurrentInput('');
    
    toast({
      title: "Memory preserved",
      description: "Your moment has been gently saved.",
    });
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
            Vestige
          </h1>
          <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            {weeklyPrompt}
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-8 mb-12 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <div className="space-y-6">
            {/* Input Type Selection */}
            <div className="flex justify-center gap-4">
              <Button
                variant={inputType === 'text' ? 'default' : 'outline'}
                onClick={() => setInputType('text')}
                className="rounded-full px-6"
              >
                Text
              </Button>
              <Button
                variant={inputType === 'image' ? 'default' : 'outline'}
                onClick={() => {
                  setInputType('image');
                  fileInputRef.current?.click();
                }}
                className="rounded-full px-6"
              >
                <Upload className="w-4 h-4 mr-2" />
                Image
              </Button>
              <Button
                variant={inputType === 'audio' ? 'default' : 'outline'}
                onClick={toggleRecording}
                className="rounded-full px-6"
              >
                {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                Audio
              </Button>
            </div>

            {/* Input Area */}
            {inputType === 'text' && (
              <Textarea
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="A thought, a lyric, a moment in time..."
                className="min-h-32 text-lg border-0 bg-transparent resize-none focus:ring-0 placeholder:text-slate-400"
              />
            )}

            {inputType === 'image' && currentInput && (
              <div className="text-center">
                <img src={currentInput} alt="Memory" className="max-h-48 mx-auto rounded-lg shadow-md" />
              </div>
            )}

            {inputType === 'audio' && isRecording && (
              <div className="text-center">
                <div className="inline-block animate-pulse">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
                <p className="text-slate-500 mt-2">Recording your voice...</p>
              </div>
            )}

            {/* Emotion Selection */}
            <div className="space-y-3">
              <p className="text-sm text-slate-600 font-medium">How does this moment feel?</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.name}
                    onClick={() => setSelectedEmotion(emotion)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedEmotion.name === emotion.name
                        ? `bg-gradient-to-r ${emotion.color} text-slate-700 shadow-md`
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {emotion.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Memory Button */}
            <div className="text-center">
              <Button
                onClick={handleAddMemory}
                className="rounded-full px-8 py-6 text-lg bg-slate-700 hover:bg-slate-800 transition-all duration-300"
              >
                <Heart className="w-5 h-5 mr-2" />
                Preserve This Moment
              </Button>
            </div>
          </div>
        </Card>

        {/* Memory Timeline */}
        {memories.length > 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-light text-slate-700 text-center">Your Preserved Moments</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memories.map((memory, index) => (
                <div
                  key={memory.id}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredMemory(memory.id)}
                  onMouseLeave={() => setHoveredMemory(null)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${memory.emotionColor} mx-auto mb-4 
                      transition-all duration-500 transform group-hover:scale-110 shadow-lg
                      ${hoveredMemory === memory.id ? 'animate-pulse' : ''}`}
                  >
                    <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-3 h-3 bg-white/80 rounded-full"></div>
                    </div>
                  </div>
                  
                  {hoveredMemory === memory.id && (
                    <Card className="absolute top-28 left-1/2 transform -translate-x-1/2 w-72 p-4 bg-white/95 backdrop-blur-sm border-0 shadow-xl z-10 animate-fade-in">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${memory.emotionColor} text-slate-700`}>
                            {memory.emotion}
                          </span>
                          <span className="text-xs text-slate-500">
                            {memory.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        
                        {memory.type === 'text' && (
                          <p className="text-sm text-slate-700 leading-relaxed">{memory.content}</p>
                        )}
                        
                        {memory.type === 'image' && (
                          <img src={memory.content} alt="Memory" className="w-full h-32 object-cover rounded-md" />
                        )}
                        
                        {memory.type === 'audio' && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mic className="w-4 h-4" />
                            <span className="text-sm">Voice memory</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {memories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg font-light">
              Your first memory awaits above...
            </p>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,audio/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Index;
