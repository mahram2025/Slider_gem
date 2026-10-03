import React, { useId, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  Mousewheel,
  EffectFade,
  EffectCoverflow,
  EffectCards,
  EffectCreative,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';

import { ProductItem, SliderSettings, StyleSettings } from '../types';
import { ProductIcon } from './ProductIcon';

interface ProductCarouselProps {
  items: ProductItem[];
  settings: SliderSettings;
  styles?: StyleSettings;
  onProductClick?: (product: ProductItem) => void;
  className?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  items,
  settings,
  styles,
  onProductClick,
  className = '',
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const isSingleSlideEffect = settings.effect === 'fade' || settings.effect === 'cards';
  const visibleDesktop = isSingleSlideEffect ? 1 : Math.ceil(settings.desktop);
  const canLoop = settings.loop && items.length > visibleDesktop;

  const isRTL = settings.flowDirection === 'rtl';

  const modules = useMemo(() => {
    return [
      Navigation,
      Pagination,
      Autoplay,
      Keyboard,
      Mousewheel,
      EffectFade,
      EffectCoverflow,
      EffectCards,
      EffectCreative,
    ];
  }, []);

  const dynamicStyles = useMemo(() => {
    if (!styles) return {};
    return {
      '--pce-color-accent': styles.accentColor || '#1f6feb',
      '--pce-color-surface': styles.surfaceColor || '#f7f9fc',
      '--pce-color-success': styles.successColor || '#0f9d58',
    } as React.CSSProperties;
  }, [styles]);

  const TitleTag = settings.title_html_tag || 'h3';

  return (
    <div
      id={`pce-${uniqueId}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`pce-v5-wrapper ${className}`}
      style={dynamicStyles}
    >
      <div className={`swiper pce-v5-slider ${settings.allowTouchMove ? 'pce-is-draggable' : ''}`}>
        <Swiper
          key={`${settings.effect}-${settings.desktop}-${settings.gap}-${settings.paginationType}-${settings.loop}-${isRTL}-${items.length}`}
          modules={modules}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          direction="horizontal"
          speed={settings.speed}
          grabCursor={settings.allowTouchMove}
          simulateTouch={settings.allowTouchMove}
          allowTouchMove={settings.allowTouchMove}
          threshold={Math.max(0, settings.dragThreshold)}
          loop={canLoop}
          rewind={!canLoop && settings.rewind}
          centeredSlides={!isSingleSlideEffect && settings.centeredSlides}
          slidesPerGroup={isSingleSlideEffect ? 1 : Math.max(1, settings.slidesPerGroup)}
          effect={settings.effect}
          spaceBetween={settings.gap}
          slidesPerView={isSingleSlideEffect ? 1 : settings.mobile}
          breakpoints={{
            0: {
              slidesPerView: isSingleSlideEffect ? 1 : settings.mobile,
              spaceBetween: Math.min(settings.gap, 16),
            },
            640: {
              slidesPerView: isSingleSlideEffect ? 1 : settings.tablet,
              spaceBetween: settings.gap,
            },
            1024: {
              slidesPerView: isSingleSlideEffect ? 1 : settings.desktop,
              spaceBetween: settings.gap,
            },
          }}
          autoplay={
            settings.autoplay
              ? {
                  delay: settings.autoplayDelay,
                  disableOnInteraction: settings.autoplayPauseOnInteraction,
                  pauseOnMouseEnter: settings.pauseOnHover,
                  reverseDirection: settings.autoplayReverse,
                }
              : false
          }
          navigation={
            settings.showArrows
              ? {
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }
              : false
          }
          pagination={
            settings.showDots
              ? {
                  el: paginationRef.current,
                  type: settings.paginationType,
                  clickable: settings.paginationType === 'bullets' && items.length > 1,
                  dynamicBullets:
                    settings.paginationType === 'bullets' ? settings.dynamicBullets : false,
                  dynamicMainBullets:
                    settings.paginationType === 'bullets'
                      ? Math.max(1, Math.round(settings.dynamicMainBullets))
                      : 1,
                }
              : false
          }
          keyboard={{
            enabled: settings.keyboard,
            onlyInViewport: true,
          }}
          mousewheel={
            settings.mousewheel
              ? {
                  forceToAxis: true,
                  releaseOnEdges: settings.mousewheelReleaseOnEdges,
                  sensitivity: Math.max(0.1, settings.mousewheelSensitivity),
                }
              : false
          }
          fadeEffect={{ crossFade: true }}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          creativeEffect={{
            prev: {
              shadow: false,
              translate: [0, 0, -180],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }}
        >
          {items.map((item) => {
            const hasIcon = Boolean(item.btn_icon);
            const isIconAfter = item.btn_icon_position === 'after';

            return (
              <SwiperSlide key={item.id}>
                <article className="pce-v5-card">
                  {item.category && (
                    <span className="pce-v5-badge">
                      {item.badge_icon && (
                        <span className="pce-v5-badge-icon" aria-hidden="true">
                          <ProductIcon name={item.badge_icon} className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <span className="pce-v5-badge-text">{item.category}</span>
                    </span>
                  )}

                  <div
                    className="pce-v5-media cursor-pointer"
                    onClick={() => onProductClick?.(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onProductClick?.(item);
                      }
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        // Fallback image if network fails
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>

                  <div className="pce-v5-body">
                    {item.title && (
                      <TitleTag
                        className="pce-v5-title cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => onProductClick?.(item)}
                      >
                        {item.title}
                      </TitleTag>
                    )}

                    {item.price && <p className="pce-v5-price">{item.price}</p>}

                    {item.desc && (
                      <p
                        className="pce-v5-desc"
                        style={{
                          WebkitLineClamp: settings.desc_max_lines || 3,
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {item.desc}
                      </p>
                    )}
                  </div>

                  <div className="pce-v5-btn-wrapper">
                    <button
                      type="button"
                      onClick={() => onProductClick?.(item)}
                      className={`pce-v5-btn ${hasIcon ? 'has-icon' : ''} ${
                        hasIcon && isIconAfter ? 'icon-after' : 'icon-before'
                      }`}
                    >
                      {hasIcon && (
                        <span className="pce-v5-btn-icon" aria-hidden="true">
                          <ProductIcon name={item.btn_icon} className="w-4 h-4" />
                        </span>
                      )}
                      <span className="pce-v5-btn-label">{item.btn_text || 'View Product'}</span>
                    </button>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Navigation Arrows */}
      <div className={`pce-v5-navigation ${settings.showArrows ? '' : 'is-hidden'}`}>
        <button
          ref={prevRef}
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="pce-v5-nav pce-v5-prev"
          aria-label={isRTL ? 'Next slide' : 'Previous slide'}
        >
          <span>{isRTL ? '→' : '←'}</span>
        </button>
        <button
          ref={nextRef}
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="pce-v5-nav pce-v5-next"
          aria-label={isRTL ? 'Previous slide' : 'Next slide'}
        >
          <span>{isRTL ? '←' : '→'}</span>
        </button>
      </div>

      {/* Pagination Container */}
      <div
        ref={paginationRef}
        className={`swiper-pagination pce-v5-pagination pce-v5-pagination-${settings.paginationType} ${
          settings.showDots ? '' : 'is-hidden'
        }`}
      />
    </div>
  );
};
