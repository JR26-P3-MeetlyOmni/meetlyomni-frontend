export interface ImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: ImagePosition;
  styles: ImageStyles;
}

export interface ResponsiveImageWrapperProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  imageWidth: string;
  imageHeight?: string;
  transform?: string;
}

export interface DecorativeContainerProps {
  zIndex?: number;
  opacity?: number;
}

export interface ImagePosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
}

export interface ImageStyles {
  zIndex: number;
  opacity?: number;
  imageWidth: string;
  imageHeight?: string;
}

export interface AuthResultPageProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}
