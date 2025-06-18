import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Upload, Mic, MicOff } from 'lucide-react';
import AudioWaveform from './AudioWaveform';
import { emotions, type Emotion } from '../types/memory';

interface MemoryInputProps {
  currentInput: string;
  setCurrentInput: (value: string) => void;
  selectedEmotion: Emotion;
  setSelectedEmotion: (emotion: Emotion) => void;
  inputType: 'text' | 'image' | 'audio';
  setInputType: (type: 'text' | 'image' | 'audio') => void;
  isRecording: boolean;
  onAddMemory: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleRecording: () => void;
}

const MemoryInput = ({
  currentInput,
  setCurrentInput,
  selectedEmotion,
  setSelectedEmotion,
  inputType,
  setInputType,
  isRecording,
  onAddMemory,
  onFileUpload,
  onToggleRecording,
}: MemoryInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    setInputType('image');
    fileInputRef.current?.click();
  };

  return (
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
            onClick={handleImageUpload}
            className="rounded-full px-6"
          >
            <Upload className="w-4 h-4 mr-2" />
            Image
          </Button>
          <Button
            variant={inputType === 'audio' ? 'default' : 'outline'}
            onClick={onToggleRecording}
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
            <div className="inline-block">
              <AudioWaveform isPlaying={true} />
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
            onClick={onAddMemory}
            className="rounded-full px-8 py-6 text-lg bg-slate-700 hover:bg-slate-800 transition-all duration-300"
          >
            Preserve This Moment
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,audio/*"
          onChange={onFileUpload}
          className="hidden"
        />
      </div>
    </Card>
  );
};

export default MemoryInput;
