import { useQuery } from 'react-query';
import { callApi, PostWithNormalizedComments } from '@/web/lib/api';

export function useLatestPostsQuery() {
  return useQuery(['posts'], async ({ signal }) =>
    callApi<PostWithNormalizedComments[]>(`/api/posts.latest`, { signal })
  );
}
