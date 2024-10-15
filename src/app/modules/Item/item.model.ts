

import { Schema, model } from 'mongoose';
import { TRecipe } from './item.interface';

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
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  creator: {
    type: String,
    
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: [
      {
        userId: { type: String },
        recipeId: { type: String },
        stars: { type: Number, min: 1, max: 5 },
      },
    ],
    default: [],
  },
  comments: {
    type: [
      {
        userId: { type: String },
        recipeId: { type: String },
        content: { type: String },
        name: { type: String },
        profilePhoto: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  upvotes: [{ userId: { type: String } }], 
  downvotes: [{ userId: { type: String } }], 
  type: {
    type: String,
    enum: ['free', 'premium'],
    required: true,
  },
  averageRating: { type: Number, default: 0 },
  tags: {
    type: [String],
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true, 
  },
});



export const Recipe = model<TRecipe>('Recipe', recipeModel);
