import { useQuery } from 'react-query';
import { callApi, ApiFetchError } from '@/web/lib/api';
import { Post } from '@/api/modules/posts/models';

export function usePostByIdQuery(id: number) {
  return useQuery(['posts', id], async ({ signal }) => {
    try {
      const post = await callApi<Post>(`/api/posts.get?id=${id}`, { signal });

      return post;
    } catch (err) {
      if (err instanceof ApiFetchError && err.status === 404) {
        return null;
      }

      throw err;
    }
  });
}
