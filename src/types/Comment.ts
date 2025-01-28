// src/types/Comment.ts
export interface Comment {
    id: number;
    text: string;
    replies: Comment[];
  }
  