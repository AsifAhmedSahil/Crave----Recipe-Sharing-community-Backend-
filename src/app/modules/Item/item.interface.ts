// src/interfaces/recipe.interface.ts

import { Types } from 'mongoose';

export interface TRecipe {
  title: string;
  description: string;
  ingredients: {
    name: string;
    quantity: string; // e.g., "2 cups", "1 tablespoon"
  }[];
  instructions: string;
  image?: string;
  creator: Types.ObjectId; // Assuming this is a User ID
  isDeleted?: boolean;
  ratings: { userId: string; recipeId: string; stars: number }[];
  comments: {
    userId: string;
    recipeId: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
  }[];
  upvotes: { userId: string }[]; // Added for upvotes
  downvotes: { userId: string }[]; // Added for downvotes
}
