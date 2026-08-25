import React, { useMemo, useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { authorAvatar, authorName, authorRole } from './authors';

const BASE = import.meta.env.BASE_URL;
const asset = (path) => `${BASE}${String(path).replace(/^\//, '')}`;
const withBase = (path) => `${BASE}${path.replace(/^\//, '')}`;

export function BlogAuthorByline({ author, lang, size = 'sm', className = '' }) {
  const name = authorName(author, lang);
  const role = authorRole(author, lang);
  const avatar = authorAvatar(author);
  const isLg = size === 'lg';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={avatar}
        alt={name}
        className={`${isLg ? 'h-14 w-14' : 'h-10 w-10'} rounded-full object-cover object-top`}
        loading="lazy"
      />
      <div className="min-w-0">
        <p className={`${isLg ? 'text-base' : 'text-sm'} font-bold leading-tight text-[#272829]`}>{name}</p>
        <p className={`${isLg ? 'mt-1 text-sm' : 'mt-0.5 text-xs'} font-semibold leading-snug text-[#6A8390]`}>{role}</p>
      </div>
    </div>
  );
}

export function BlogPostCard({
  post,
  lang,
  fieldSuffix,
  dateFormatter,
  readMoreLabel,
  className = '',
  compact = false,
}) {
  const title = post.fields[`title${fieldSuffix}`];
  const excerpt = post.fields[`excerpt${fieldSuffix}`];
  const coverAlt = post.fields[`coverAlt${fieldSuffix}`] || title;
  const dateText = dateFormatter.format(new Date(`${post.fields.date}T00:00:00`));
  const postHref = withBase(`blog/${post.slug}/`);

  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-md border border-[#E2DDDD] bg-white ${className}`}>
      <a href={postHref} className="block shrink-0 overflow-hidden border-b border-[#E2DDDD] bg-[#ECE7E7]">
        {post.fields.cover ? (
          <img
            src={asset(post.fields.cover)}
            alt={coverAlt}
            className="aspect-[16/10] h-auto w-full object-cover transition duration-500 hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="aspect-[16/10] w-full bg-gradient-to-br from-[#E8EEF1] via-[#F1F1F1] to-[#E2DDDD]" aria-hidden="true" />
        )}
      </a>
      <div className={`flex flex-1 flex-col ${compact ? 'p-5' : 'p-6'}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6A8390]">
            {post.fields[`category${fieldSuffix}`]}
          </p>
          <span className="hidden text-[#C8C3C3] sm:inline" aria-hidden="true">
            ·
          </span>
          <time className="text-xs font-semibold text-[#8A8A8A]" dateTime={post.fields.date}>
            {dateText}
          </time>
        </div>
        <h3 className={`${compact ? 'mt-2 text-xl' : 'mt-3 text-2xl'} line-clamp-3 min-h-[4.875rem] font-black leading-tight`}>
          <a href={postHref} className="transition hover:text-[#4F5960]">
            {title}
          </a>
        </h3>
        <p className="mt-3 line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-[#656565]">{excerpt}</p>
        <div className="mt-auto border-t border-[#E6E1E1] pt-4">
          <BlogAuthorByline author={post.author} lang={lang} />
          <a
            href={postHref}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#CFCACA] px-4 py-3 text-sm font-bold text-[#272829] transition hover:border-[#272829] hover:bg-[#F8F8F8]"
          >
            {readMoreLabel}
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

export function BlogIndexPage({
  posts,
  lang,
  fieldSuffix,
  dateFormatter,
  copy,
  backHomeHref,
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    const values = Array.from(
      new Set(posts.map((post) => post.fields[`category${fieldSuffix}`]).filter(Boolean)),
    );
    return values.sort((a, b) => a.localeCompare(b, lang === 'es' ? 'es' : 'en'));
  }, [posts, fieldSuffix, lang]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const postCategory = post.fields[`category${fieldSuffix}`];
      if (category !== 'all' && postCategory !== category) return false;
      if (!normalizedQuery) return true;

      const haystack = [
        post.fields[`title${fieldSuffix}`],
        post.fields[`excerpt${fieldSuffix}`],
        postCategory,
        authorName(post.author, lang),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [posts, query, category, fieldSuffix, lang]);

  return (
    <section className="bg-[#F8F8F8] pb-24 pt-10 md:pb-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <a
          href={backHomeHref}
          className="inline-flex items-center gap-2 py-2 text-sm font-bold text-[#5F5F5F] transition hover:text-[#272829]"
        >
          <ChevronRight className="rotate-180" size={16} />
          {copy.backHome}
        </a>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="inline-flex rounded-md border border-[#D9D5D5] bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#6A8390]">
            {copy.label}
          </p>
          <h1 className="mt-5 text-5xl font-black leading-tight text-[#272829] md:text-7xl">{copy.indexTitle}</h1>
          <p className="mt-6 text-lg leading-8 text-[#5F5F5F]">{copy.indexSubtitle}</p>
        </div>

        <div className="mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black leading-tight md:text-4xl">{copy.allArticles}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5F5F5F] md:text-base">{copy.allArticlesSubtitle}</p>
            </div>
            <p className="text-sm font-semibold text-[#6A8390]">
              {filteredPosts.length} {filteredPosts.length === 1 ? copy.resultSingular : copy.resultPlural}
            </p>
          </div>

          <label className="relative mt-8 block">
            <span className="sr-only">{copy.searchLabel}</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={18} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="w-full rounded-md border border-[#D9D5D5] bg-white py-4 pl-12 pr-4 text-sm font-semibold text-[#272829] outline-none transition placeholder:text-[#9A9A9A] focus:border-[#272829]"
            />
          </label>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            <button
              type="button"
              onClick={() => setCategory('all')}
              className={`shrink-0 rounded-md border px-4 py-2.5 text-sm font-bold transition ${
                category === 'all'
                  ? 'border-[#272829] bg-[#272829] text-white'
                  : 'border-[#D9D5D5] bg-white text-[#5F5F5F] hover:border-[#272829] hover:text-[#272829]'
              }`}
            >
              {copy.allCategories}
            </button>
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-md border px-4 py-2.5 text-sm font-bold transition ${
                  category === item
                    ? 'border-[#272829] bg-[#272829] text-white'
                    : 'border-[#D9D5D5] bg-white text-[#5F5F5F] hover:border-[#272829] hover:text-[#272829]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
              {filteredPosts.map((post, index) => (
                <BlogPostCard
                  key={post.slug}
                  post={post}
                  lang={lang}
                  fieldSuffix={fieldSuffix}
                  dateFormatter={dateFormatter}
                  readMoreLabel={copy.readMore}
                  className={index < 2 ? 'xl:col-span-3' : 'xl:col-span-2'}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-md border border-[#E2DDDD] bg-white px-6 py-16 text-center">
              <p className="text-xl font-black text-[#272829]">{copy.emptyTitle}</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#5F5F5F]">{copy.emptyBody}</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('all');
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-[#CFCACA] px-4 py-3 text-sm font-bold text-[#272829] transition hover:border-[#272829]"
              >
                {copy.clearFilters}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
