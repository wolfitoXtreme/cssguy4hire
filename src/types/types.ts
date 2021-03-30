export type FontVariantType = {
  variant: string;
  variantName: string;
  variantWeight: string;
};

export interface FontInt {
  font: string;
  fontName: string;
  fontVariants: FontVariantType[];
}

export type languageStateType = {
  languageReducer: { lang: string };
};

export type sectionSkillsType = {
  id: string;
  categories: { id?: string; text?: string; expertise?: number }[];
  other?: string;
}[];

export enum devices {
  MOBILE = 'mobile',
  DESKTOP = 'desktop'
}

export enum languages {
  ENGLISH = 'en',
  SPANISH = 'es'
}

export enum sections {
  HOME = 'home',
  ABOUT = 'about',
  SKILLS = 'skills',
  ROLES = 'roles',
  WORK = 'work',
  CONTACT = 'contact'
}

export enum links {
  GITHUB = 'github',
  LINKEDIN = 'linkedin',
  CODEPEN = 'codepen',
  STACKOVERFLOW = 'stackoverflow',
  BEHANCE = 'behance',
  CV = 'cv',
  LANG = 'lang'
}
