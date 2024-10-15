/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";



export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(process.env.PAYMENT_URL!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      
      success_url: `https://crave-server-assignment-6.vercel.app/api/v1/payment/confirmation/?transactionId=${paymentData.transactionId}&userId=${paymentData._id}`,
      fail_url: `https://crave-server-assignment-6.vercel.app/api/v1/payment/confirmation/?status=failed`,
      cancel_url: "https://crave-client-assignment-6.vercel.app",
      amount: paymentData.amount,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: paymentData.customerName,
      cus_email:paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "N/A",
      cus_phone: paymentData.customerPhone,
      type: "json",
    });

    return response.data;
  } catch (error) {
    throw new Error("payment initiation failed!");
  }
};

export const verifyPayment = async (transactionId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
      signature_key: config.signature_key,
        type: "json",
        request_id: transactionId,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Payment Validation Failed!");
  }
};


