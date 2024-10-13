/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../User/user.model';
import { join } from 'path';
import { readFileSync } from 'fs';
import { TPayment } from './payments.interface';
import { Payment } from './payments.model';
import { initiatePayment, verifyPayment } from './Payments.util';

interface userDetails {
  name: string;

  email: string;
  username: any;
  type: string;
}

const createPayment = async (payload: TPayment) => {
  const transactionId = `TXN-${Date.now()}`;
  const updatePayload = {
    ...payload,
    transactionId,
  };
  await Payment.create(updatePayload);
  const paymentPayload = {
    _id: payload.userId,
    transactionId,
    amount: payload.amount,
    customerName: payload.name,
    customerAddress: payload.address,
    customerEmail: payload.email,
    customerPhone: payload.phoneNumber,
  };
  const paymentSession = await initiatePayment(paymentPayload);
  console.log(paymentSession);
  return paymentSession; // Return the created payment
};

const confirmationService = async (transactionId: string, userId: string) => {
    try {
      const verifyResponse = await verifyPayment(transactionId);
      console.log('Verify Response:', verifyResponse); // Log the response
  
      let userDetails: userDetails | null = null;
      if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        const user = await User.findOne({ _id: userId }).exec();
        if (user) {
          userDetails = {
            name: user.name,
            email: user.email,
            username: user.username,
            type: 'Premium',
          };
  
          await User.findByIdAndUpdate(
            { _id: userId },
            {
              type: 'PREMIUM',
            },
            { new: true }
          );
        } else {
          console.warn(`No user found with userid: ${userId}`);
        }
      }
    //   return userDetails
  
      const filepath = join(__dirname, '../../../views/confirmation.html');
      let template = readFileSync(filepath, 'utf-8');
  
      if (userDetails) {
        template = template
          .replace('{{name}}', userDetails.name)
          .replace('{{email}}', userDetails.email)
          .replace('{{username}}', userDetails.username)
          .replace('{{type}}', userDetails.type);
      }
      return template;
    } catch (error) {
      console.error('Error processing confirmation:', error);
      throw new Error('Failed to process confirmation.');
    }
  };
  

export const paymentServices = {
  createPayment,
  confirmationService,
};
