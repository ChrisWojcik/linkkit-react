export type User = {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: number;
  text: string;
  postId: number;
  parentId: number | null;
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  id: number;
  title: string;
  text: string | null;
  sharedLink: string | null;
  permalink: string;
  numComments?: number;
  comments?: Comment[];
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type CommentWithNormalizedReplies = Comment & { replies: number[] };

export type NormalizedComments = {
  byId: { [key: number]: CommentWithNormalizedReplies };
  directReplies: number[];
};

export type PostWithNormalizedComments = Omit<Post, 'comments'> &
  Partial<{
    comments: NormalizedComments;
  }>;
