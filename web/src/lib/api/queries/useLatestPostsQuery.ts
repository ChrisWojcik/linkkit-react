import { useQuery } from 'react-query';
import { callApi } from '../callApi';
import { Post } from '@/api/modules/posts/models';

export function useLatestPostsQuery() {
  return useQuery(['posts'], async ({ signal }) =>
    callApi<Post[]>(`/api/posts.latest`, { signal })
  );
}
