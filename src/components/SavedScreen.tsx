import React, { useState } from 'react';
import { Heart, Clock, ArrowRight, Trash2, BookOpen, ChefHat, Sparkles } from 'lucide-react';
import { Recipe } from '../types';

interface SavedScreenProps {
  savedRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onRemoveSaved: (recipeId: string) => void;
  onGoToSearch: () => void;
  onSaveSampleRecipes: () => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedRecipes,
  onSelectRecipe,
  onRemoveSaved,
  onGoToSearch,
  onSaveSampleRecipes,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = savedRecipes.filter((r) =>
    r.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
    r.ingredients.some((i) => i.name.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div id="screen-saved-recipes" className="space-y-4 pb-20 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-[#E8E2D9] rounded-[32px] p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F5F2EE] border border-[#E8E2D9] flex items-center justify-center text-[#5A7D5B]">
              <Heart className="w-5 h-5 fill-[#5A7D5B]" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl text-[#3A3530]">
                Saved Recipes
              </h1>
              <p className="text-xs text-[#3A3530]/60">
                Offline Cookbook &bull; {savedRecipes.length} saved
              </p>
            </div>
          </div>

          <button
            onClick={onGoToSearch}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#5A7D5B] hover:bg-[#486549] text-white text-xs font-medium transition-colors shadow-sm shadow-[#5A7D5B]/20 cursor-pointer"
          >
            <span>+ Find More</span>
          </button>
        </div>

        {/* Quick Filter Search if recipes exist */}
        {savedRecipes.length > 2 && (
          <div className="mt-4">
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search your saved recipes..."
              className="w-full px-3.5 py-2.5 text-xs bg-[#F5F2EE] border border-transparent focus:border-[#5A7D5B] focus:bg-white rounded-xl focus:ring-2 focus:ring-[#5A7D5B]/15 outline-hidden text-[#3A3530] placeholder-[#3A3530]/40"
            />
          </div>
        )}
      </div>

      {/* Screen 4: Showing saved cards in a grid */}
      {savedRecipes.length === 0 ? (
        <div className="bg-white border border-[#E8E2D9] rounded-[32px] p-8 text-center space-y-4 shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-[#F5F2EE] text-[#5A7D5B] border border-[#E8E2D9] flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8 stroke-1.5" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-xl text-[#3A3530]">
              Your Cookbook is Empty
            </h2>
            <p className="text-xs text-[#3A3530]/60 max-w-xs mx-auto leading-relaxed">
              Tap the heart icon on any recipe to save it here for instant cooking even when offline.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
            <button
              id="btn-discover-recipes"
              onClick={onGoToSearch}
              className="px-5 py-3 rounded-2xl bg-[#5A7D5B] hover:bg-[#486549] text-white text-xs font-medium transition-all shadow-lg shadow-[#5A7D5B]/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ChefHat className="w-4 h-4 text-white/90" />
              <span>Search with Your Ingredients</span>
            </button>
            <button
              onClick={onSaveSampleRecipes}
              className="px-4 py-3 rounded-2xl bg-[#F5F2EE] border border-[#E8E2D9] text-[#3A3530] text-xs font-medium hover:bg-[#ECE6DE] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#5A7D5B]" />
              <span>Add 3 Sample Recipes</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          id="saved-recipes-grid"
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          {filtered.map((recipe) => (
            <article
              key={recipe.id}
              id={`saved-card-${recipe.id}`}
              onClick={() => onSelectRecipe(recipe)}
              className="group bg-white rounded-2xl border border-[#E8E2D9] hover:border-[#5A7D5B]/50 p-3 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                {/* Photo Placeholder */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#E8E2D9] relative mb-2.5">
                  <img
                    src={recipe.image}
                    alt={recipe.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Styled Placeholder Fallback */}
                  <div className="absolute inset-0 bg-[#E8E2D9] flex flex-col items-center justify-center -z-1 text-[#5A7D5B]">
                    <span className="text-xl">🍲</span>
                    <span className="text-[9px] font-medium text-[#5A7D5B] uppercase tracking-wider">Photo Placeholder</span>
                  </div>

                  {/* Remove Heart Button */}
                  <button
                    id={`btn-remove-saved-${recipe.id}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSaved(recipe.id);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white text-[#5A7D5B] shadow-xs flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                    title="Remove from saved"
                    aria-label="Remove recipe"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#5A7D5B]" />
                  </button>

                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[9px] font-medium backdrop-blur-xs">
                    {recipe.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-sm text-[#3A3530] group-hover:text-[#5A7D5B] transition-colors line-clamp-2 leading-snug">
                  {recipe.title}
                </h3>
              </div>

              {/* Cook time & Tap */}
              <div className="mt-2.5 pt-2 border-t border-[#E8E2D9] flex items-center justify-between text-[11px] text-[#3A3530]/60">
                <span className="flex items-center gap-1 font-medium text-[#5A7D5B]">
                  <Clock className="w-3 h-3 text-[#5A7D5B]" />
                  {recipe.cookTime}
                </span>
                <span className="text-[#3A3530]/40 group-hover:text-[#5A7D5B] group-hover:translate-x-0.5 transition-all">
                  &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
