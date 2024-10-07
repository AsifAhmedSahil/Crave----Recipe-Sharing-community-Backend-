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
    }),
});

export const recipeValidations = {
    createRecipeValidation,
};
