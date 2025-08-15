import { StaticImageData } from 'next/image';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface UserInfo {
  username: string;
  avatar: StaticImageData | string;
}
