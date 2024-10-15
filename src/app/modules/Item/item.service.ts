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

const getMyRecipeFromDB = async (id: string, limit: number,skip: number) => {
    // Assuming you may also want to use 'skip' for pagination
    const recipes = await Recipe.find({ creator: id, isDeleted: false })
    .skip(skip)
        .limit(limit); // Limit the number of recipes returned

    return recipes; // Return the array of recipes
};




const updateRecipeIntoDB = async (id: string, payload: Partial<TRecipe>) => {
    const result = await Recipe.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteRecipeFromDB = async (id: string) => {
    const result = await Recipe.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) {
        throw new Error("Failed to delete recipe from database");
    }
    return result;
};
const deleteCommentFromDB = async (recipeId:string,commentId:string,userId:string) => {
    const recipe = await Recipe.findById(recipeId);
    
    if (!recipe) {
        throw new Error("Recipe not found");
    }

    // Check if the comment belongs to the user (optional, for authorization)
    const comment = recipe.comments.find(comment => comment._id && comment._id.toString() === commentId && comment.userId === userId);
    if (!comment) {
        throw new Error("Comment not found or does not belong to user");
    }

    // Remove the comment from the comments array
    recipe.comments = recipe.comments.filter(comment => comment._id && comment._id.toString() !== commentId);
    
    // Save the updated recipe
    const updatedRecipe = await recipe.save();
    
    return updatedRecipe;
};

export const rateRecipeInDB = async (recipeId: string, userId: string, stars: number) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
      throw new Error("Recipe not found");
  }

  const existingRating = recipe.ratings.find(r =>
    // console.log(r.userId,"rrrrrrrrrrr")
    r.userId && r.userId.toString() === userId
    );
  if (existingRating) {
      existingRating.stars = stars; // Update existing rating
  } else {
      recipe.ratings.push({ userId,recipeId, stars }); // Add new rating
  }

  const totalStars = recipe.ratings.reduce((sum, rating) => sum + rating.stars, 0);
    recipe.averageRating = recipe.ratings.length > 0 ? totalStars / recipe.ratings.length : 0;
  await recipe.save();
  return recipe 
    
};
export const addCommentIntoDb = async (recipeId: string, userId: string, content:string,name:string,profilePhoto:string) => {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new Error("Recipe not found");
    }

    const newComment = {
        recipeId,
        userId,
        content,
        name,
        profilePhoto,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    recipe.comments.push(newComment);
    await recipe.save();
    return recipe.comments; // Return the updated comments
};

export const upvoteRecipe = async (recipeId: string, userId: string) => {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new Error("Recipe not found");
    }

    // Check if the user has already upvoted
    const existingUpvote = recipe.upvotes.find(upvote => upvote.userId === userId);
    if (existingUpvote) {
        throw new Error("You have already upvoted this recipe");
    }

    // Remove any existing downvote by the user
    recipe.downvotes = recipe.downvotes.filter(downvote => downvote.userId !== userId);

    // Add the upvote
    recipe.upvotes.push({ userId });
    await recipe.save();

    return recipe; // Return the updated recipe
};
export const downvoteRecipe = async (recipeId: string, userId: string) => {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new Error("Recipe not found");
    }

    // Check if the user has already downvoted
    const existingDownvote = recipe.downvotes.find(downvote => downvote.userId === userId);
    if (existingDownvote) {
        throw new Error("You have already downvoted this recipe");
    }

    // Remove any existing upvote by the user
    recipe.upvotes = recipe.upvotes.filter(upvote => upvote.userId !== userId);

    // Add the downvote
    recipe.downvotes.push({ userId });
    await recipe.save();

    return recipe; // Return the updated recipe

    
};




export const recipeServices = {
    createRecipeIntoDB,
    getAllRecipesFromDB,
    getSingleRecipeFromDB,
    updateRecipeIntoDB,
    deleteRecipeFromDB,
    rateRecipeInDB,
    addCommentIntoDb,
    upvoteRecipe,
    downvoteRecipe,
    getMyRecipeFromDB,
    deleteCommentFromDB
    // deleteUserComment
};
