const modules = import.meta.glob('../content/blog/*.mdx', { eager: true });

export const blogPosts = Object.entries(modules)
  .map(([path, mod]) => {
    const frontmatter = mod.frontmatter ?? {};
    const slug = frontmatter.slug || path.split('/').pop().replace(/\.mdx$/, '');

    return {
      slug,
      fields: frontmatter,
      Component: mod.default,
    };
  })
  .sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date));

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
