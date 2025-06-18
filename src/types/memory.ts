
export interface Memory {
  id: string;
  type: 'text' | 'image' | 'audio';
  content: string;
  emotion: string;
  timestamp: Date;
  emotionColor: string;
  isPinned?: boolean;
}

export interface Emotion {
  name: string;
  color: string;
  bg: string;
}

export const emotions: Emotion[] = [
  { name: 'wistful', color: 'from-blue-200 to-purple-200', bg: 'bg-gradient-to-br from-blue-100 to-purple-100' },
  { name: 'joyful', color: 'from-yellow-200 to-orange-200', bg: 'bg-gradient-to-br from-yellow-100 to-orange-100' },
  { name: 'aching', color: 'from-gray-200 to-blue-200', bg: 'bg-gradient-to-br from-gray-100 to-blue-100' },
  { name: 'peaceful', color: 'from-green-200 to-teal-200', bg: 'bg-gradient-to-br from-green-100 to-teal-100' },
  { name: 'nostalgic', color: 'from-pink-200 to-rose-200', bg: 'bg-gradient-to-br from-pink-100 to-rose-100' },
];
