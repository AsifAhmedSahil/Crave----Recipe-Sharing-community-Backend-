



export interface TRecipe {
  title: string;
  description: string;
  ingredients: {
    name: string;
    quantity: string; 
  }[];
  instructions: string;
  image?: string;
  creator:string; 
  isDeleted?: boolean;
  ratings: { userId: string; recipeId: string; stars: number }[];
  comments: {
    _id?:string;
    userId: string;
    recipeId: string;
    content: string;
    name?:string;
    profilePhoto?:string;
    createdAt?: Date;
    updatedAt?: Date;
  }[];
  upvotes: { userId: string }[];
  downvotes: { userId: string }[]; 
  type: 'free' | 'premium'; 
  averageRating?: number;
  tags: string[]; 
  cookingTime: number; 
}
