

import { isValidObjectId } from "mongoose";
import { z } from "zod";

const createRecipeValidation = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        ingredients: z.array(
            z.object({
                name: z.string(),
                quantity: z.string(),
            })
        ),
        instructions: z.string(),
        image: z.string().optional(),
        creator: z.string(),
        isDeleted: z.boolean().optional(),
        type: z.enum(['free', 'premium'], {
            message: "Type must be either 'free' or 'premium'",
        }),
        tags: z.array(z.string()).nonempty("At least one tag is required."),
    cookingTime: z.number().positive("Cooking time must be a positive number."),
    }),
});

const updateRecipeValidation = z.object({
  body: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      ingredients: z.array(
          z.object({
              name: z.string().optional(),
              quantity: z.string().optional(), 
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
        name: z.string(), 
        profilePhoto: z.string(), 
        content: z.string().min(1, { message: "Content cannot be empty" }), 
    }),
});

export const recipeValidations = {
    createRecipeValidation,
    updateRecipeValidation,
    rateRecipeValidation,
    addCommentValidation
};
