import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ItemRoutes } from '../modules/Item/item.route';
import { ItemCategoryRoutes } from '../modules/ItemCategory/itemCategory.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { PaymentRoutes } from '../modules/Payment/payments.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/item-categories',
    route: ItemCategoryRoutes,
  },
  {
    path: '/items',
    route: ItemRoutes,
  },

  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path:"/payment",
    route: PaymentRoutes
},
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
