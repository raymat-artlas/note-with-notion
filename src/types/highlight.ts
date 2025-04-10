export interface Highlight {
  id: string;
  text: string;
  sourceUrl: string;
  sourceTitle?: string;
  userId: string;
  createdAt: number;
  tags?: string[];
  note?: string;
} 