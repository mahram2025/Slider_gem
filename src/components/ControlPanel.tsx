import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Copy,
  Check,
  Settings,
  Palette,
  Package,
  Code2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ProductItem, SliderSettings, StyleSettings, SliderEffect, PaginationType, FlowDirection, TitleTag } from '../types';

interface ControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'content' | 'slider' | 'style' | 'export';
  setActiveTab: (tab: 'content' | 'slider' | 'style' | 'export') => void;
  items: ProductItem[];
  setItems: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  settings: SliderSettings;
  setSettings: React.Dispatch<React.SetStateAction<SliderSettings>>;
  styles: StyleSettings;
  setStyles: React.Dispatch<React.SetStateAction<StyleSettings>>;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  items,
  setItems,
  settings,
  setSettings,
  styles,
  setStyles,
}) => {
  const [copied, setCopied] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(items[0]?.id || null);

  const updateSetting = <K extends keyof SliderSettings>(key: K, value: SliderSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateStyle = <K extends keyof StyleSettings>(key: K, value: StyleSettings[K]) => {
    setStyles((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddItem = () => {
    const newItem: ProductItem = {
      id: `prod-${Date.now()}`,
      title: 'New Featured Product',
      category: 'Special',
      badge_icon: 'sparkles',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      price: '$99.00',
      desc: 'High performance precision design crafted for modern creators and enthusiasts.',
      btn_text: 'Order Now',
      btn_icon: 'shopping-bag',
      btn_icon_position: 'before',
      link: '#order'
    };
    setItems((prev) => [...prev, newItem]);
    setExpandedItemId(newItem.id);
  };

  const handleDeleteItem = (id: string) => {
    if (items.length <= 1) {
      alert('You must have at least one product item in the carousel.');
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<ProductItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const elementorSettingsJson = JSON.stringify(
    {
      desktop: settings.desktop,
      tablet: settings.tablet,
      mobile: settings.mobile,
      gap: settings.gap,
      slidesPerGroup: settings.slidesPerGroup,
      centeredSlides: settings.centeredSlides,
      effect: settings.effect,
      autoplay: settings.autoplay,
      autoplayDelay: settings.autoplayDelay,
      autoplayReverse: settings.autoplayReverse,
      autoplayPauseOnInteraction: settings.autoplayPauseOnInteraction,
      flowDirection: settings.flowDirection,
      loop: settings.loop,
      rewind: settings.rewind,
      pauseOnHover: settings.pauseOnHover,
      showArrows: settings.showArrows,
      showDots: settings.showDots,
      paginationType: settings.paginationType,
      dynamicBullets: settings.dynamicBullets,
      dynamicMainBullets: settings.dynamicMainBullets,
      speed: settings.speed,
      allowTouchMove: settings.allowTouchMove,
      dragThreshold: settings.dragThreshold,
      mousewheel: settings.mousewheel,
      mousewheelSensitivity: settings.mousewheelSensitivity,
      mousewheelReleaseOnEdges: settings.mousewheelReleaseOnEdges,
      keyboard: settings.keyboard,
      respectReducedMotion: settings.respectReducedMotion,
    },
    null,
    2
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h2 className="font-bold text-slate-800 text-sm">Widget Customizer</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          aria-label="Close customizer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'content'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Items ({items.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('slider')}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'slider'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Slider</span>
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'style'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Style</span>
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'export'
              ? 'border-blue-600 text-blue-600 bg-white'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700">
        {/* TAB 1: CONTENT / ITEMS REPEATER */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-800 text-sm">Repeater Items</span>
              <button
                onClick={handleAddItem}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => {
                const isExpanded = expandedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    className="border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-100/70 transition-colors"
                      onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-7 h-7 rounded-md object-cover border border-slate-200 shrink-0"
                        />
                        <span className="font-semibold text-slate-800 truncate">
                          {idx + 1}. {item.title || 'Untitled Item'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-slate-500 font-bold mr-1">{item.price}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 bg-white border-t border-slate-200 space-y-3">
                        <div>
                          <label className="block font-semibold mb-1 text-slate-700">Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdateItem(item.id, { title: e.target.value })}
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-semibold mb-1 text-slate-700">Price / Label</label>
                            <input
                              type="text"
                              value={item.price}
                              onChange={(e) => handleUpdateItem(item.id, { price: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold mb-1 text-slate-700">Badge Text</label>
                            <input
                              type="text"
                              value={item.category}
                              onChange={(e) => handleUpdateItem(item.id, { category: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-semibold mb-1 text-slate-700">Badge Icon</label>
                            <select
                              value={item.badge_icon || 'none'}
                              onChange={(e) =>
                                handleUpdateItem(item.id, {
                                  badge_icon: e.target.value === 'none' ? undefined : e.target.value,
                                })
                              }
                              className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            >
                              <option value="none">None</option>
                              <option value="flame">Flame (Fire)</option>
                              <option value="star">Star</option>
                              <option value="sparkles">Sparkles</option>
                              <option value="gem">Gem</option>
                              <option value="sun">Sun</option>
                              <option value="award">Award</option>
                              <option value="droplets">Droplets</option>
                              <option value="compass">Compass</option>
                            </select>
                          </div>
                          <div>
                            <label className="block font-semibold mb-1 text-slate-700">Button Icon</label>
                            <select
                              value={item.btn_icon || 'none'}
                              onChange={(e) =>
                                handleUpdateItem(item.id, {
                                  btn_icon: e.target.value === 'none' ? undefined : e.target.value,
                                })
                              }
                              className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            >
                              <option value="none">None</option>
                              <option value="arrow-right">Arrow Right</option>
                              <option value="shopping-bag">Shopping Bag</option>
                              <option value="headphones">Headphones</option>
                              <option value="eye">Eye</option>
                              <option value="sliders">Sliders</option>
                              <option value="volume-2">Volume</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold mb-1 text-slate-700">Image URL</label>
                          <input
                            type="text"
                            value={item.image}
                            onChange={(e) => handleUpdateItem(item.id, { image: e.target.value })}
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold mb-1 text-slate-700">Description</label>
                          <textarea
                            rows={2}
                            value={item.desc}
                            onChange={(e) => handleUpdateItem(item.id, { desc: e.target.value })}
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block font-semibold mb-1 text-slate-700">Button Text</label>
                            <input
                              type="text"
                              value={item.btn_text}
                              onChange={(e) => handleUpdateItem(item.id, { btn_text: e.target.value })}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold mb-1 text-slate-700">Icon Position</label>
                            <select
                              value={item.btn_icon_position}
                              onChange={(e) =>
                                handleUpdateItem(item.id, {
                                  btn_icon_position: e.target.value as 'before' | 'after',
                                })
                              }
                              className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            >
                              <option value="before">Before Text</option>
                              <option value="after">After Text</option>
                            </select>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            className="flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Item</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: SLIDER ENGINE SETTINGS */}
        {activeTab === 'slider' && (
          <div className="space-y-5">
            {/* Breakpoints */}
            <div className="space-y-3">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-500">
                Responsive Slides Per View
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-slate-600">Desktop</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="6"
                    value={settings.desktop}
                    onChange={(e) => updateSetting('desktop', parseFloat(e.target.value) || 3)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-600">Tablet</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="4"
                    value={settings.tablet}
                    onChange={(e) => updateSetting('tablet', parseFloat(e.target.value) || 2)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-600">Mobile</label>
                  <input
                    type="number"
                    step="0.05"
                    min="1"
                    max="2.5"
                    value={settings.mobile}
                    onChange={(e) => updateSetting('mobile', parseFloat(e.target.value) || 1.15)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Effect & Spacing */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Slide Effect</label>
                <select
                  value={settings.effect}
                  onChange={(e) => updateSetting('effect', e.target.value as SliderEffect)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="slide">Classic Slide</option>
                  <option value="fade">Smooth Fade</option>
                  <option value="coverflow">3D Coverflow</option>
                  <option value="cards">Cards Flip</option>
                  <option value="creative">Creative Matrix</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Gap (px)</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={settings.gap}
                  onChange={(e) => updateSetting('gap', parseInt(e.target.value, 10) || 0)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Autoplay Section */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-800">Autoplay</label>
                <input
                  type="checkbox"
                  checked={settings.autoplay}
                  onChange={(e) => updateSetting('autoplay', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              {settings.autoplay && (
                <>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-600">
                      Delay: {settings.autoplayDelay}ms
                    </label>
                    <input
                      type="range"
                      min="1500"
                      max="8000"
                      step="500"
                      value={settings.autoplayDelay}
                      onChange={(e) => updateSetting('autoplayDelay', parseInt(e.target.value, 10))}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-slate-600">Pause on Hover</label>
                    <input
                      type="checkbox"
                      checked={settings.pauseOnHover}
                      onChange={(e) => updateSetting('pauseOnHover', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-slate-600">Reverse Direction</label>
                    <input
                      type="checkbox"
                      checked={settings.autoplayReverse}
                      onChange={(e) => updateSetting('autoplayReverse', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Navigation & Pagination */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-800">Show Arrows</label>
                <input
                  type="checkbox"
                  checked={settings.showArrows}
                  onChange={(e) => updateSetting('showArrows', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-800">Show Pagination</label>
                <input
                  type="checkbox"
                  checked={settings.showDots}
                  onChange={(e) => updateSetting('showDots', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              {settings.showDots && (
                <>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-600">Pagination Type</label>
                    <select
                      value={settings.paginationType}
                      onChange={(e) => updateSetting('paginationType', e.target.value as PaginationType)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="bullets">Bullets / Dots</option>
                      <option value="fraction">Fraction (e.g. 1 / 8)</option>
                      <option value="progressbar">Top Progress Bar</option>
                    </select>
                  </div>

                  {settings.paginationType === 'bullets' && (
                    <div className="flex items-center justify-between">
                      <label className="text-slate-600">Dynamic Bullets</label>
                      <input
                        type="checkbox"
                        checked={settings.dynamicBullets}
                        onChange={(e) => updateSetting('dynamicBullets', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Behavior & Interaction */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">Infinite Loop</label>
                <input
                  type="checkbox"
                  checked={settings.loop}
                  onChange={(e) => updateSetting('loop', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">Centered Active Slide</label>
                <input
                  type="checkbox"
                  checked={settings.centeredSlides}
                  onChange={(e) => updateSetting('centeredSlides', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">Mousewheel Navigation</label>
                <input
                  type="checkbox"
                  checked={settings.mousewheel}
                  onChange={(e) => updateSetting('mousewheel', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">Keyboard Controls</label>
                <input
                  type="checkbox"
                  checked={settings.keyboard}
                  onChange={(e) => updateSetting('keyboard', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">Touch / Mouse Drag</label>
                <input
                  type="checkbox"
                  checked={settings.allowTouchMove}
                  onChange={(e) => updateSetting('allowTouchMove', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>

            {/* Direction & HTML Tags */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Flow Direction</label>
                <select
                  value={settings.flowDirection}
                  onChange={(e) => updateSetting('flowDirection', e.target.value as FlowDirection)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="auto">Auto (Default)</option>
                  <option value="ltr">Left to Right (LTR)</option>
                  <option value="rtl">Right to Left (RTL)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Title HTML Tag</label>
                <select
                  value={settings.title_html_tag}
                  onChange={(e) => updateSetting('title_html_tag', e.target.value as TitleTag)}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="h2">H2</option>
                  <option value="h3">H3 (Default)</option>
                  <option value="h4">H4</option>
                  <option value="div">DIV</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STYLING & THEMING */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-500">
              Custom Colors & Card Styles
            </span>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700">Accent / Button Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={styles.accentColor}
                    onChange={(e) => updateStyle('accentColor', e.target.value)}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={styles.accentColor}
                    onChange={(e) => updateStyle('accentColor', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Price / Success Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={styles.successColor}
                    onChange={(e) => updateStyle('successColor', e.target.value)}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={styles.successColor}
                    onChange={(e) => updateStyle('successColor', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Media Surface Background</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={styles.surfaceColor}
                    onChange={(e) => updateStyle('surfaceColor', e.target.value)}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={styles.surfaceColor}
                    onChange={(e) => updateStyle('surfaceColor', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-500 mb-2">
                Quick Theme Palettes
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setStyles({
                      primaryColor: '#152238',
                      surfaceColor: '#f7f9fc',
                      accentColor: '#1f6feb',
                      successColor: '#0f9d58',
                      borderRadius: 18,
                      cardElevation: 'medium',
                    })
                  }
                  className="p-2.5 rounded-lg border border-slate-200 text-left hover:border-blue-400 transition-all"
                >
                  <div className="flex gap-1 mb-1">
                    <span className="w-3 h-3 rounded-full bg-[#1f6feb]" />
                    <span className="w-3 h-3 rounded-full bg-[#0f9d58]" />
                    <span className="w-3 h-3 rounded-full bg-[#152238]" />
                  </div>
                  <div className="font-semibold text-slate-800">Elementor Blue</div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setStyles({
                      primaryColor: '#0f172a',
                      surfaceColor: '#ecfdf5',
                      accentColor: '#059669',
                      successColor: '#10b981',
                      borderRadius: 18,
                      cardElevation: 'medium',
                    })
                  }
                  className="p-2.5 rounded-lg border border-slate-200 text-left hover:border-emerald-400 transition-all"
                >
                  <div className="flex gap-1 mb-1">
                    <span className="w-3 h-3 rounded-full bg-[#059669]" />
                    <span className="w-3 h-3 rounded-full bg-[#10b981]" />
                    <span className="w-3 h-3 rounded-full bg-[#0f172a]" />
                  </div>
                  <div className="font-semibold text-slate-800">Emerald Luxe</div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setStyles({
                      primaryColor: '#18181b',
                      surfaceColor: '#fff1f2',
                      accentColor: '#e11d48',
                      successColor: '#ea580c',
                      borderRadius: 18,
                      cardElevation: 'medium',
                    })
                  }
                  className="p-2.5 rounded-lg border border-slate-200 text-left hover:border-rose-400 transition-all"
                >
                  <div className="flex gap-1 mb-1">
                    <span className="w-3 h-3 rounded-full bg-[#e11d48]" />
                    <span className="w-3 h-3 rounded-full bg-[#ea580c]" />
                    <span className="w-3 h-3 rounded-full bg-[#18181b]" />
                  </div>
                  <div className="font-semibold text-slate-800">Crimson Coral</div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setStyles({
                      primaryColor: '#312e81',
                      surfaceColor: '#eef2ff',
                      accentColor: '#4f46e5',
                      successColor: '#059669',
                      borderRadius: 18,
                      cardElevation: 'medium',
                    })
                  }
                  className="p-2.5 rounded-lg border border-slate-200 text-left hover:border-indigo-400 transition-all"
                >
                  <div className="flex gap-1 mb-1">
                    <span className="w-3 h-3 rounded-full bg-[#4f46e5]" />
                    <span className="w-3 h-3 rounded-full bg-[#059669]" />
                    <span className="w-3 h-3 rounded-full bg-[#312e81]" />
                  </div>
                  <div className="font-semibold text-slate-800">Royal Indigo</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXPORT CODE */}
        {activeTab === 'export' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                Elementor data-settings JSON
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(elementorSettingsJson)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl overflow-x-auto font-mono text-[11px] leading-relaxed max-h-56">
              {elementorSettingsJson}
            </pre>

            <div className="pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-500 mb-2">
                WordPress Shortcode
              </span>
              <div className="p-2.5 bg-slate-100 rounded-xl font-mono text-[11px] text-slate-800 flex items-center justify-between border border-slate-200">
                <code>[product_carousel_pro effect="{settings.effect}" desktop="{settings.desktop}"]</code>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `[product_carousel_pro effect="${settings.effect}" desktop="${settings.desktop}"]`
                    )
                  }
                  className="p-1 hover:text-blue-600"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
        <span>Product Carousel Elementor v2.1.1</span>
        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
        >
          Done
        </button>
      </div>
    </aside>
  );
};
