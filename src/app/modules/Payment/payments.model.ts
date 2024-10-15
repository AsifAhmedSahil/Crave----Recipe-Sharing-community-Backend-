
import { Schema, model} from 'mongoose';
import { IPaymentModel } from './payments.interface';


const paymentSchema = new Schema<IPaymentModel>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [
        /^[0-9]+$/,
        'Phone number must contain only digits',
      ],
    },
    transactionId:{
        type:String
        
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Payment = model<IPaymentModel>('Payment', paymentSchema);
