// src/services/recipe.service.ts

import { TRecipe } from "./item.interface";
import { Recipe } from "./item.model";


const createRecipeIntoDB = async (payload: TRecipe) => {
    const result = await Recipe.create(payload);
    return result;
};

const getAllRecipesFromDB = async () => {
    return await Recipe.find({ isDeleted: false }).populate('creator', 'username'); // Populate creator's username
};

const getSingleRecipeFromDB = async (id: string) => {
    return await Recipe.findById(id).populate('creator', 'username');
};

// const updateRecipeIntoDB = async (id: string, payload: Partial<TRecipe>) => {
//     const result = await Recipe.findByIdAndUpdate(id, payload, { new: true });
//     return result;
// };

// const deleteRecipeFromDB = async (id: string) => {
//     const result = await Recipe.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
//     if (!result) {
//         throw new Error("Failed to delete recipe from database");
//     }
//     return result;
// };

export const recipeServices = {
    createRecipeIntoDB,
    getAllRecipesFromDB,
    getSingleRecipeFromDB,
    // updateRecipeIntoDB,
    // deleteRecipeFromDB,
};
