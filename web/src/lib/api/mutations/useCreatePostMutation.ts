import { useMutation, useQueryClient } from 'react-query';

import {
  callApi,
  Post,
  PostWithNormalizedComments,
  normalizeComments,
} from '@/web/lib/api';
import { CreatePostDto } from '@/api/modules/posts/dto';

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async (createPostDto: CreatePostDto) => {
      const post = await callApi<Post>(`/api/posts.create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(createPostDto),
      });

      return {
        ...post,
        comments: normalizeComments([]),
      };
    },
    {
      onSuccess: (post: PostWithNormalizedComments) => {
        queryClient.invalidateQueries(['posts'], { exact: true });
        queryClient.setQueryData(['posts', post.id], post);
      },
    }
  );
}
