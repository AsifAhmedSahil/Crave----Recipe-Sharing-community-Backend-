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
      success_url: `http://localhost:5000/api/payment/confirmation/?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `http://localhost:5000/api/v1/payment/confirmation/?status=failed`,
      cancel_url: "http://localhost:5173/",
      amount: paymentData.payableAmount,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: paymentData.customerName,
      cus_email: "asif@gmail.com",
      cus_add1: "N/A",
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "N/A",
      cus_phone: "N/A",
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
