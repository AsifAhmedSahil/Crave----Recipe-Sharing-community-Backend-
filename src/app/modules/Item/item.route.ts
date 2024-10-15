import express from 'express';
// import { multerUpload } from '../../config/multer.config';
// import { parseBody } from '../../middlewares/bodyParser';
// import validateImageFileRequest from '../../middlewares/validateImageFileRequest';
import validateRequest from '../../middlewares/validateRequest';
import { recipeValidations } from './item.validation';
import { recipeController } from './item.controller';


const router = express.Router();

router.post(
  '/recipes',
  
  validateRequest(recipeValidations.createRecipeValidation),
  recipeController.createRecipe
);

router.post(
  "/rating",
  validateRequest(recipeValidations.rateRecipeValidation),
  recipeController.rateRecipe

)
router.post(
  "/addComment",
  validateRequest(recipeValidations.addCommentValidation),
  recipeController.addComment

)
router.post(
  "/deleteComment",
  validateRequest(recipeValidations.addCommentValidation),
  recipeController.addComment

)

router.get('/recipes', recipeController.getAllRecipes);

router.get('/recipe/:id', recipeController.getSingleRecipe);
router.get('/recipe/my-recipe/:id', recipeController.getMyRecipe);

router.put(
  '/recipe/:id',
  
  validateRequest(recipeValidations.updateRecipeValidation),
  recipeController.updateRecipe
);

router.delete('/recipe/:id',
  
  recipeController.deleteRecipe);
router.delete('/:recipeId/comment/:commentId/:userId',
 
  recipeController.deleteComment);

router.post("/recipe/upvote", recipeController.upvote);
router.post("/recipe/downvote", recipeController.downvote);

export const ItemRoutes = router;
