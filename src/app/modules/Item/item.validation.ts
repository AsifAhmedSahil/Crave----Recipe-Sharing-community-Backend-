// src/validations/recipe.validation.ts

import { isValidObjectId } from "mongoose";
import { z } from "zod";

const createRecipeValidation = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        ingredients: z.array(
            z.object({
                name: z.string(),
                quantity: z.string(), // e.g., "2 cups", "1 tablespoon"
            })
        ),
        instructions: z.string(),
        image: z.string().optional(),
        creator: z.string().refine((id) => isValidObjectId(id), {
          message: "Creator must be a valid ObjectId",
      }),
        isDeleted: z.boolean().optional(),
        type: z.enum(['free', 'premium'], {
            message: "Type must be either 'free' or 'premium'",
        }),
    }),
});

const updateRecipeValidation = z.object({
  body: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      ingredients: z.array(
          z.object({
              name: z.string().optional(),
              quantity: z.string().optional(), // e.g., "2 cups", "1 tablespoon"
          })
      ).optional(),
      instructions: z.string().optional(),
      image: z.string().optional(),
      creator: z.string().refine((id) => isValidObjectId(id), {
          message: "Creator must be a valid ObjectId",
      }).optional(),
      isDeleted: z.boolean().optional(),
  }),
});

const rateRecipeValidation = z.object({
  body: z.object({
      userId: z.string(),
      recipeId: z.string(),
      stars: z.number().min(1).max(5, {
          message: "Stars must be between 1 and 5",
      }),
  }),
});

const addCommentValidation = z.object({
    body: z.object({
        userId: z.string(),
        recipeId: z.string(), 
        content: z.string().min(1, { message: "Content cannot be empty" }), // Ensure content is not empty
    }),
});

export const recipeValidations = {
    createRecipeValidation,
    updateRecipeValidation,
    rateRecipeValidation,
    addCommentValidation
};
