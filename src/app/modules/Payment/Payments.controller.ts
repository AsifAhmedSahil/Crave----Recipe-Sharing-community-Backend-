import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { paymentServices } from "./Payments.service";
import { Request, Response } from "express";

const createPayment = catchAsync(async (req, res) => {
    const paymentData = req.body; // Extract payment data from the request body
  
    // Call the payment service to create a payment
    const payment = await paymentServices.createPayment(paymentData);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Payment Created Successfully',
      data: payment,
    });
  });

  const confirmationController = async(req:Request,res:Response) =>{
    const {transactionId,userId} = req.query
    console.log(transactionId,userId)
    const result = await paymentServices.confirmationService(transactionId as string,userId as string)
    res.send(result)
}

  export const paymentController ={
    createPayment,
    confirmationController
  }