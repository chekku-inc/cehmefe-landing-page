import { DEFAULT_AUTHOR_ID, getAuthor } from './authors';

const modules = import.meta.glob('../content/blog/*.mdx', { eager: true });

export const blogPosts = Object.entries(modules)
  .map(([path, mod]) => {
    const frontmatter = mod.frontmatter ?? {};
    const slug = frontmatter.slug || path.split('/').pop().replace(/\.mdx$/, '');
    const authorId = frontmatter.author || DEFAULT_AUTHOR_ID;

    return {
      slug,
      fields: frontmatter,
      authorId,
      author: getAuthor(authorId),
      Component: mod.default,
    };
  })
  .sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date));

export const HOME_BLOG_LIMIT = 6;

export function getFeaturedBlogPosts(limit = HOME_BLOG_LIMIT) {
  return blogPosts.slice(0, limit);
}

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
