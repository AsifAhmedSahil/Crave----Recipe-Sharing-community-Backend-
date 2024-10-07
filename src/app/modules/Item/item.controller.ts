// src/controllers/recipe.controller.ts


import { catchAsync } from "../../utils/catchAsync";
import { recipeServices } from "./item.service";


const createRecipe = catchAsync(async (req, res) => {
  console.log(req.body)
    const result = await recipeServices.createRecipeIntoDB({ ...req.body});
    res.status(200).json({
        success: true,
        message: "Recipe created successfully",
        data: result,
    });
});

const getAllRecipes = catchAsync(async (req, res) => {
    const result = await recipeServices.getAllRecipesFromDB();
    res.status(200).json({
        success: true,
        message: "All recipes retrieved successfully",
        data: result,
    });
});

const getSingleRecipe = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await recipeServices.getSingleRecipeFromDB(id);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Recipe not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Recipe retrieved successfully",
        data: result,
    });
});

// const updateRecipe = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const result = await recipeServices.updateRecipeIntoDB(id, req.body);
//     if (!result) {
//         return res.status(404).json({
//             success: false,
//             message: "Recipe not found",
//         });
//     }
//     res.status(200).json({
//         success: true,
//         message: "Recipe updated successfully",
//         data: result,
//     });
// });

// const deleteRecipe = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const result = await recipeServices.deleteRecipeFromDB(id);
//     if (!result) {
//         return res.status(404).json({
//             success: false,
//             message: "Recipe not found",
//         });
//     }
//     res.status(200).json({
//         success: true,
//         message: "Recipe deleted successfully",
//         data: result,
//     });
// });

export const recipeController = {
    createRecipe,
    getAllRecipes,
    getSingleRecipe,
    // updateRecipe,
    // deleteRecipe,
};
