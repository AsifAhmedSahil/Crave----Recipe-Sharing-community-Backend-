import express from 'express';
import { paymentController } from './Payments.controller';


const router = express.Router();


router.post(
      '/create-payment',
      
      paymentController.createPayment
    );
router.post(
      '/confirmation',
      
      paymentController.confirmationController
    );
    
export const PaymentRoutes = router;
