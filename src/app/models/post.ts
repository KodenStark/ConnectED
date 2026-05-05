export interface Post {
  id: string;
  groupChatId: string;
  communityId: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  body: string;
  likeCount: number;
  likedByUserIds: string[];
  createdAt: number; // Unix timestamp ms
  updatedAt: number;
}

export type CreatePostPayload = Pick<Post, 'groupChatId' | 'communityId' | 'body'>;
export type UpdatePostPayload = Pick<Post, 'id' | 'body'>;
