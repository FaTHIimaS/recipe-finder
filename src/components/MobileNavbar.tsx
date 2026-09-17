import React from 'react';
import { Search, ListFilter, BookOpen, Heart } from 'lucide-react';
import { Screen } from '../types';

interface MobileNavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  savedCount: number;
  hasActiveRecipe: boolean;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  currentScreen,
  onNavigate,
  savedCount,
  hasActiveRecipe,
}) => {
  return (
    <nav
      id="bottom-mobile-nav"
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E8E2D9] px-2 py-1.5 shadow-lg"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Screen 1 Tab */}
        <button
          id="nav-tab-home"
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'home'
              ? 'text-[#5A7D5B] font-semibold scale-105'
              : 'text-[#3A3530]/60 hover:text-[#3A3530]'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-colors ${currentScreen === 'home' ? 'bg-[#F5F2EE] text-[#5A7D5B]' : ''}`}>
            <Search className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5">Search</span>
        </button>

        {/* Screen 2 Tab */}
        <button
          id="nav-tab-results"
          type="button"
          onClick={() => onNavigate('results')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'results'
              ? 'text-[#5A7D5B] font-semibold scale-105'
              : 'text-[#3A3530]/60 hover:text-[#3A3530]'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-colors ${currentScreen === 'results' ? 'bg-[#F5F2EE] text-[#5A7D5B]' : ''}`}>
            <ListFilter className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5">Results</span>
        </button>

        {/* Screen 3 Tab (Detail / Cook) */}
        {hasActiveRecipe && (
          <button
            id="nav-tab-detail"
            type="button"
            onClick={() => onNavigate('detail')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
              currentScreen === 'detail'
                ? 'text-[#5A7D5B] font-semibold scale-105'
                : 'text-[#3A3530]/60 hover:text-[#3A3530]'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-colors ${currentScreen === 'detail' ? 'bg-[#F5F2EE] text-[#5A7D5B]' : ''}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5">Recipe</span>
          </button>
        )}

        {/* Screen 4 Tab (Saved Grid) */}
        <button
          id="nav-tab-saved"
          type="button"
          onClick={() => onNavigate('saved')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer relative ${
            currentScreen === 'saved'
              ? 'text-[#5A7D5B] font-semibold scale-105'
              : 'text-[#3A3530]/60 hover:text-[#3A3530]'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-colors ${currentScreen === 'saved' ? 'bg-[#F5F2EE] text-[#5A7D5B]' : ''}`}>
            <Heart className={`w-4 h-4 ${currentScreen === 'saved' ? 'fill-[#5A7D5B] text-[#5A7D5B]' : ''}`} />
          </div>
          <span className="text-[10px] mt-0.5">Saved</span>

          {savedCount > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-[#5A7D5B] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
              {savedCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
