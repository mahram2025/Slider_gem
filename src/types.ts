export interface ProductItem {
  id: string;
  title: string;
  category: string; // Badge label
  badge_icon?: string;
  image: string;
  price: string;
  desc: string;
  btn_text: string;
  btn_icon?: string;
  btn_icon_position: 'before' | 'after';
  link: string;
}

export type SliderEffect = 'slide' | 'fade' | 'coverflow' | 'cards' | 'creative';
export type PaginationType = 'bullets' | 'fraction' | 'progressbar';
export type FlowDirection = 'auto' | 'ltr' | 'rtl';
export type TitleTag = 'h2' | 'h3' | 'h4' | 'div';

export interface SliderSettings {
  desktop: number;
  tablet: number;
  mobile: number;
  gap: number;
  slidesPerGroup: number;
  centeredSlides: boolean;
  effect: SliderEffect;
  autoplay: boolean;
  autoplayDelay: number;
  autoplayReverse: boolean;
  autoplayPauseOnInteraction: boolean;
  flowDirection: FlowDirection;
  loop: boolean;
  rewind: boolean;
  pauseOnHover: boolean;
  showArrows: boolean;
  showDots: boolean;
  paginationType: PaginationType;
  dynamicBullets: boolean;
  dynamicMainBullets: number;
  speed: number;
  allowTouchMove: boolean;
  dragThreshold: number;
  mousewheel: boolean;
  mousewheelSensitivity: number;
  mousewheelReleaseOnEdges: boolean;
  keyboard: boolean;
  respectReducedMotion: boolean;
  title_html_tag: TitleTag;
  desc_max_lines: number;
}

export interface StyleSettings {
  primaryColor: string;
  surfaceColor: string;
  accentColor: string;
  successColor: string;
  borderRadius: number;
  cardElevation: 'none' | 'subtle' | 'medium' | 'high';
}
