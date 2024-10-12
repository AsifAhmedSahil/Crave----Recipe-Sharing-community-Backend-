// src/interfaces/recipe.interface.ts



export interface TRecipe {
  title: string;
  description: string;
  ingredients: {
    name: string;
    quantity: string; // e.g., "2 cups", "1 tablespoon"
  }[];
  instructions: string;
  image?: string;
  creator:string; // Assuming this is a User ID
  isDeleted?: boolean;
  ratings: { userId: string; recipeId: string; stars: number }[];
  comments: {
    userId: string;
    recipeId: string;
    content: string;
    name?:string;
    profilePhoto?:string;
    createdAt?: Date;
    updatedAt?: Date;
  }[];
  upvotes: { userId: string }[]; // Added for upvotes
  downvotes: { userId: string }[]; // Added for downvotes
  type: 'free' | 'premium'; 
  averageRating?: number;
  tags: string[]; // Array of tags (e.g., ["Vegetarian", "Gluten-Free"])
  cookingTime: number; 
}
