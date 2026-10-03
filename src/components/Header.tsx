import React from 'react';
import {
  SlidersHorizontal,
  Layers,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Code,
  RotateCcw
} from 'lucide-react';

interface HeaderProps {
  activeView: 'desktop' | 'tablet' | 'mobile';
  setActiveView: (view: 'desktop' | 'tablet' | 'mobile') => void;
  activePreset: string;
  applyPreset: (presetName: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: 'content' | 'slider' | 'style' | 'export') => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  activePreset,
  applyPreset,
  isSidebarOpen,
  setIsSidebarOpen,
  setActiveTab,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base tracking-tight text-slate-900">
                Product Carousel Pro
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                v2.1.1
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Elementor Pro interactive product slider & visual customizer
            </p>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setActiveView('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'desktop'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'hover:text-slate-900'
            }`}
            title="Desktop view"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'tablet'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'hover:text-slate-900'
            }`}
            title="Tablet view (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'mobile'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'hover:text-slate-900'
            }`}
            title="Mobile view (420px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Quick Actions & Controls toggle */}
        <div className="flex items-center gap-2">
          {/* Preset dropdown */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1 rounded-xl text-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 ml-1" />
            <span className="text-slate-500 font-medium">Preset:</span>
            <select
              value={activePreset}
              onChange={(e) => applyPreset(e.target.value)}
              aria-label="Preset styles"
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
            >
              <option value="modern">Modern Tech (3.5 slides)</option>
              <option value="coverflow">Coverflow 3D</option>
              <option value="cards">Cards Stack</option>
              <option value="compact">Compact Grid</option>
              <option value="hero">Hero Showcase</option>
            </select>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Reset Settings"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('export');
              setIsSidebarOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-sm"
          >
            <Code className="w-3.5 h-3.5 text-blue-400" />
            <span>Export Code</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs transition-all border ${
              isSidebarOpen
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isSidebarOpen ? 'Hide Editor' : 'Open Controls'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
