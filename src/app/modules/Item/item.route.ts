import express from 'express';
// import { multerUpload } from '../../config/multer.config';
// import { parseBody } from '../../middlewares/bodyParser';
// import validateImageFileRequest from '../../middlewares/validateImageFileRequest';
import validateRequest from '../../middlewares/validateRequest';
import { recipeValidations } from './item.validation';
import { recipeController } from './item.controller';
// import { ImageFilesArrayZodSchema } from '../../zod/image.validation';
// import { ItemControllers } from './item.controller';
// import { ItemValidation } from './item.validation';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/recipes',
  // auth(USER_ROLE.USER),
  // multerUpload.fields([{ name: 'itemImages' }]),
  // validateImageFileRequest(ImageFilesArrayZodSchema),
  // parseBody,
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
  // auth(USER_ROLE.USER),
  validateRequest(recipeValidations.updateRecipeValidation),
  recipeController.updateRecipe
);

router.delete('/recipe/:id',
  //  auth(USER_ROLE.USER),
  recipeController.deleteRecipe);
router.delete('/:recipeId/comment/:commentId/:userId',
  //  auth(USER_ROLE.USER),
  recipeController.deleteComment);

router.post("/recipe/upvote", recipeController.upvote);
router.post("/recipe/downvote", recipeController.downvote);

export const ItemRoutes = router;
