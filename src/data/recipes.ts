import { Recipe } from '../types';

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'creamy-tuscan-garlic-pasta',
    title: 'Creamy Tuscan Garlic Pasta',
    cookTime: '20 mins',
    prepTime: '10 mins',
    totalTimeMinutes: 30,
    servings: 4,
    difficulty: 'Easy',
    calories: 480,
    category: 'Pasta',
    dietary: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628169e?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Bowl of creamy garlic penne pasta with sun-dried tomatoes and spinach',
    description: 'A velvety 20-minute weeknight pasta tossed with sweet cherry tomatoes, wilted baby spinach, and roasted garlic cream sauce.',
    ingredients: [
      { name: 'Pasta (Penne or Fettuccine)', amount: '300g' },
      { name: 'Garlic cloves (minced)', amount: '4 cloves' },
      { name: 'Cherry tomatoes (halved)', amount: '1 cup' },
      { name: 'Baby spinach', amount: '2 cups' },
      { name: 'Heavy cream or Coconut milk', amount: '3/4 cup' },
      { name: 'Parmesan cheese (grated)', amount: '1/2 cup' },
      { name: 'Olive oil', amount: '2 tbsp' },
      { name: 'Italian herbs, salt & black pepper', amount: '1 tsp' }
    ],
    steps: [
      'Bring a large pot of salted water to a rolling boil. Cook pasta until al dente, about 9–10 minutes. Reserve 1/2 cup of pasta water before draining.',
      'In a wide skillet, warm the olive oil over medium heat. Sauté the minced garlic and halved cherry tomatoes until fragrant and softened (approx 2 mins).',
      'Pour in the heavy cream and let it gently simmer for 3 minutes until slightly thickened. Stir in grated parmesan cheese until silky smooth.',
      'Add fresh baby spinach leaves and stir gently until just wilted into the sauce.',
      'Toss drained pasta directly into the skillet. Loosen with reserved pasta water as needed. Season generously with salt, cracked black pepper, and chili flakes.'
    ],
    tips: 'Use the starchy pasta water to bind the cream and cheese together into an emulsion without oil separating.'
  },
  {
    id: 'rustic-shakshuka',
    title: 'Rustic Skillet Shakshuka',
    cookTime: '25 mins',
    prepTime: '10 mins',
    totalTimeMinutes: 35,
    servings: 3,
    difficulty: 'Easy',
    calories: 320,
    category: 'Breakfast',
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Cast iron skillet with eggs poached in spiced tomato bell pepper sauce',
    description: 'Golden eggs gently poached in a simmering, smoky tomato, roasted bell pepper, and cumin sauce topped with crumbled feta and fresh herbs.',
    ingredients: [
      { name: 'Eggs (large fresh)', amount: '4 whole' },
      { name: 'Canned crushed tomatoes or ripe tomatoes', amount: '400g' },
      { name: 'Red bell pepper (diced)', amount: '1 medium' },
      { name: 'Yellow onion (diced)', amount: '1 medium' },
      { name: 'Garlic cloves (sliced)', amount: '3 cloves' },
      { name: 'Ground cumin & Smoked paprika', amount: '1 tsp each' },
      { name: 'Olive oil', amount: '2 tbsp' },
      { name: 'Feta cheese & fresh cilantro', amount: 'Garnish' }
    ],
    steps: [
      'Warm olive oil in a heavy 10-inch cast iron skillet over medium heat. Add diced onion and bell pepper; cook for 6 minutes until soft and golden.',
      'Add sliced garlic, cumin, and smoked paprika. Stir continuously for 60 seconds until aromatic.',
      'Pour in crushed tomatoes, season with 1/2 tsp salt, and reduce heat to low. Simmer gently for 10 minutes until sauce thickens nicely.',
      'Using a large spoon, create 4 small wells in the tomato sauce. Crack an egg into each well.',
      'Cover the skillet with a lid and cook on low heat for 5–8 minutes until egg whites are set and yolks remain runny.',
      'Remove from heat, scatter with crumbled feta and fresh cilantro leaves. Serve hot with warm crusty bread.'
    ],
    tips: 'Keep the flame low once the eggs are cracked in so the bottom doesn’t scorch while the whites cook through.'
  },
  {
    id: 'golden-crispy-fried-rice',
    title: 'Golden Garlic Egg Fried Rice',
    cookTime: '15 mins',
    prepTime: '5 mins',
    totalTimeMinutes: 20,
    servings: 2,
    difficulty: 'Easy',
    calories: 390,
    category: 'Stir-Fry',
    dietary: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Steaming hot wok egg fried rice with green scallions and sesame',
    description: 'The ultimate quick kitchen staple: day-old jasmine rice tossed over high heat with crisp garlic, scrambled eggs, soy sauce, and scallions.',
    ingredients: [
      { name: 'Cooked cold rice (day-old preferred)', amount: '3 cups' },
      { name: 'Eggs (beaten)', amount: '3 large' },
      { name: 'Garlic cloves (finely minced)', amount: '4 cloves' },
      { name: 'Green scallions (sliced)', amount: '3 stalks' },
      { name: 'Soy sauce or Tamari', amount: '2 tbsp' },
      { name: 'Sesame oil', amount: '1 tsp' },
      { name: 'Cooking oil', amount: '2 tbsp' },
      { name: 'White pepper & toasted sesame seeds', amount: '1/2 tsp' }
    ],
    steps: [
      'Gently break up clumps in cold cooked rice using your fingers or a spatula in a shallow bowl.',
      'Heat 1 tbsp oil in a wok or large skillet over medium-high heat. Pour in beaten eggs; scramble quickly for 45 seconds until soft curd forms, then transfer to a small plate.',
      'Add remaining 1 tbsp oil to the wok. Toss in minced garlic and scallion whites; stir-fry for 30 seconds until fragrant.',
      'Turn heat to high, dump in the rice, and toss vigorously, pressing rice against the hot wok surface to achieve smoky aroma.',
      'Drizzle soy sauce around the rim of the wok and fold in sesame oil. Return cooked eggs and toss to break into small golden ribbons.',
      'Fold in sliced scallion greens and a dash of white pepper. Serve steaming hot.'
    ],
    tips: 'Day-old cold rice has lower moisture content, which prevents fried rice from turning mushy.'
  },
  {
    id: 'avocado-lime-toast-poached-egg',
    title: 'Avocado & Herb Sourdough Toast',
    cookTime: '10 mins',
    prepTime: '5 mins',
    totalTimeMinutes: 15,
    servings: 2,
    difficulty: 'Easy',
    calories: 340,
    category: 'Breakfast',
    dietary: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Sourdough toast topped with crushed avocado, chili flakes and microgreens',
    description: 'Crispy thick artisan sourdough topped with creamy crushed avocado, fresh lime juice, sea salt flakes, and poached eggs.',
    ingredients: [
      { name: 'Ripe avocados', amount: '2 medium' },
      { name: 'Sourdough or rustic bread slices', amount: '2 thick slices' },
      { name: 'Lime or lemon juice', amount: '1 tbsp' },
      { name: 'Eggs (poached or fried)', amount: '2 whole' },
      { name: 'Red pepper flakes', amount: '1/2 tsp' },
      { name: 'Extra virgin olive oil', amount: '1 tbsp' },
      { name: 'Flaky sea salt & black pepper', amount: 'To taste' }
    ],
    steps: [
      'Toast the bread slices until golden brown and very crunchy.',
      'In a small bowl, scoop the avocado flesh and mash with a fork together with lime juice, a drizzle of olive oil, salt, and black pepper. Keep slight texture.',
      'Prepare eggs to your preference: either poached in gently simmering water with a splash of vinegar (3 mins), or pan-fried sunny side up.',
      'Spread the seasoned avocado generously from crust to crust on warm sourdough.',
      'Crown each slice with an egg, sprinkle red pepper flakes and flaky sea salt, and finish with a drop of olive oil.'
    ],
    tips: 'Rub a raw peeled garlic clove directly over the warm toasted crust before spreading the avocado for subtle deli flavor.'
  },
  {
    id: 'hearty-lentil-vegetable-soup',
    title: 'Cozy Lemon Lentil & Greens Soup',
    cookTime: '30 mins',
    prepTime: '10 mins',
    totalTimeMinutes: 40,
    servings: 4,
    difficulty: 'Easy',
    calories: 290,
    category: 'Soup',
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'A bowl of warm vegetable and brown lentil soup with lemon slice',
    description: 'A comforting, nutrient-dense pot of brown lentils simmered in vegetable broth with carrots, onions, spinach, and bright fresh lemon.',
    ingredients: [
      { name: 'Brown or green lentils (rinsed)', amount: '1 cup' },
      { name: 'Vegetable or chicken broth', amount: '4 cups' },
      { name: 'Carrots (diced)', amount: '2 medium' },
      { name: 'Yellow onion (diced)', amount: '1 medium' },
      { name: 'Garlic cloves (minced)', amount: '3 cloves' },
      { name: 'Baby spinach or kale', amount: '2 cups' },
      { name: 'Lemon (juiced)', amount: '1 whole' },
      { name: 'Dried thyme & cumin', amount: '1 tsp each' },
      { name: 'Olive oil, salt & pepper', amount: '2 tbsp' }
    ],
    steps: [
      'In a large heavy-bottom pot, warm olive oil over medium heat. Sauté onions and carrots for 5 minutes until soft.',
      'Add minced garlic, dried thyme, and cumin. Cook for 1 minute until fragrant.',
      'Add rinsed lentils and pour in broth. Bring to a rapid boil, then reduce heat to low, cover with lid, and simmer for 25 minutes until lentils are tender.',
      'Remove 1 cup of soup and blend until smooth (optional, gives a velvety creamy body), then stir back into the pot.',
      'Stir in baby spinach and fresh lemon juice. Simmer 2 more minutes until greens are wilted. Season with salt and cracked pepper to taste.'
    ],
    tips: 'Always add lemon juice at the very end of cooking to keep the citrus notes bright and vibrant.'
  },
  {
    id: 'lemon-herb-grilled-chicken',
    title: 'Skillet Lemon Herb Chicken Breast',
    cookTime: '18 mins',
    prepTime: '10 mins',
    totalTimeMinutes: 28,
    servings: 2,
    difficulty: 'Medium',
    calories: 360,
    category: 'Bake',
    dietary: ['Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Juicy golden pan-seared chicken breast slices with lemon wedges and thyme',
    description: 'Juicy, golden pan-seared chicken breast basted in garlic-herb butter, fresh rosemary, and a citrus lemon pan glaze.',
    ingredients: [
      { name: 'Chicken breasts (boneless, skinless)', amount: '2 pieces' },
      { name: 'Garlic cloves (crushed)', amount: '3 cloves' },
      { name: 'Lemon (sliced and juiced)', amount: '1 whole' },
      { name: 'Fresh rosemary or thyme', amount: '3 sprigs' },
      { name: 'Butter', amount: '2 tbsp' },
      { name: 'Olive oil', amount: '1 tbsp' },
      { name: 'Salt, black pepper & paprika', amount: '1 tsp each' }
    ],
    steps: [
      'Pat chicken breasts dry with paper towels. Slice horizontally in half or gently pound to even 1/2-inch thickness so they cook uniformly.',
      'Season both sides evenly with salt, black pepper, and paprika.',
      'Heat olive oil in a stainless steel or cast iron skillet over medium-high heat. Lay chicken down and sear undisturbed for 5–6 minutes until a rich golden crust forms.',
      'Flip chicken. Add butter, crushed garlic, and fresh herb sprigs into the pan.',
      'As butter foams, tilt the skillet and spoon the herb-infused butter continuously over the chicken breasts for 3–4 minutes until internal temp reaches 165°F (74°C).',
      'Squeeze fresh lemon juice over the chicken, rest for 5 minutes on a board, then slice and serve.'
    ],
    tips: 'Resting the chicken before slicing allows the natural juices to redistribute, ensuring maximum tenderness.'
  },
  {
    id: 'creamy-tomato-basil-soup',
    title: 'Roasted Tomato & Sweet Basil Bisque',
    cookTime: '25 mins',
    prepTime: '10 mins',
    totalTimeMinutes: 35,
    servings: 4,
    difficulty: 'Easy',
    calories: 220,
    category: 'Soup',
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Bowl of velvety roasted tomato soup garnished with fresh basil cream',
    description: 'Classic velvety comfort: roasted canned San Marzano tomatoes simmered with sweet onions, garlic, fresh basil, and a touch of cream.',
    ingredients: [
      { name: 'Whole peeled tomatoes (canned)', amount: '800g' },
      { name: 'Yellow onion (chopped)', amount: '1 medium' },
      { name: 'Garlic cloves (minced)', amount: '4 cloves' },
      { name: 'Fresh basil leaves', amount: '1 packed cup' },
      { name: 'Vegetable broth', amount: '2 cups' },
      { name: 'Heavy cream or Coconut milk', amount: '1/3 cup' },
      { name: 'Olive oil & butter', amount: '1 tbsp each' },
      { name: 'Salt, pepper & sugar', amount: '1/2 tsp each' }
    ],
    steps: [
      'In a soup pot, melt butter with olive oil over medium heat. Sauté onions with a pinch of salt for 7 minutes until sweet and translucent.',
      'Stir in minced garlic and cook for 1 minute.',
      'Add canned tomatoes with juices, vegetable broth, and sugar (to balance tomato acidity). Bring to a simmer, then reduce heat and bubble for 15 minutes.',
      'Remove from heat. Add fresh basil leaves. Use an immersion blender to puree the soup until silky and smooth.',
      'Stir in heavy cream and adjust seasoning with salt and freshly cracked black pepper. Serve alongside grilled cheese sandwiches.'
    ],
    tips: 'A tiny pinch of sugar balances the sharp acidity of cooked canned tomatoes.'
  },
  {
    id: 'garlic-butter-sauteed-mushrooms',
    title: 'Garlic Butter Herb Mushrooms',
    cookTime: '12 mins',
    prepTime: '5 mins',
    totalTimeMinutes: 17,
    servings: 2,
    difficulty: 'Easy',
    calories: 180,
    category: 'Salad',
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Skillet with caramelized button mushrooms in garlic butter sauce',
    description: 'Earthy cremini mushrooms caramelized over high heat in bubbly garlic butter, white wine splash, and fresh chopped parsley.',
    ingredients: [
      { name: 'Cremini or button mushrooms (halved)', amount: '400g' },
      { name: 'Butter', amount: '2 tbsp' },
      { name: 'Olive oil', amount: '1 tbsp' },
      { name: 'Garlic cloves (minced)', amount: '4 cloves' },
      { name: 'Fresh parsley (chopped)', amount: '2 tbsp' },
      { name: 'Soy sauce or balsamic splash', amount: '1 tsp' },
      { name: 'Salt & freshly ground black pepper', amount: 'To taste' }
    ],
    steps: [
      'Wipe mushrooms clean with a damp towel (do not soak in water) and cut into halves or thick quarters.',
      'Heat olive oil and 1 tbsp butter in a wide skillet over high heat. Add mushrooms in a single layer.',
      'Let mushrooms sear undisturbed for 3–4 minutes without stirring so they turn deep golden brown.',
      'Toss mushrooms, add the remaining 1 tbsp butter, minced garlic, and soy sauce. Sauté for another 3 minutes until tender and caramelized.',
      'Turn off heat, stir in fresh chopped parsley, season with coarse salt and pepper, and serve immediately.'
    ],
    tips: 'Do not crowd the pan; crowding causes mushrooms to steam in their own moisture rather than caramelizing.'
  },
  {
    id: 'crispy-chickpea-mediterranean-salad',
    title: 'Crispy Chickpea & Cucumber Bowl',
    cookTime: '15 mins',
    prepTime: '10 mins',
    totalTimeMinutes: 25,
    servings: 2,
    difficulty: 'Easy',
    calories: 380,
    category: 'Salad',
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Vibrant Mediterranean salad bowl with roasted chickpeas, cucumber, and feta',
    description: 'Crispy spiced chickpeas tossed with cool crunchy Persian cucumbers, cherry tomatoes, kalamata olives, feta, and lemon oregano vinaigrette.',
    ingredients: [
      { name: 'Canned chickpeas (drained & dried)', amount: '1 can (400g)' },
      { name: 'Cucumber (diced)', amount: '2 small' },
      { name: 'Cherry tomatoes (halved)', amount: '1 cup' },
      { name: 'Feta cheese (crumbled)', amount: '1/3 cup' },
      { name: 'Red onion (thinly sliced)', amount: '1/4 cup' },
      { name: 'Olive oil', amount: '2 tbsp' },
      { name: 'Ground cumin, smoked paprika & dried oregano', amount: '1 tsp each' },
      { name: 'Lemon juice, salt & pepper', amount: '2 tbsp' }
    ],
    steps: [
      'Pat rinsed chickpeas thoroughly dry between paper towels. Toss with 1 tbsp olive oil, cumin, smoked paprika, and salt.',
      'Pan-fry chickpeas in a skillet over medium-high heat for 10–12 minutes until crunchy and golden on all sides.',
      'In a salad bowl, whisk the remaining olive oil with lemon juice, oregano, salt, and pepper to make the dressing.',
      'Add diced cucumbers, cherry tomatoes, and sliced red onion to the bowl and toss lightly.',
      'Top with warm crispy chickpeas and crumbled feta cheese just before serving to maintain crunch.'
    ],
    tips: 'Dry chickpeas thoroughly before frying; removing surface moisture ensures crispiness.'
  },
  {
    id: 'coconut-chickpea-spinach-curry',
    title: 'Creamy Coconut Chickpea Curry',
    cookTime: '22 mins',
    prepTime: '8 mins',
    totalTimeMinutes: 30,
    servings: 4,
    difficulty: 'Easy',
    calories: 410,
    category: 'Curry',
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Rich golden chickpea curry in a bowl with rice and cilantro',
    description: 'A deeply aromatic 25-minute curry simmered in rich coconut milk with chickpeas, ginger, turmeric, tomatoes, and tender baby spinach.',
    ingredients: [
      { name: 'Canned chickpeas (rinsed)', amount: '2 cans (800g)' },
      { name: 'Full-fat coconut milk', amount: '1 can (400ml)' },
      { name: 'Canned diced tomatoes', amount: '1 can (400g)' },
      { name: 'Baby spinach', amount: '2 cups' },
      { name: 'Yellow onion (diced)', amount: '1 medium' },
      { name: 'Garlic cloves & fresh ginger (grated)', amount: '1 tbsp each' },
      { name: 'Curry powder, turmeric & garam masala', amount: '1 tsp each' },
      { name: 'Coconut or olive oil', amount: '1 tbsp' }
    ],
    steps: [
      'Heat oil in a medium saucepan over medium heat. Sauté onion for 5 minutes until soft and golden.',
      'Add grated garlic, ginger, curry powder, turmeric, and garam masala. Stir for 1 minute until fragrant.',
      'Add diced tomatoes, coconut milk, and drained chickpeas. Stir well and bring to a gentle boil.',
      'Reduce heat to low and simmer uncovered for 15 minutes, allowing sauce to thicken and flavors to meld.',
      'Stir in fresh baby spinach until wilted (approx 2 minutes). Season with salt and a squeeze of lime juice. Serve with basmati rice.'
    ],
    tips: 'Full-fat coconut milk yields a luxurious texture; light coconut milk will be much thinner.'
  },
  {
    id: 'classic-fluffy-parmesan-omelet',
    title: 'French-Style Herb & Cheese Omelet',
    cookTime: '8 mins',
    prepTime: '4 mins',
    totalTimeMinutes: 12,
    servings: 1,
    difficulty: 'Medium',
    calories: 280,
    category: 'Breakfast',
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Tender pale yellow rolled French omelet garnished with fresh chives',
    description: 'Silky, tender eggs folded with melted sharp cheese, fresh chopped chives, and creamy unsalted butter without any browning.',
    ingredients: [
      { name: 'Eggs (fresh)', amount: '3 large' },
      { name: 'Unsalted butter', amount: '1.5 tbsp' },
      { name: 'Cheddar or Gruyere cheese (grated)', amount: '1/4 cup' },
      { name: 'Fresh chives or parsley (minced)', amount: '1 tbsp' },
      { name: 'Salt & white pepper', amount: 'A pinch' }
    ],
    steps: [
      'Crack eggs into a bowl. Season with a pinch of salt and white pepper. Whisk vigorously with a fork until homogenous and frothy.',
      'Melt butter in an 8-inch non-stick skillet over medium-low heat until completely foamy but not browned.',
      'Pour eggs into the skillet. Immediately start shaking the pan back and forth while stirring eggs in circular motions with a heat-proof rubber spatula.',
      'When eggs form small soft curds and are 80% set with a custard-like top, smooth out into an even layer.',
      'Scatter grated cheese and fresh chives across the center.',
      'Tilt the pan and use spatula to roll the omelet into an elegant cylinder. Roll out onto a plate seam-side down and rub the top with a dab of butter.'
    ],
    tips: 'Gentle heat and continuous circular agitation are the secrets to a velvety, non-rubbery French omelet.'
  },
  {
    id: 'honey-garlic-glazed-salmon',
    title: '15-Minute Honey Garlic Glazed Salmon',
    cookTime: '12 mins',
    prepTime: '5 mins',
    totalTimeMinutes: 17,
    servings: 2,
    difficulty: 'Easy',
    calories: 420,
    category: 'Bake',
    dietary: ['Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Caramelized salmon fillets glistening in sticky honey garlic sauce',
    description: 'Crispy skin-on salmon seared in a skillet and glazed in a sticky, sweet-savory reduction of clover honey, soy sauce, garlic, and lime.',
    ingredients: [
      { name: 'Salmon fillets', amount: '2 fillets (180g each)' },
      { name: 'Honey', amount: '3 tbsp' },
      { name: 'Soy sauce or Tamari', amount: '2 tbsp' },
      { name: 'Garlic cloves (minced)', amount: '3 cloves' },
      { name: 'Lime or lemon juice', amount: '1 tbsp' },
      { name: 'Olive oil', amount: '1 tbsp' },
      { name: 'Salt, black pepper & sesame seeds', amount: 'Garnish' }
    ],
    steps: [
      'In a small bowl, whisk together honey, soy sauce, minced garlic, and lime juice until combined.',
      'Pat salmon fillets completely dry with paper towels and season both sides lightly with salt and black pepper.',
      'Heat olive oil in a non-stick or cast iron skillet over medium-high heat. Place salmon skin-side down and cook for 4–5 minutes until skin is crisp.',
      'Carefully flip the salmon fillets.',
      'Pour the honey garlic sauce into the pan around the salmon. Let sauce bubble vigorously for 2–3 minutes, spooning the glaze over the fish as it thickens.',
      'Remove when salmon flakes tenderly. Garnish with toasted sesame seeds and sliced green onions.'
    ],
    tips: 'Cook skin-side down for 70% of the time to get exceptionally crispy skin without overcooking the delicate flesh.'
  }
];

export const POPULAR_INGREDIENTS = [
  { name: 'Garlic', icon: '🧄' },
  { name: 'Tomatoes', icon: '🍅' },
  { name: 'Eggs', icon: '🥚' },
  { name: 'Pasta', icon: '🍝' },
  { name: 'Chicken', icon: '🍗' },
  { name: 'Spinach', icon: '🥬' },
  { name: 'Cheese', icon: '🧀' },
  { name: 'Rice', icon: '🍚' },
  { name: 'Avocado', icon: '🥑' },
  { name: 'Mushrooms', icon: '🍄' },
  { name: 'Lemon', icon: '🍋' },
  { name: 'Chickpeas', icon: '🫘' },
];

/**
 * Match recipes based on user's input ingredients
 */
export function searchRecipesByIngredients(query: string, recipes: Recipe[] = RECIPES_DATA): { matched: Recipe[]; count: number } {
  if (!query || !query.trim()) {
    return { matched: recipes, count: recipes.length };
  }

  const queryTerms = query
    .toLowerCase()
    .split(/[,+\s]+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 1);

  if (queryTerms.length === 0) {
    return { matched: recipes, count: recipes.length };
  }

  // Score each recipe by how many query terms match ingredients or title/tags
  const scored = recipes.map((recipe) => {
    let matchScore = 0;
    const ingredientNames = recipe.ingredients.map((i) => i.name.toLowerCase()).join(' ');
    const fullText = `${recipe.title.toLowerCase()} ${recipe.category.toLowerCase()} ${recipe.description.toLowerCase()} ${ingredientNames}`;

    for (const term of queryTerms) {
      if (ingredientNames.includes(term)) {
        matchScore += 3; // strong weight for ingredient match
      } else if (fullText.includes(term)) {
        matchScore += 1;
      }
    }

    return { recipe, matchScore };
  });

  // Filter recipes that have at least 1 match, sorted by score descending
  const filtered = scored
    .filter((item) => item.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .map((item) => item.recipe);

  // If no direct matches, return all recipes with a fallback
  if (filtered.length === 0) {
    return { matched: recipes, count: 0 };
  }

  return { matched: filtered, count: filtered.length };
}
