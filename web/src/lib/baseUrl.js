export default function baseUrl(url) {
  return `${process.env.NEXT_PUBLIC_BASE_URL || ''}${url}`;
}
