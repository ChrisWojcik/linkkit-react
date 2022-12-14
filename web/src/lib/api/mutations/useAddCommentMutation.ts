import { useMutation, useQueryClient } from 'react-query';

import {
  callApi,
  Comment,
  CommentWithNormalizedReplies,
  PostWithNormalizedComments,
} from '@/web/lib/api';
import { AddCommentDto } from '@/api/modules/posts/dto';

export function useAddCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async (addCommentDto: AddCommentDto) => {
      const comment = await callApi<Comment>(`/api/posts.comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(addCommentDto),
      });

      return { ...comment, replies: [] };
    },
    {
      onSuccess: (comment: CommentWithNormalizedReplies) => {
        queryClient.setQueryData(
          ['posts', comment.postId],
          (post: PostWithNormalizedComments) => {
            // add the comment into the normalized set of comments
            // for the comment's parent post
            if (post) {
              post.numComments = post.numComments + 1;
              post.comments.byId[comment.id] = comment;

              // return new references to normalized reply arrays
              // to trigger a re-render of just that part of the tree
              if (comment.parentId) {
                post.comments.byId[comment.parentId].replies = [
                  comment.id,
                  ...post.comments.byId[comment.parentId].replies,
                ];
              } else {
                post.comments.directReplies = [
                  comment.id,
                  ...post.comments.directReplies,
                ];
              }

              return post;
            }
          }
        );

        queryClient.invalidateQueries(['posts'], { exact: true });
      },
    }
  );
}
