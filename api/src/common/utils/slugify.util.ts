import libSlugify from 'slugify';

export function slugify(str: string): string {
  return libSlugify(str, {
    lower: true,
    strict: true,
    trim: true,
  })
    .slice(0, 50)
    .replace(/-$/, '');
}
