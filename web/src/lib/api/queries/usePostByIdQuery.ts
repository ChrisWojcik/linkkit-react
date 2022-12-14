import { useQuery } from 'react-query';
import {
  callApi,
  ApiFetchError,
  Post,
  PostWithNormalizedComments,
  normalizeComments,
} from '@/web/lib/api';

export function usePostByIdQuery(id: number) {
  return useQuery(
    ['posts', id],
    async ({ signal }): Promise<PostWithNormalizedComments | null> => {
      try {
        const post = await callApi<Post>(
          `/api/posts.get?id=${id}&includeComments=true`,
          { signal }
        );

        return {
          ...post,
          comments: normalizeComments(post.comments),
        };
      } catch (err) {
        if (err instanceof ApiFetchError && err.status === 404) {
          return null;
        }

        throw err;
      }
    }
  );
}
