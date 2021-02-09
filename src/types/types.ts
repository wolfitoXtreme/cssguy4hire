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

export enum sections {
  HOME = 'home',
  ABOUT = 'about',
  SKILLS = 'skills',
  ROLES = 'roles',
  WORK = 'work',
  CONTACT = 'contact'
}
