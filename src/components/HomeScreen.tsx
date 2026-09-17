import React, { useState } from 'react';
import { Search, Sparkles, X, Clock, ChefHat, Heart, ArrowRight } from 'lucide-react';
import { Recipe } from '../types';
import { POPULAR_INGREDIENTS } from '../data/recipes';

interface HomeScreenProps {
  ingredientQuery: string;
  setIngredientQuery: (query: string) => void;
  onSearch: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
  savedRecipeIds: string[];
  allRecipes: Recipe[];
  onGoToSaved: () => void;
  isSearching?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  ingredientQuery,
  setIngredientQuery,
  onSearch,
  onSelectRecipe,
  savedRecipeIds,
  allRecipes,
  onGoToSaved,
  isSearching = false,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'quick' | 'veg' | 'glutenFree'>('all');

  const handleAddIngredient = (ingredientName: string) => {
    const current = ingredientQuery.trim();
    if (!current) {
      setIngredientQuery(ingredientName);
      return;
    }

    // Check if ingredient already included
    const terms = current.split(',').map((t) => t.trim().toLowerCase());
    if (terms.includes(ingredientName.toLowerCase())) {
      // remove it
      const updated = terms.filter((t) => t !== ingredientName.toLowerCase()).join(', ');
      setIngredientQuery(updated);
    } else {
      // append it
      setIngredientQuery(`${current}, ${ingredientName}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  // Quick filter recipes for the "Chef's Inspo" preview
  const featuredQuickPicks = allRecipes.filter((r) => {
    if (selectedFilter === 'quick') return r.totalTimeMinutes <= 20;
    if (selectedFilter === 'veg') return r.dietary?.includes('Vegetarian');
    if (selectedFilter === 'glutenFree') return r.dietary?.includes('Gluten-Free');
    return true;
  }).slice(0, 3);

  const parsedTerms = ingredientQuery
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div id="screen-home" className="space-y-6 pb-20 animate-fadeIn">
      {/* Hero Welcome Card - Screen 1 */}
      <section className="bg-white border border-[#E8E2D9] rounded-[32px] p-5 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2EE] text-[#5A7D5B] text-xs font-medium border border-[#E8E2D9]">
            <Sparkles className="w-3.5 h-3.5 text-[#5A7D5B]" />
            Pantry First
          </span>
          {savedRecipeIds.length > 0 && (
            <button
              onClick={onGoToSaved}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#5A7D5B] hover:text-[#486549] transition-colors"
            >
              <Heart className="w-3.5 h-3.5 fill-[#5A7D5B]" />
              <span>{savedRecipeIds.length} Saved</span>
            </button>
          )}
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl text-[#3A3530] leading-tight">
          What’s in your kitchen?
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-[#3A3530]/70 leading-relaxed">
          Type ingredients you have at home. We’ll find wholesome, delicious meals you can cook right now.
        </p>

        {/* Screen 1: Text Input for ingredients you have */}
        <div className="mt-5 space-y-3">
          <label htmlFor="input-ingredients" className="block text-[10px] font-bold text-[#3A3530]/70 uppercase tracking-widest">
            Ingredients You Have
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5A7D5B]">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="input-ingredients"
              type="text"
              value={ingredientQuery}
              onChange={(e) => setIngredientQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tomatoes, Basil, Garlic, Pasta..."
              className="w-full pl-10 pr-10 py-3.5 bg-[#F5F2EE] rounded-2xl border border-transparent focus:border-[#5A7D5B] focus:bg-white focus:ring-2 focus:ring-[#5A7D5B]/15 outline-hidden text-[#3A3530] text-sm placeholder-[#3A3530]/40 transition-all"
            />
            {ingredientQuery && (
              <button
                id="btn-clear-ingredients"
                type="button"
                onClick={() => setIngredientQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#3A3530]/40 hover:text-[#3A3530]"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Active Ingredients Tags */}
          {parsedTerms.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-[#3A3530]/60 self-center mr-1">Added:</span>
              {parsedTerms.map((term, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F5F2EE] text-[#5A7D5B] text-xs font-medium border border-[#E8E2D9]"
                >
                  {term}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = parsedTerms.filter((_, i) => i !== idx).join(', ');
                      setIngredientQuery(updated);
                    }}
                    className="hover:text-red-600 transition-colors ml-0.5"
                    aria-label={`Remove ${term}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Screen 1: 'Find Recipes' Button */}
          <button
            id="btn-find-recipes"
            type="button"
            onClick={onSearch}
            disabled={isSearching}
            className={`w-full mt-2 py-4 px-6 rounded-2xl font-medium shadow-lg text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSearching
                ? 'bg-[#486549] text-white/80 cursor-wait'
                : 'bg-[#5A7D5B] hover:bg-[#486549] active:scale-[0.99] text-white shadow-[#5A7D5B]/20'
            }`}
          >
            {isSearching ? (
              <>
                <Sparkles className="w-5 h-5 text-white/90 animate-spin" />
                <span>Asking Gemini Chef...</span>
              </>
            ) : (
              <>
                <ChefHat className="w-5 h-5 text-white/90" />
                <span>Find Recipes</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </section>

      {/* Quick Add Pantry Ingredients */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] font-bold text-[#3A3530]/70 uppercase tracking-widest">
            Quick-Tap Pantry Staples
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-[#3A3530]/50">Tap to toggle</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_INGREDIENTS.map((item) => {
            const isSelected = parsedTerms.some(
              (t) => t.toLowerCase() === item.name.toLowerCase()
            );
            return (
              <button
                key={item.name}
                id={`chip-ingredient-${item.name.toLowerCase()}`}
                type="button"
                onClick={() => handleAddIngredient(item.name)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#5A7D5B] text-white border-[#5A7D5B] shadow-sm shadow-[#5A7D5B]/20'
                    : 'bg-[#F5F2EE] hover:bg-[#ECE6DE] text-[#3A3530] border-transparent'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
                {isSelected && <span className="text-[10px] ml-0.5 font-bold">✓</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Quick Inspiration Preview */}
      <section className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg text-[#3A3530]">
            Quick Results
          </h2>
          <div className="flex gap-1 bg-[#F5F2EE] p-0.5 rounded-xl text-xs border border-[#E8E2D9]">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-white font-medium text-[#5A7D5B] shadow-2xs'
                  : 'text-[#3A3530]/60 hover:text-[#3A3530]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter('quick')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedFilter === 'quick'
                  ? 'bg-white font-medium text-[#5A7D5B] shadow-2xs'
                  : 'text-[#3A3530]/60 hover:text-[#3A3530]'
              }`}
            >
              &le; 20m
            </button>
            <button
              onClick={() => setSelectedFilter('veg')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedFilter === 'veg'
                  ? 'bg-white font-medium text-[#5A7D5B] shadow-2xs'
                  : 'text-[#3A3530]/60 hover:text-[#3A3530]'
              }`}
            >
              Veg
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {featuredQuickPicks.map((recipe) => {
            return (
              <div
                key={recipe.id}
                id={`card-inspo-${recipe.id}`}
                onClick={() => onSelectRecipe(recipe)}
                className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E8E2D9] hover:border-[#5A7D5B]/50 shadow-2xs hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#E8E2D9] shrink-0 relative">
                  <img
                    src={recipe.image}
                    alt={recipe.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-[#E8E2D9] flex items-center justify-center -z-1 text-[#5A7D5B] text-xs font-bold">
                    🍲
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#5A7D5B] font-medium">
                      {recipe.category}
                    </span>
                    <span className="text-xs text-[#3A3530]/60 italic">
                      {recipe.cookTime} &bull; Easy
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#3A3530] truncate mt-0.5 group-hover:text-[#5A7D5B] transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-[#3A3530]/60 line-clamp-1 mt-0.5">
                    {recipe.ingredients.slice(0, 3).map((i) => i.name).join(', ')}...
                  </p>
                </div>

                <div className="text-[#3A3530]/40 group-hover:text-[#5A7D5B] group-hover:translate-x-0.5 transition-all p-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
