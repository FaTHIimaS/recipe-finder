import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { RECIPES_DATA, searchRecipesByIngredients } from "./src/data/recipes";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set in environment.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Category photo fallbacks
const CATEGORY_IMAGES: Record<string, string> = {
  Pasta: "https://images.unsplash.com/photo-1621996346565-e3d5d628169e?auto=format&fit=crop&w=800&q=80",
  Breakfast: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80",
  Salad: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  Soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
  "Stir-Fry": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
  Curry: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
  Bake: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
  Dinner: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  Default: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
};

// Candidate models in order of resilience and speed
const CANDIDATE_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
  "gemini-flash-latest",
];

// Helper to delay for backoff
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API Endpoint: Gemini Recipe Generation
app.post("/api/recipes/generate", async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients || typeof ingredients !== "string" || !ingredients.trim()) {
      res.status(400).json({
        error: "Please provide a comma-separated list of ingredients.",
      });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: "GEMINI_API_KEY is not configured.",
        needsKey: true,
      });
      return;
    }

    const prompt = `You are an expert chef assistant. The home cook has the following ingredients available in their kitchen: "${ingredients.trim()}".
Suggest exactly 3 appetizing, practical, and realistic recipes that can be made using primarily these ingredients, along with common kitchen staples (salt, pepper, oil, water, butter, or basic spices).

Return a JSON array of 3 recipe objects. Each recipe must include:
- title: clear, appetizing name
- cook_time: realistic cook time e.g. "20 mins", "35 mins"
- prep_time: preparation time e.g. "10 mins"
- servings: number of servings (e.g. 2 or 4)
- difficulty: "Easy", "Medium", or "Intermediate"
- category: one of "Pasta", "Salad", "Soup", "Stir-Fry", "Breakfast", "Curry", "Bake"
- description: 1-2 sentence description of flavor and texture
- ingredients: list of items with "name" and "amount"
- numbered_steps: list of sequential numbered cooking steps (e.g. "1. Heat olive oil in a skillet...", "2. Sauté...")
- tips: 1 chef secret or serving tip`;

    let rawRecipes: any = null;
    let lastError: any = null;

    for (const model of CANDIDATE_MODELS) {
      try {
        console.log(`Querying model: ${model} for ingredients: "${ingredients.trim()}"`);
        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
          config: {
            systemInstruction:
              "You are a master recipe creator. Always return exactly 3 recipes in valid JSON format matching the schema.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              description: "List of 3 recipe suggestions based on the user's available ingredients",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Appetizing title of the recipe" },
                  cook_time: { type: Type.STRING, description: "Total cook time (e.g. '25 mins')" },
                  prep_time: { type: Type.STRING, description: "Prep time (e.g. '10 mins')" },
                  servings: { type: Type.INTEGER, description: "Estimated servings" },
                  difficulty: { type: Type.STRING, description: "Easy, Medium, or Intermediate" },
                  category: { type: Type.STRING, description: "Pasta, Salad, Soup, Stir-Fry, Breakfast, Curry, or Bake" },
                  description: { type: Type.STRING, description: "Appetizing 1-2 sentence description" },
                  ingredients: {
                    type: Type.ARRAY,
                    description: "Ingredients list",
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING, description: "Ingredient name" },
                        amount: { type: Type.STRING, description: "Quantity or amount" },
                      },
                      required: ["name", "amount"],
                    },
                  },
                  numbered_steps: {
                    type: Type.ARRAY,
                    description: "Step-by-step numbered cooking instructions",
                    items: { type: Type.STRING },
                  },
                  tips: { type: Type.STRING, description: "Helpful culinary tip" },
                },
                required: ["title", "cook_time", "ingredients", "numbered_steps"],
              },
            },
          },
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            rawRecipes = parsed;
            console.log(`Success generating recipes with ${model}`);
            break;
          }
        }
      } catch (err: any) {
        console.warn(`Model ${model} attempt failed:`, err?.message || err);
        lastError = err;
        // Brief pause before trying next model to avoid hammering in high-demand periods
        await delay(500);
      }
    }

    if (!rawRecipes) {
      console.warn("All candidate models currently in high demand (503). Using pantry recipe matching.");
      const searchResult = searchRecipesByIngredients(ingredients, RECIPES_DATA);
      const fallbackList = (searchResult.matched.length >= 3 
        ? searchResult.matched.slice(0, 3) 
        : RECIPES_DATA.slice(0, 3)
      ).map((r) => ({
        ...r,
        isAiGenerated: false,
      }));

      res.json({
        recipes: fallbackList,
        count: fallbackList.length,
        ingredientsProvided: ingredients,
        notice: "Gemini is currently experiencing high server demand. Here are 3 delicious chef recipes matched to your ingredients.",
        isFallback: true,
      });
      return;
    }

    // Format recipes to fit client state
    const recipes = rawRecipes.map((r: any, idx: number) => {
      const cookMinutes = parseInt(r.cook_time?.replace(/\D/g, "") || "20", 10);
      const prepMinutes = parseInt(r.prep_time?.replace(/\D/g, "") || "10", 10);
      const totalTimeMinutes = cookMinutes + prepMinutes;
      const category = r.category || "Dinner";
      const imageUrl = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.Default;

      // Ensure steps are cleanly numbered
      const steps = Array.isArray(r.numbered_steps)
        ? r.numbered_steps.map((step: string, sIdx: number) => {
            const clean = step.trim();
            if (/^\d+\./.test(clean)) return clean;
            return `${sIdx + 1}. ${clean}`;
          })
        : [];

      return {
        id: `gemini-${Date.now()}-${idx}`,
        title: r.title || `Custom Recipe ${idx + 1}`,
        cookTime: r.cook_time || "25 mins",
        prepTime: r.prep_time || "10 mins",
        totalTimeMinutes: totalTimeMinutes || 25,
        servings: r.servings || 2,
        difficulty: r.difficulty || "Easy",
        category: category,
        image: imageUrl,
        imageAlt: r.title || "Delicious homemade recipe",
        description: r.description || "A delicious homemade recipe crafted around your kitchen ingredients.",
        ingredients: Array.isArray(r.ingredients)
          ? r.ingredients.map((ing: any) => ({
              name: typeof ing === "string" ? ing : ing.name || "Ingredient",
              amount: typeof ing === "string" ? "To taste" : ing.amount || "As needed",
            }))
          : [],
        steps: steps,
        tips: r.tips || "Taste and adjust seasoning with salt, pepper, and herbs before serving.",
        isAiGenerated: true,
      };
    });

    res.json({
      recipes,
      count: recipes.length,
      ingredientsProvided: ingredients,
    });
  } catch (error: any) {
    console.error("Gemini recipe generation error:", error);
    res.status(500).json({
      error: error?.message || "Failed to generate recipes with Gemini.",
    });
  }
});

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Vite Middleware configuration
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();
