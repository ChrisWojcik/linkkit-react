import { Comment, NormalizedComments } from '@/web/lib/api';

export function normalizeComments(
  comments: Comment[] = []
): NormalizedComments {
  const byId = {};
  const directReplies = [];

  comments.forEach((comment) => {
    byId[comment.id] = byId[comment.id] || { replies: [] };
    byId[comment.id] = { ...comment, ...byId[comment.id] };

    if (comment.parentId) {
      byId[comment.parentId] = byId[comment.parentId] || { replies: [] };
      byId[comment.parentId].replies.push(comment.id);
    } else {
      directReplies.push(comment.id);
    }
  });

  return {
    byId,
    directReplies,
  };
}
