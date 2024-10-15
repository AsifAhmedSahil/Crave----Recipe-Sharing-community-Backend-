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

// const getAllRecipes = catchAsync(async (req, res) => {
//   const userId = req.user._id; // Assuming you have user authentication
//   const query = { creator: userId, ...req.query }; // Add user ID to query

//   const recipes = await SearchRecipesQueryMaker(query);

//   res.status(200).json({
//     success: true,
//     message: "Fetched user's recipes successfully",
//     data: recipes,
//   });
// });



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
const getMyRecipe = catchAsync(async (req, res) => {
    const { id } = req.params; // Get the user ID from the route parameter
    const { limit , page } = req.query; // Get the limit from the query parameters
    const limitNumber = parseInt(limit as string) || 10; // Default to 10 if not provided
    const pageNumber = parseInt(page as string) || 1; // Default to page 1

    const skip = (pageNumber - 1) * limitNumber; 

    const result = await recipeServices.getMyRecipeFromDB(id, limitNumber,skip);
    
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



const updateRecipe = catchAsync(async (req, res) => {
    const { id } = req.params;

   

    const result = await recipeServices.updateRecipeIntoDB(id, req.body);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Recipe not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Recipe updated successfully",
        data: result,
    });
});

const deleteRecipe = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await recipeServices.deleteRecipeFromDB(id);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Recipe not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Recipe deleted successfully",
        data: result,
    });
});
const deleteComment = catchAsync(async (req, res) => {
    
    const { recipeId,commentId,userId } = req.params;
    const result = await recipeServices.deleteCommentFromDB(recipeId,commentId,userId);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Recipe not found",
        });
    }
    res.status(200).json({
        success: true,
        message: "Recipe deleted successfully",
        data: result,
    });
});

const rateRecipe = catchAsync(async (req, res) => {
  const { recipeId, stars, userId } = req.body; // Accept userId from request body
  const updatedRecipe = await recipeServices.rateRecipeInDB(recipeId, userId, stars);
  res.status(200).json({
    success: true,
    message: "Recipe rated successfully",
    data: updatedRecipe,
});
});
const addComment = catchAsync(async (req, res) => {
    const { recipeId, content,userId,name,profilePhoto } = req.body;
    

    const comments = await recipeServices.addCommentIntoDb(recipeId, userId, content,name,profilePhoto);
    res.status(200).json({
        success: true,
        message: "Comment posted successfully",
        data: comments,
    });
});
const upvote = catchAsync(async (req, res) => {
    const { recipeId, userId } = req.body;

    try {
        const updatedRecipe = await recipeServices.upvoteRecipe(recipeId, userId);
        res.status(200).json({ success: true, data: updatedRecipe });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
});
const downvote = catchAsync(async (req, res) => {
    const { recipeId, userId } = req.body;

        try {
            const updatedRecipe = await recipeServices.downvoteRecipe(recipeId, userId);
            res.status(200).json({ success: true, data: updatedRecipe });
        } catch (error) {
            res.status(400).json({ success: false, message: error });
        }
});



export const recipeController = {
    createRecipe,
    getAllRecipes,
    getSingleRecipe,
    updateRecipe,
    deleteRecipe,
    rateRecipe,
    addComment,
    upvote,
    downvote,
    getMyRecipe,
    deleteComment
};
