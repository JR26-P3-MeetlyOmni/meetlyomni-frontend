export interface HeroSectionContent {
  title: string;
  description: string;
  buttons: {
    label: string;
    variant: 'contained' | 'outlined';
  }[];
}
