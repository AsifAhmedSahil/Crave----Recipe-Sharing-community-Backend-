// src/models/recipe.model.ts

import { Schema, model } from "mongoose";
import { TRecipe } from "./item.interface";


const recipeModel = new Schema<TRecipe>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: String, required: true },
    }],
    instructions: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

export const Recipe = model<TRecipe>("Recipe", recipeModel);
