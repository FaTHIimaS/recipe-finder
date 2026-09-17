import React, { useState } from 'react';
import { ArrowLeft, Heart, Clock, Users, Flame, Check, Sparkles, Share2, ChefHat, CheckCircle2 } from 'lucide-react';
import { Recipe } from '../types';

interface DetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (recipeId: string) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  recipe,
  onBack,
  isSaved,
  onToggleSave,
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleHeartClick = () => {
    onToggleSave(recipe.id);
    const msg = !isSaved ? 'Recipe saved to your offline collection!' : 'Removed from saved recipes';
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const baseServings = recipe.servings || 2;
  const currentServings = Math.max(1, Math.round(baseServings * servingsMultiplier));

  return (
    <div id="screen-detail" className="space-y-5 pb-24 animate-fadeIn relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          id="toast-save-feedback"
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#5A7D5B] text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg shadow-[#5A7D5B]/25 flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white text-white' : 'text-white'}`} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Floating Navigation Bar */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          id="btn-detail-back"
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F2EE] border border-[#E8E2D9] hover:bg-[#ECE6DE] text-[#3A3530] text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#5A7D5B]" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Screen 3: 'Save' Heart Icon */}
          <button
            id="btn-save-heart-detail"
            type="button"
            onClick={handleHeartClick}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer border ${
              isSaved
                ? 'bg-[#F5F2EE] text-[#5A7D5B] border-[#5A7D5B]/30'
                : 'bg-white text-[#3A3530] border-[#E8E2D9] hover:bg-[#F5F2EE]'
            }`}
            aria-label={isSaved ? 'Remove from Saved' : 'Save recipe'}
          >
            <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isSaved ? 'fill-[#5A7D5B] text-[#5A7D5B]' : 'text-[#3A3530]/60'}`} />
            <span className="text-xs font-medium">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Hero Photo Placeholder & Header Details */}
      <section className="bg-white rounded-[32px] border border-[#E8E2D9] overflow-hidden shadow-xs">
        {/* Photo Placeholder */}
        <div className="w-full h-52 sm:h-64 relative bg-[#E8E2D9] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.imageAlt}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Fallback Graphic */}
          <div className="absolute inset-0 bg-[#E8E2D9] flex flex-col items-center justify-center -z-1 text-[#5A7D5B]">
            <ChefHat className="w-12 h-12 stroke-1 text-[#5A7D5B]/60 mb-2" />
            <span className="text-[10px] font-bold text-[#5A7D5B] uppercase tracking-widest">Photo Placeholder</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Quick Info Badges on Hero */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-xs font-medium text-[11px]">
              {recipe.category}
            </span>
            <span className="flex items-center gap-1 bg-[#5A7D5B]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-medium text-white text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              {recipe.cookTime}
            </span>
          </div>

          {/* Floating Heart over hero as in Natural Tones design */}
          <button
            onClick={handleHeartClick}
            aria-label={isSaved ? 'Remove from Saved' : 'Save recipe'}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#5A7D5B] shadow-xs hover:bg-white transition-colors"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#5A7D5B]' : ''}`} />
          </button>
        </div>

        {/* Title and Overview */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#3A3530] leading-snug">
              {recipe.title}
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-[#5A7D5B] font-medium mt-1">
              {recipe.category} Course
            </p>
            <p className="text-xs sm:text-sm text-[#3A3530]/70 mt-2 leading-relaxed italic">
              {recipe.description}
            </p>
          </div>

          {/* Cooking Metric Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E8E2D9] text-center">
            <div className="p-2.5 rounded-2xl bg-[#F5F2EE]">
              <div className="text-[10px] text-[#3A3530]/60 uppercase font-bold tracking-widest flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-[#5A7D5B]" />
                Time
              </div>
              <div className="font-medium text-sm text-[#3A3530] mt-0.5">
                {recipe.cookTime}
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-[#F5F2EE]">
              <div className="text-[10px] text-[#3A3530]/60 uppercase font-bold tracking-widest flex items-center justify-center gap-1">
                <Users className="w-3 h-3 text-[#5A7D5B]" />
                Servings
              </div>
              <div className="font-medium text-sm text-[#3A3530] mt-0.5">
                {currentServings} people
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-[#F5F2EE]">
              <div className="text-[10px] text-[#3A3530]/60 uppercase font-bold tracking-widest flex items-center justify-center gap-1">
                <Flame className="w-3 h-3 text-[#5A7D5B]" />
                Difficulty
              </div>
              <div className="font-medium text-sm text-[#3A3530] mt-0.5">
                {recipe.difficulty}
              </div>
            </div>
          </div>

          {recipe.dietary && recipe.dietary.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {recipe.dietary.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-[#F5F2EE] text-[#5A7D5B] text-[11px] font-medium border border-[#E8E2D9]"
                >
                  ✓ {tag}
                </span>
              ))}
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5F2EE] text-[#3A3530]/60 text-[11px] font-medium border border-[#E8E2D9]">
                Offline Ready
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Screen 3: Ingredients List */}
      <section id="section-ingredients" className="bg-white rounded-[32px] border border-[#E8E2D9] p-5 sm:p-6 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg sm:text-xl text-[#3A3530] flex items-center gap-2">
              <span>Ingredients</span>
              <span className="text-[10px] uppercase tracking-widest font-sans font-medium px-2 py-0.5 rounded-full bg-[#F5F2EE] text-[#5A7D5B] border border-[#E8E2D9]">
                {recipe.ingredients.length} items
              </span>
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-[#3A3530]/50 mt-0.5">
              Check off ingredients as you prepare
            </p>
          </div>

          {/* Serving scale adjuster */}
          <div className="flex items-center gap-1.5 bg-[#F5F2EE] border border-[#E8E2D9] rounded-xl px-2 py-1 text-xs">
            <button
              onClick={() => setServingsMultiplier((prev) => Math.max(0.5, prev - 0.5))}
              className="w-5 h-5 rounded-md hover:bg-white flex items-center justify-center font-bold text-[#5A7D5B]"
              aria-label="Decrease servings"
            >
              -
            </button>
            <span className="font-semibold text-[#3A3530] min-w-[2.5rem] text-center">
              {currentServings}p
            </span>
            <button
              onClick={() => setServingsMultiplier((prev) => Math.min(3, prev + 0.5))}
              className="w-5 h-5 rounded-md hover:bg-white flex items-center justify-center font-bold text-[#5A7D5B]"
              aria-label="Increase servings"
            >
              +
            </button>
          </div>
        </div>

        <ul className="space-y-2 divide-y divide-[#F5F2EE]">
          {recipe.ingredients.map((ing, idx) => {
            const isChecked = !!checkedIngredients[idx];
            return (
              <li
                key={idx}
                id={`ingredient-item-${idx}`}
                onClick={() => toggleIngredient(idx)}
                className={`pt-2.5 first:pt-0 flex items-start justify-between gap-3 cursor-pointer group select-none transition-colors ${
                  isChecked ? 'opacity-50' : 'opacity-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? 'bg-[#5A7D5B] border-[#5A7D5B] text-white'
                        : 'border-[#D8D1C7] group-hover:border-[#5A7D5B] bg-[#F5F2EE]'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'line-through text-[#3A3530]/50' : 'text-[#3A3530]'}`}>
                    {ing.name}
                  </span>
                </div>

                <span className="text-xs font-medium text-[#5A7D5B] bg-[#F5F2EE] px-2.5 py-0.5 rounded-lg border border-[#E8E2D9] whitespace-nowrap">
                  {ing.amount}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Screen 3: Numbered Steps */}
      <section id="section-numbered-steps" className="bg-white rounded-[32px] border border-[#E8E2D9] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg sm:text-xl text-[#3A3530] flex items-center gap-2">
            <span>Numbered Steps</span>
            <span className="text-[10px] uppercase tracking-widest font-sans font-medium px-2 py-0.5 rounded-full bg-[#F5F2EE] text-[#5A7D5B] border border-[#E8E2D9]">
              {Object.values(completedSteps).filter(Boolean).length}/{recipe.steps.length} done
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {recipe.steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isDone = !!completedSteps[idx];

            return (
              <div
                key={idx}
                id={`step-item-${stepNum}`}
                onClick={() => toggleStep(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isDone
                    ? 'bg-[#F5F2EE] border-[#E8E2D9] opacity-75'
                    : 'bg-white border-[#E8E2D9] hover:border-[#5A7D5B]/50 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Step Number Badge */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-[#5A7D5B] text-white'
                        : 'bg-[#F5F2EE] text-[#5A7D5B] border border-[#E8E2D9]'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : stepNum}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#5A7D5B] uppercase tracking-wider">
                        Step {stepNum}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[#3A3530]/50">
                        {isDone ? 'Completed' : 'Tap to mark done'}
                      </span>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed ${isDone ? 'text-[#3A3530]/50' : 'text-[#3A3530]'}`}>
                      {step}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chef Tip Card */}
      {recipe.tips && (
        <section className="bg-[#F5F2EE] border border-[#E8E2D9] rounded-2xl p-4 flex items-start gap-3 text-xs">
          <div className="w-8 h-8 rounded-xl bg-[#5A7D5B] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-[#5A7D5B]/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-[#5A7D5B] text-xs uppercase tracking-wider">Pantry Cooking Tip</h3>
            <p className="text-[#3A3530]/70 mt-0.5 leading-relaxed">{recipe.tips}</p>
          </div>
        </section>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 backdrop-blur-md border-t border-[#E8E2D9] px-4 py-3 flex items-center justify-between gap-3 shadow-lg z-30">
        <button
          onClick={handleHeartClick}
          className={`flex-1 py-3.5 px-4 rounded-2xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border ${
            isSaved
              ? 'bg-[#F5F2EE] text-[#5A7D5B] border-[#5A7D5B]/30'
              : 'bg-[#5A7D5B] text-white border-[#5A7D5B] hover:bg-[#486549] shadow-lg shadow-[#5A7D5B]/20'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#5A7D5B] text-[#5A7D5B]' : 'text-white'}`} />
          <span>{isSaved ? 'Recipe Saved in Collection' : 'Save to My Recipes'}</span>
        </button>
      </div>
    </div>
  );
};
