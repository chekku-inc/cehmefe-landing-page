import React from 'react';

const BASE = import.meta.env.BASE_URL;
const asset = (path) => `${BASE}${String(path).replace(/^\//, '')}`;

function resolveSrc(src) {
  if (!src) return src;
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  return asset(src);
}

export const mdxComponents = {
  h2: (props) => <h2 className="mt-12 text-3xl font-black leading-tight text-[#272829]" {...props} />,
  h3: (props) => <h3 className="mt-10 text-2xl font-black leading-tight text-[#272829]" {...props} />,
  p: (props) => <p className="mt-6 text-lg leading-9 text-[#3F4142]" {...props} />,
  ul: (props) => <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-9 text-[#3F4142]" {...props} />,
  ol: (props) => <ol className="mt-6 list-decimal space-y-3 pl-6 text-lg leading-9 text-[#3F4142]" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => <strong className="font-bold text-[#272829]" {...props} />,
  a: (props) => (
    <a className="font-semibold text-[#6A8390] underline decoration-[#C7D5DB] underline-offset-4 transition hover:text-[#272829]" {...props} />
  ),
  img: ({ src, alt = '', ...props }) => (
    <figure className="my-10 overflow-hidden rounded-md border border-[#E2DDDD] bg-[#F1F1F1]">
      <img src={resolveSrc(src)} alt={alt} className="h-auto w-full object-cover" loading="lazy" {...props} />
      {alt ? <figcaption className="px-4 py-3 text-sm leading-6 text-[#6D6D6D]">{alt}</figcaption> : null}
    </figure>
  ),
};
