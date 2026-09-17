import React from 'react';
import { ChefHat, Smartphone, Monitor, LayoutGrid } from 'lucide-react';
import { Screen } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

export type LayoutMode = 'simulator' | 'all-screens' | 'full';

interface HeaderProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  layoutMode: LayoutMode;
  onChangeLayoutMode: (mode: LayoutMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  layoutMode,
  onChangeLayoutMode,
}) => {
  const getScreenMeta = (screen: Screen) => {
    switch (screen) {
      case 'home':
        return { label: 'Screen 1: Search & Home', desc: 'Find by ingredients' };
      case 'results':
        return { label: 'Screen 2: Results List', desc: 'Recipe cards & cook times' };
      case 'detail':
        return { label: 'Screen 3: Recipe Detail', desc: 'Ingredients & numbered steps' };
      case 'saved':
        return { label: 'Screen 4: Saved Grid', desc: 'Your offline cookbook' };
    }
  };

  const meta = getScreenMeta(currentScreen);

  return (
    <header className="bg-white border-b border-[#E8E2D9] sticky top-0 z-30 shadow-2xs">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <button
          id="btn-brand-home"
          type="button"
          onClick={() => {
            onNavigate('home');
            if (layoutMode === 'all-screens') onChangeLayoutMode('simulator');
          }}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-2xl bg-[#5A7D5B] flex items-center justify-center text-white shadow-md shadow-[#5A7D5B]/20 group-hover:scale-105 transition-transform">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif italic font-bold text-lg text-[#5A7D5B] tracking-tight">
                Savor
              </span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#F5F2EE] text-[#5A7D5B] font-semibold rounded-full border border-[#E8E2D9]">
                Pantry Flow
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#3A3530]/60 leading-tight">
              {layoutMode === 'all-screens' ? '4-Screen Flow Board' : meta.desc}
            </p>
          </div>
        </button>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Flow Mode Switcher for desktop and tablet */}
          <div className="hidden sm:flex items-center bg-[#F5F2EE] p-0.5 rounded-xl border border-[#E8E2D9] text-xs">
            <button
              type="button"
              onClick={() => onChangeLayoutMode('simulator')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                layoutMode === 'simulator'
                  ? 'bg-white font-medium text-[#5A7D5B] shadow-2xs'
                  : 'text-[#3A3530]/60 hover:text-[#3A3530]'
              }`}
              title="Interactive Phone Simulator"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px]">Phone</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeLayoutMode('all-screens')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                layoutMode === 'all-screens'
                  ? 'bg-white font-medium text-[#5A7D5B] shadow-2xs'
                  : 'text-[#3A3530]/60 hover:text-[#3A3530]'
              }`}
              title="All 4 Screens Flow (Side-by-side consistency board)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="text-[11px]">All 4 Flow</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeLayoutMode('full')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                layoutMode === 'full'
                  ? 'bg-white font-medium text-[#5A7D5B] shadow-2xs'
                  : 'text-[#3A3530]/60 hover:text-[#3A3530]'
              }`}
              title="Full Width Expanded View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[11px]">Full</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
