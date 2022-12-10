import { useMutation, useQueryClient } from 'react-query';

import { callApi } from '@/web/lib/api';
import { Post } from '@/api/modules/posts/models';
import { CreatePostDto } from '@/api/modules/posts/dto';

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (post: CreatePostDto) =>
      callApi<Post>(`/api/posts.create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(post),
      }),
    {
      onSuccess: (post: Post) => {
        queryClient.invalidateQueries(['posts'], { exact: true });
        queryClient.setQueryData(['posts', post.id], post);
      },
    }
  );
}
