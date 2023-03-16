import { useInfiniteQuery } from 'react-query';
import { callApi, PaginatedPosts } from '@/web/lib/api';

export function useLatestPostsQuery() {
  return useInfiniteQuery(
    ['posts'],
    async ({ pageParam, signal }) =>
      callApi<PaginatedPosts>(
        `/api/posts.latest${pageParam ? `?cursor=${pageParam}` : ''}`,
        { signal }
      ),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    }
  );
}
