import React, { useState } from 'react';
import { Screen, Recipe } from './types';
import { RECIPES_DATA, searchRecipesByIngredients } from './data/recipes';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header, LayoutMode } from './components/Header';
import { MobileNavbar } from './components/MobileNavbar';
import { HomeScreen } from './components/HomeScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { DetailScreen } from './components/DetailScreen';
import { SavedScreen } from './components/SavedScreen';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ExternalLink, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation state between the 4 screens
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [ingredientQuery, setIngredientQuery] = useLocalStorage<string>('recipe_ingredient_query', 'garlic, tomatoes, pasta');
  
  // Custom saved recipes stored in local storage
  const [savedRecipesList, setSavedRecipesList] = useLocalStorage<Recipe[]>('saved_recipes_collection', [
    RECIPES_DATA[0],
    RECIPES_DATA[1],
  ]);
  const savedRecipeIds = savedRecipesList.map((r) => r.id);

  // Gemini AI recipes state
  const [aiRecipes, setAiRecipes] = useState<Recipe[]>([]);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(RECIPES_DATA[0]);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('simulator');

  // Fallback local search recipes by query
  const { matched: localSearchResults } = searchRecipesByIngredients(ingredientQuery, RECIPES_DATA);
  const displayedRecipes = aiRecipes.length > 0 ? aiRecipes : localSearchResults;

  // Toggle saving recipes
  const handleToggleSave = (recipeId: string) => {
    setSavedRecipesList((prev) => {
      const exists = prev.some((r) => r.id === recipeId);
      if (exists) {
        return prev.filter((r) => r.id !== recipeId);
      }
      // Locate recipe in AI recipes or curated recipes
      const toAdd = [...aiRecipes, ...RECIPES_DATA, selectedRecipe].find((r) => r.id === recipeId);
      if (toAdd) {
        return [...prev, toAdd];
      }
      return prev;
    });
  };

  // Add sample recipes if saved is empty
  const handleSaveSampleRecipes = () => {
    setSavedRecipesList([RECIPES_DATA[0], RECIPES_DATA[1], RECIPES_DATA[2]]);
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentScreen('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Call Gemini to suggest 3 recipes as JSON based on the ingredients provided
  const handleExecuteSearch = async () => {
    const query = ingredientQuery.trim();
    setCurrentScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!query) {
      return;
    }

    setIsAiLoading(true);
    setAiError(null);

    try {
      const response = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: query }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      if (data.recipes && Array.isArray(data.recipes) && data.recipes.length > 0) {
        setAiRecipes(data.recipes);
        setSelectedRecipe(data.recipes[0]);
        if (data.notice) {
          setAiError(data.notice);
        }
      } else {
        throw new Error('No recipes returned.');
      }
    } catch (err: any) {
      console.warn('Recipe search fallback (static hosting or offline):', err);
      const { matched } = searchRecipesByIngredients(query, RECIPES_DATA);
      const fallbackList = (matched.length > 0 ? matched : RECIPES_DATA.slice(0, 3)).map((r) => ({
        ...r,
        isAiGenerated: false,
      }));
      setAiRecipes(fallbackList);
      if (fallbackList[0]) {
        setSelectedRecipe(fallbackList[0]);
      }

      const isStaticHost =
        typeof window !== 'undefined' &&
        (window.location.hostname.includes('github.io') || window.location.protocol === 'file:');

      if (isStaticHost) {
        setAiError(
          'GitHub Pages static preview: showing recipes matched from curated culinary collection.'
        );
      } else {
        setAiError(
          'Could not reach AI recipe service. Showing delicious recipe matches from your pantry.'
        );
      }
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-start text-[#3A3530]">
      {/* Offline Status Bar Banner */}
      <div className="w-full">
        <OfflineIndicator />
      </div>

      {/* ALL 4 SCREENS FLOW BOARD MODE */}
      {layoutMode === 'all-screens' ? (
        <div className="w-full max-w-[1600px] mx-auto px-4 py-6">
          {/* Consistency Design System Banner */}
          <section className="bg-white border border-[#E8E2D9] rounded-[32px] p-5 sm:p-6 mb-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif italic font-bold text-2xl text-[#5A7D5B]">Savor</span>
                <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-[#F5F2EE] text-[#5A7D5B] font-semibold rounded-full border border-[#E8E2D9]">
                  4-Screen Unified Flow
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#5A7D5B] bg-[#F5F2EE] px-2.5 py-0.5 rounded-full border border-[#E8E2D9]">
                  <CheckCircle2 className="w-3 h-3" />
                  Synchronized Live State
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#3A3530]/70 mt-1 max-w-2xl leading-relaxed">
                All 4 screens are rendered in one cohesive canvas, keeping typography (Fraunces & Plus Jakarta Sans), natural earth tones, padding math, and state consistent across the journey.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs bg-[#F5F2EE] border border-[#E8E2D9] px-3 py-1.5 rounded-xl font-medium text-[#3A3530]/80">
                <span className="w-3 h-3 rounded-full bg-[#5A7D5B]" />
                <span>#5A7D5B Sage</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs bg-[#F5F2EE] border border-[#E8E2D9] px-3 py-1.5 rounded-xl font-medium text-[#3A3530]/80">
                <span className="w-3 h-3 rounded-full bg-[#FDFBF7] border border-[#E8E2D9]" />
                <span>#FDFBF7 Canvas</span>
              </div>
              <button
                type="button"
                onClick={() => setLayoutMode('simulator')}
                className="px-4 py-2 bg-[#5A7D5B] hover:bg-[#486549] text-white rounded-xl text-xs font-medium transition-all shadow-sm shadow-[#5A7D5B]/20 flex items-center gap-1.5 cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Switch to Phone Simulator</span>
              </button>
            </div>
          </section>

          {/* 4 Mockup Columns in Side-by-Side Canvas */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
            {/* Screen 1: Kitchen Search */}
            <div className="bg-white rounded-[40px] border border-[#E8E2D9] shadow-md shadow-[#5A7D5B]/5 overflow-hidden flex flex-col">
              <div className="bg-[#F5F2EE] border-b border-[#E8E2D9] px-4 py-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A7D5B]">Screen 1</span>
                  <h3 className="font-serif text-sm font-semibold text-[#3A3530]">Kitchen & Pantry</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentScreen('home');
                    setLayoutMode('simulator');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8E2D9] text-[11px] font-medium text-[#5A7D5B] hover:bg-[#ECE6DE] transition-colors cursor-pointer"
                  title="Focus Screen 1 in simulator"
                >
                  <span>Focus</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Speaker Notch */}
              <div className="flex justify-center pt-2.5 pb-1 bg-white">
                <div className="w-12 h-2.5 bg-[#F5F2EE] rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D1C9BD] mr-1" />
                  <div className="w-4 h-0.5 bg-[#D1C9BD] rounded-full" />
                </div>
              </div>

              <div className="p-3.5 max-h-[750px] overflow-y-auto">
                <HomeScreen
                  ingredientQuery={ingredientQuery}
                  setIngredientQuery={setIngredientQuery}
                  onSearch={handleExecuteSearch}
                  onSelectRecipe={handleSelectRecipe}
                  savedRecipeIds={savedRecipeIds}
                  allRecipes={RECIPES_DATA}
                  onGoToSaved={() => {
                    setCurrentScreen('saved');
                    setLayoutMode('simulator');
                  }}
                  isSearching={isAiLoading}
                />
              </div>
            </div>

            {/* Screen 2: Recipe Results */}
            <div className="bg-white rounded-[40px] border border-[#E8E2D9] shadow-md shadow-[#5A7D5B]/5 overflow-hidden flex flex-col">
              <div className="bg-[#F5F2EE] border-b border-[#E8E2D9] px-4 py-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A7D5B]">Screen 2</span>
                  <h3 className="font-serif text-sm font-semibold text-[#3A3530]">Recipe Results</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentScreen('results');
                    setLayoutMode('simulator');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8E2D9] text-[11px] font-medium text-[#5A7D5B] hover:bg-[#ECE6DE] transition-colors cursor-pointer"
                  title="Focus Screen 2 in simulator"
                >
                  <span>Focus</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Speaker Notch */}
              <div className="flex justify-center pt-2.5 pb-1 bg-white">
                <div className="w-12 h-2.5 bg-[#F5F2EE] rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D1C9BD] mr-1" />
                  <div className="w-4 h-0.5 bg-[#D1C9BD] rounded-full" />
                </div>
              </div>

              <div className="p-3.5 max-h-[750px] overflow-y-auto">
                <ResultsScreen
                  recipes={displayedRecipes}
                  searchQuery={ingredientQuery}
                  onBack={() => {
                    setCurrentScreen('home');
                    setLayoutMode('simulator');
                  }}
                  onSelectRecipe={handleSelectRecipe}
                  savedRecipeIds={savedRecipeIds}
                  onToggleSave={handleToggleSave}
                  onEditSearch={() => {
                    setCurrentScreen('home');
                    setLayoutMode('simulator');
                  }}
                  isLoading={isAiLoading}
                  isAiMode={aiRecipes.length > 0}
                  errorMessage={aiError}
                  onRetry={handleExecuteSearch}
                />
              </div>
            </div>

            {/* Screen 3: Recipe Detail */}
            <div className="bg-white rounded-[40px] border border-[#E8E2D9] shadow-md shadow-[#5A7D5B]/5 overflow-hidden flex flex-col">
              <div className="bg-[#F5F2EE] border-b border-[#E8E2D9] px-4 py-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A7D5B]">Screen 3</span>
                  <h3 className="font-serif text-sm font-semibold text-[#3A3530]">Detail & Steps</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentScreen('detail');
                    setLayoutMode('simulator');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8E2D9] text-[11px] font-medium text-[#5A7D5B] hover:bg-[#ECE6DE] transition-colors cursor-pointer"
                  title="Focus Screen 3 in simulator"
                >
                  <span>Focus</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Speaker Notch */}
              <div className="flex justify-center pt-2.5 pb-1 bg-white">
                <div className="w-12 h-2.5 bg-[#F5F2EE] rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D1C9BD] mr-1" />
                  <div className="w-4 h-0.5 bg-[#D1C9BD] rounded-full" />
                </div>
              </div>

              <div className="p-3.5 max-h-[750px] overflow-y-auto">
                <DetailScreen
                  recipe={selectedRecipe}
                  onBack={() => {}}
                  isSaved={savedRecipeIds.includes(selectedRecipe.id)}
                  onToggleSave={handleToggleSave}
                />
              </div>
            </div>

            {/* Screen 4: Saved Recipes */}
            <div className="bg-white rounded-[40px] border border-[#E8E2D9] shadow-md shadow-[#5A7D5B]/5 overflow-hidden flex flex-col">
              <div className="bg-[#F5F2EE] border-b border-[#E8E2D9] px-4 py-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A7D5B]">Screen 4</span>
                  <h3 className="font-serif text-sm font-semibold text-[#3A3530]">Saved Cookbook</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentScreen('saved');
                    setLayoutMode('simulator');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8E2D9] text-[11px] font-medium text-[#5A7D5B] hover:bg-[#ECE6DE] transition-colors cursor-pointer"
                  title="Focus Screen 4 in simulator"
                >
                  <span>Focus</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Speaker Notch */}
              <div className="flex justify-center pt-2.5 pb-1 bg-white">
                <div className="w-12 h-2.5 bg-[#F5F2EE] rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D1C9BD] mr-1" />
                  <div className="w-4 h-0.5 bg-[#D1C9BD] rounded-full" />
                </div>
              </div>

              <div className="p-3.5 max-h-[750px] overflow-y-auto">
                <SavedScreen
                  savedRecipes={savedRecipesList}
                  onSelectRecipe={handleSelectRecipe}
                  onRemoveSaved={handleToggleSave}
                  onGoToSearch={() => {}}
                  onSaveSampleRecipes={handleSaveSampleRecipes}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SINGLE SCREEN SIMULATOR / EXPANDED MODE */
        <div
          className={`w-full transition-all duration-300 ${
            layoutMode === 'simulator'
              ? 'max-w-md my-0 sm:my-5 sm:rounded-[40px] sm:shadow-xl sm:shadow-[#5A7D5B]/10 sm:border border-[#E8E2D9] overflow-hidden bg-white min-h-screen sm:min-h-[844px] flex flex-col relative'
              : 'max-w-xl mx-auto bg-white min-h-screen flex flex-col relative border-x border-[#E8E2D9] shadow-sm'
          }`}
        >
          {/* Mobile Device Mockup Speaker / Camera Notch */}
          {layoutMode === 'simulator' && (
            <div className="hidden sm:flex justify-center items-center pt-3 pb-1 bg-white">
              <div className="w-16 h-4 bg-[#F5F2EE] rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#D1C9BD] mr-1.5" />
                <div className="w-6 h-1 bg-[#D1C9BD] rounded-full" />
              </div>
            </div>
          )}

          {/* Global Flow Header */}
          <Header
            currentScreen={currentScreen}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            layoutMode={layoutMode}
            onChangeLayoutMode={setLayoutMode}
          />

          {/* Screen Content Flow Router */}
          <main className="flex-1 px-4 py-4 overflow-y-auto bg-white">
            {currentScreen === 'home' && (
              <HomeScreen
                ingredientQuery={ingredientQuery}
                setIngredientQuery={setIngredientQuery}
                onSearch={handleExecuteSearch}
                onSelectRecipe={handleSelectRecipe}
                savedRecipeIds={savedRecipeIds}
                allRecipes={RECIPES_DATA}
                onGoToSaved={() => setCurrentScreen('saved')}
                isSearching={isAiLoading}
              />
            )}

            {currentScreen === 'results' && (
              <ResultsScreen
                recipes={displayedRecipes}
                searchQuery={ingredientQuery}
                onBack={() => setCurrentScreen('home')}
                onSelectRecipe={handleSelectRecipe}
                savedRecipeIds={savedRecipeIds}
                onToggleSave={handleToggleSave}
                onEditSearch={() => setCurrentScreen('home')}
                isLoading={isAiLoading}
                isAiMode={aiRecipes.length > 0}
                errorMessage={aiError}
                onRetry={handleExecuteSearch}
              />
            )}

            {currentScreen === 'detail' && (
              <DetailScreen
                recipe={selectedRecipe}
                onBack={() => setCurrentScreen('results')}
                isSaved={savedRecipeIds.includes(selectedRecipe.id)}
                onToggleSave={handleToggleSave}
              />
            )}

            {currentScreen === 'saved' && (
              <SavedScreen
                savedRecipes={savedRecipesList}
                onSelectRecipe={handleSelectRecipe}
                onRemoveSaved={handleToggleSave}
                onGoToSearch={() => setCurrentScreen('home')}
                onSaveSampleRecipes={handleSaveSampleRecipes}
              />
            )}
          </main>

          {/* Subtle Home Indicator Bar */}
          <div className="h-1.5 w-1/3 bg-black/10 mx-auto mb-1 rounded-full hidden sm:block pointer-events-none" />

          {/* Persistent Mobile Bottom Navigation */}
          <MobileNavbar
            currentScreen={currentScreen}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            savedCount={savedRecipeIds.length}
            hasActiveRecipe={!!selectedRecipe}
          />
        </div>
      )}
    </div>
  );
}
