import { baseUrl } from '@/web/lib/utils';
import { ApiFetchError } from './ApiFetchError';

export async function callApi<TResponse>(
  resource: string,
  init?: RequestInit
): Promise<TResponse> {
  const response = await fetch(baseUrl(resource), init);

  if (!response.ok) {
    throw new ApiFetchError(
      response.statusText || 'Something went wrong.',
      response
    );
  }

  return response.json();
}
