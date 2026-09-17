import React, { useState } from 'react';
import { Clock, ArrowLeft, Heart, Utensils, SlidersHorizontal, Check, Search, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { Recipe } from '../types';

interface ResultsScreenProps {
  recipes: Recipe[];
  searchQuery: string;
  onBack: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
  savedRecipeIds: string[];
  onToggleSave: (recipeId: string) => void;
  onEditSearch: () => void;
  isLoading?: boolean;
  isAiMode?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  recipes,
  searchQuery,
  onBack,
  onSelectRecipe,
  savedRecipeIds,
  onToggleSave,
  onEditSearch,
  isLoading = false,
  isAiMode = true,
  errorMessage = null,
  onRetry,
}) => {
  const [filterDuration, setFilterDuration] = useState<'all' | 'under20' | 'under30'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter recipes according to active pills
  const filtered = recipes.filter((r) => {
    if (filterDuration === 'under20' && r.totalTimeMinutes > 20) return false;
    if (filterDuration === 'under30' && r.totalTimeMinutes > 30) return false;
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    return true;
  });

  const categories = ['all', 'Pasta', 'Soup', 'Breakfast', 'Stir-Fry', 'Salad', 'Curry', 'Bake'];

  return (
    <div id="screen-results" className="space-y-4 pb-20 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          id="btn-results-back"
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F2EE] border border-[#E8E2D9] hover:bg-[#ECE6DE] text-[#3A3530] text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#5A7D5B]" />
          <span>Back to Search</span>
        </button>

        <button
          id="btn-edit-query"
          type="button"
          onClick={onEditSearch}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F2EE] text-[#5A7D5B] text-xs font-medium border border-[#E8E2D9] hover:bg-[#ECE6DE] transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-[#5A7D5B]" />
          <span>Edit Kitchen</span>
        </button>
      </div>

      {/* Screen Title & Query Context */}
      <div className="bg-white border border-[#E8E2D9] rounded-2xl p-4 shadow-2xs">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-xl sm:text-2xl text-[#3A3530]">
              Recipe Suggestions
            </h1>
            {isAiMode && !isLoading && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F5F2EE] text-[#5A7D5B] border border-[#E8E2D9]">
                <Sparkles className="w-3 h-3 text-[#5A7D5B]" />
                Gemini AI
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-full bg-[#F5F2EE] text-[#5A7D5B] border border-[#E8E2D9]">
            {isLoading ? 'Creating 3...' : `${filtered.length} ${filtered.length === 1 ? 'Recipe' : 'Recipes'}`}
          </span>
        </div>
        <p className="text-xs text-[#3A3530]/60 mt-1">
          {searchQuery.trim() ? (
            <>
              Suggested for your pantry: <span className="font-medium text-[#3A3530]">"{searchQuery}"</span>
            </>
          ) : (
            'Showing wholesome kitchen recipes'
          )}
        </p>

        {/* Error Notification if any */}
        {errorMessage && (
          <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">{errorMessage}</p>
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-amber-800 underline hover:text-amber-950 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Try Gemini Again
                </button>
              )}
            </div>
          </div>
        )}

        {/* Quick Horizontal Filter Pills */}
        {!isLoading && filtered.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#3A3530]/50 flex items-center gap-1 pr-1">
              <SlidersHorizontal className="w-3 h-3" />
              Time:
            </span>
            <button
              onClick={() => setFilterDuration('all')}
              className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer ${
                filterDuration === 'all'
                  ? 'bg-[#5A7D5B] text-white font-medium shadow-2xs'
                  : 'bg-[#F5F2EE] text-[#3A3530]/70 hover:bg-[#ECE6DE]'
              }`}
            >
              Any Time
            </button>
            <button
              onClick={() => setFilterDuration('under20')}
              className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer ${
                filterDuration === 'under20'
                  ? 'bg-[#5A7D5B] text-white font-medium shadow-2xs'
                  : 'bg-[#F5F2EE] text-[#3A3530]/70 hover:bg-[#ECE6DE]'
              }`}
            >
              &le; 20 mins
            </button>
            <button
              onClick={() => setFilterDuration('under30')}
              className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer ${
                filterDuration === 'under30'
                  ? 'bg-[#5A7D5B] text-white font-medium shadow-2xs'
                  : 'bg-[#F5F2EE] text-[#3A3530]/70 hover:bg-[#ECE6DE]'
              }`}
            >
              &le; 30 mins
            </button>
          </div>
        )}
      </div>

      {/* Loading Skeleton View */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="bg-[#F5F2EE] border border-[#E8E2D9] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5A7D5B] text-white flex items-center justify-center animate-spin">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#3A3530]">Gemini Chef is creating 3 custom recipes...</p>
              <p className="text-[11px] text-[#3A3530]/60">Generating ingredients list and numbered steps</p>
            </div>
          </div>

          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl border border-[#E8E2D9] p-3.5 shadow-2xs animate-pulse flex flex-col sm:flex-row gap-3.5"
            >
              <div className="w-full sm:w-36 h-32 rounded-xl bg-[#F5F2EE]" />
              <div className="flex-1 space-y-2.5 py-1">
                <div className="h-4 w-24 bg-[#F5F2EE] rounded-md" />
                <div className="h-5 w-3/4 bg-[#F5F2EE] rounded-md" />
                <div className="h-3 w-full bg-[#F5F2EE] rounded-md" />
                <div className="h-3 w-2/3 bg-[#F5F2EE] rounded-md" />
                <div className="h-4 w-1/3 bg-[#F5F2EE] rounded-md pt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white border border-[#E8E2D9] rounded-3xl space-y-3 shadow-2xs">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#F5F2EE] flex items-center justify-center text-[#5A7D5B] border border-[#E8E2D9]">
            <Utensils className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg text-[#3A3530]">No Matching Recipes Found</h3>
          <p className="text-xs text-[#3A3530]/60 max-w-xs mx-auto">
            Try adjusting your pantry ingredients or resetting the time filters to discover more dishes.
          </p>
          <button
            onClick={() => {
              setFilterDuration('all');
              setSelectedCategory('all');
              onEditSearch();
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-[#5A7D5B] text-white text-xs font-medium hover:bg-[#486549] transition-colors shadow-sm shadow-[#5A7D5B]/20"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div id="results-list" className="space-y-3.5">
          {filtered.map((recipe) => {
            const isSaved = savedRecipeIds.includes(recipe.id);

            return (
              <article
                key={recipe.id}
                id={`recipe-card-${recipe.id}`}
                onClick={() => onSelectRecipe(recipe)}
                className="group bg-white rounded-2xl border border-[#E8E2D9] hover:border-[#5A7D5B]/50 p-3.5 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row gap-3.5 relative overflow-hidden"
              >
                {/* Photo Placeholder */}
                <div className="w-full sm:w-36 h-40 sm:h-32 rounded-xl overflow-hidden bg-[#E8E2D9] relative flex-shrink-0">
                  <img
                    src={recipe.image}
                    alt={recipe.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Photo Placeholder Decorative Fallback */}
                  <div className="absolute inset-0 bg-[#E8E2D9] flex flex-col items-center justify-center -z-1 text-[#5A7D5B] p-2 text-center">
                    <span className="text-2xl mb-1">🥘</span>
                    <span className="text-[10px] font-semibold text-[#5A7D5B] uppercase tracking-wider">Photo Placeholder</span>
                  </div>

                  {/* Category Pill on image */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
                    {recipe.category}
                  </span>

                  {/* Save Heart Button on Card */}
                  <button
                    id={`btn-save-card-${recipe.id}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(recipe.id);
                    }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSaved
                        ? 'bg-white text-[#5A7D5B] shadow-sm'
                        : 'bg-white/85 backdrop-blur-xs text-[#3A3530]/60 hover:text-[#5A7D5B] shadow-xs'
                    }`}
                    aria-label={isSaved ? 'Remove from saved' : 'Save recipe'}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#5A7D5B] text-[#5A7D5B]' : ''}`} />
                  </button>
                </div>

                {/* Card Content: Title & Cook Time */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="flex items-center gap-1 text-xs font-medium text-[#5A7D5B] bg-[#F5F2EE] px-2.5 py-0.5 rounded-md border border-[#E8E2D9]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{recipe.cookTime}</span>
                      </span>
                      {recipe.isAiGenerated && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#5A7D5B] bg-[#F5F2EE] px-2 py-0.5 rounded-md border border-[#E8E2D9]">
                          <Sparkles className="w-3 h-3 text-[#5A7D5B]" />
                          Gemini Chef
                        </span>
                      )}
                      {recipe.difficulty && (
                        <span className="text-[11px] text-[#3A3530]/60 italic">
                          &bull; {recipe.difficulty}
                        </span>
                      )}
                    </div>

                    <h2 className="font-serif text-base sm:text-lg text-[#3A3530] group-hover:text-[#5A7D5B] transition-colors leading-snug">
                      {recipe.title}
                    </h2>

                    <p className="text-xs text-[#3A3530]/60 mt-1 line-clamp-2 leading-relaxed italic">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Card Footer: Ingredients Count & Tap Action */}
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#E8E2D9]">
                    <span className="text-[11px] text-[#3A3530]/60">
                      <strong className="text-[#3A3530]">{recipe.ingredients.length}</strong> ingredients &bull; {recipe.steps.length} steps
                    </span>

                    <span className="text-xs font-medium text-[#5A7D5B] group-hover:underline flex items-center gap-1">
                      View Recipe &rarr;
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
