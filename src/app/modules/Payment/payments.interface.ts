
import { Document } from 'mongoose';

export type TPayment = {
  userId: string; 
  name: string;
  email: string;
  address: string;
  amount: number;
  phoneNumber: string;
  transactionId?: string;
};

export interface IPaymentModel extends Document, TPayment {
  createdAt?: Date;
  updatedAt?: Date;
}
