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

router.get('/recipes', recipeController.getAllRecipes);

router.get('/recipe/:id', recipeController.getSingleRecipe);

router.put(
  '/recipe/:id',
  // auth(USER_ROLE.USER),
  validateRequest(recipeValidations.updateRecipeValidation),
  recipeController.updateRecipe
);

router.delete('/recipe/:id',
  //  auth(USER_ROLE.USER),
  recipeController.deleteRecipe);

export const ItemRoutes = router;
