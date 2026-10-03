import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCarousel } from './components/ProductCarousel';
import { ControlPanel } from './components/ControlPanel';
import { ProductDetailModal } from './components/ProductDetailModal';
import { defaultProducts } from './data/defaultProducts';
import { ProductItem, SliderSettings, StyleSettings } from './types';
import {
  SlidersHorizontal,
  Sparkles,
  Zap,
  Shield,
  MousePointer2,
  Smartphone
} from 'lucide-react';

const initialSettings: SliderSettings = {
  desktop: 3.2,
  tablet: 2.1,
  mobile: 1.15,
  gap: 20,
  slidesPerGroup: 1,
  centeredSlides: false,
  effect: 'slide',
  autoplay: false,
  autoplayDelay: 3500,
  autoplayReverse: false,
  autoplayPauseOnInteraction: false,
  flowDirection: 'auto',
  loop: true,
  rewind: true,
  pauseOnHover: true,
  showArrows: true,
  showDots: true,
  paginationType: 'bullets',
  dynamicBullets: true,
  dynamicMainBullets: 1,
  speed: 550,
  allowTouchMove: true,
  dragThreshold: 8,
  mousewheel: false,
  mousewheelSensitivity: 1,
  mousewheelReleaseOnEdges: true,
  keyboard: true,
  respectReducedMotion: true,
  title_html_tag: 'h3',
  desc_max_lines: 3,
};

const initialStyles: StyleSettings = {
  primaryColor: '#152238',
  surfaceColor: '#f7f9fc',
  accentColor: '#1f6feb',
  successColor: '#0f9d58',
  borderRadius: 18,
  cardElevation: 'medium',
};

export const App: React.FC = () => {
  const [items, setItems] = useState<ProductItem[]>(defaultProducts);
  const [settings, setSettings] = useState<SliderSettings>(initialSettings);
  const [styles, setStyles] = useState<StyleSettings>(initialStyles);
  const [activeView, setActiveView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'slider' | 'style' | 'export'>('slider');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activePreset, setActivePreset] = useState<string>('modern');

  const applyPreset = (presetName: string) => {
    setActivePreset(presetName);
    switch (presetName) {
      case 'modern':
        setSettings((prev) => ({
          ...prev,
          desktop: 3.2,
          tablet: 2.1,
          mobile: 1.15,
          effect: 'slide',
          centeredSlides: false,
          paginationType: 'bullets',
          dynamicBullets: true,
          gap: 20,
          loop: true,
          autoplay: false,
        }));
        break;
      case 'coverflow':
        setSettings((prev) => ({
          ...prev,
          desktop: 3,
          tablet: 2,
          mobile: 1,
          effect: 'coverflow',
          centeredSlides: true,
          paginationType: 'fraction',
          gap: 0,
          loop: true,
          autoplay: false,
        }));
        break;
      case 'cards':
        setSettings((prev) => ({
          ...prev,
          desktop: 1,
          tablet: 1,
          mobile: 1,
          effect: 'cards',
          centeredSlides: true,
          paginationType: 'bullets',
          dynamicBullets: false,
          gap: 0,
          loop: false,
          autoplay: false,
        }));
        break;
      case 'compact':
        setSettings((prev) => ({
          ...prev,
          desktop: 4,
          tablet: 2.5,
          mobile: 1.2,
          effect: 'slide',
          centeredSlides: false,
          paginationType: 'progressbar',
          gap: 16,
          loop: true,
          autoplay: false,
        }));
        break;
      case 'hero':
        setSettings((prev) => ({
          ...prev,
          desktop: 1.5,
          tablet: 1.2,
          mobile: 1,
          effect: 'slide',
          centeredSlides: true,
          paginationType: 'bullets',
          dynamicBullets: true,
          gap: 24,
          loop: true,
          autoplay: true,
          autoplayDelay: 4000,
        }));
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setStyles(initialStyles);
    setItems(defaultProducts);
    setActivePreset('modern');
  };

  const getViewContainerClass = () => {
    switch (activeView) {
      case 'mobile':
        return 'max-w-[420px] mx-auto p-4 bg-white/70 rounded-3xl shadow-xl border border-slate-200 transition-all';
      case 'tablet':
        return 'max-w-[768px] mx-auto p-6 bg-white/70 rounded-3xl shadow-xl border border-slate-200 transition-all';
      case 'desktop':
      default:
        return 'w-full max-w-7xl mx-auto transition-all';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-500 selection:text-white">
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        activePreset={activePreset}
        applyPreset={applyPreset}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveTab={setActiveTab}
        onReset={handleReset}
      />

      {/* Main Showcase Section */}
      <main className="flex-1 py-8 px-4 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Banner */}
        <section className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Elementor Pro Slider Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Product Carousel Pro
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Configure, preview, and test the production-ready product carousel with responsive breakpoints,
            smooth effects, repeater items, and dynamic pagination.
          </p>
        </section>

        {/* Live Carousel Display Area */}
        <div className="relative mb-16">
          <div className={getViewContainerClass()}>
            {activeView !== 'desktop' && (
              <div className="mb-3 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-200/80 text-slate-700">
                  <Smartphone className="w-3.5 h-3.5" />
                  Simulating {activeView === 'mobile' ? 'Mobile (420px)' : 'Tablet (768px)'} viewport
                </span>
              </div>
            )}

            <ProductCarousel
              items={items}
              settings={settings}
              styles={styles}
              onProductClick={(product) => setSelectedProduct(product)}
            />
          </div>
        </div>

        {/* Quick Feature Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Multi-Effect Swiper Engine
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Switch seamlessly between Classic Slide, Smooth Crossfade, 3D Coverflow, Stacked Cards, and Creative Matrix transitions with hardware acceleration.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <MousePointer2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Optimized Touch & Drag
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prevents native text selection conflicts on desktop while preserving vertical scrolling, pinch-to-zoom, and smooth gesture thresholds on mobile.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              Accessibility & Motion
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Includes full keyboard navigation, screen reader labels, reduced-motion overrides, and dynamic bullet sizing for effortless discovery.
            </p>
          </div>
        </section>
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Control Panel Drawer */}
      <ControlPanel
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        items={items}
        setItems={setItems}
        settings={settings}
        setSettings={setSettings}
        styles={styles}
        setStyles={setStyles}
      />

      {/* Bottom Floating Bar when controls are closed */}
      {!isSidebarOpen && (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Customize Carousel</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
