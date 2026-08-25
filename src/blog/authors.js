const BASE = import.meta.env.BASE_URL;
const asset = (path) => `${BASE}${String(path).replace(/^\//, '')}`;

export const DEFAULT_AUTHOR_ID = 'monica-garcia';

export const authors = {
  'monica-garcia': {
    id: 'monica-garcia',
    nameEs: 'Dra. Mónica García',
    nameEn: 'Dr. Monica Garcia',
    roleEs: 'Especialista en Medicina Fetal',
    roleEn: 'Fetal Medicine Specialist',
    avatar: 'doctor-photos/IMG_6048.JPG',
  },
};

export function getAuthor(authorId = DEFAULT_AUTHOR_ID) {
  return authors[authorId] || authors[DEFAULT_AUTHOR_ID];
}

export function authorName(author, lang = 'es') {
  return lang === 'en' ? author.nameEn : author.nameEs;
}

export function authorRole(author, lang = 'es') {
  return lang === 'en' ? author.roleEn : author.roleEs;
}

export function authorAvatar(author) {
  return asset(author.avatar);
}
