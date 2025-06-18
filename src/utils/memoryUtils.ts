
export const getMemoryAge = (timestamp: Date): number => {
  const now = new Date();
  const diffInDays = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays;
};

export const getAgeStyles = (age: number, isPinned: boolean) => {
  if (isPinned) return { opacity: 1, saturate: 1 };
  
  if (age < 1) return { opacity: 1, saturate: 1 };
  if (age < 7) return { opacity: 0.9, saturate: 0.9 };
  if (age < 30) return { opacity: 0.8, saturate: 0.8 };
  return { opacity: 0.7, saturate: 0.7 };
};

export const sortMemories = (memories: import('../types/memory').Memory[]) => {
  return [...memories].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.timestamp.getTime() - a.timestamp.getTime();
  });
};
