import nodemailer from 'nodemailer';
import config from '../config';


export const sendEmail = async(to:string , html:string) =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        // secure: config.node_env === 'production',
         // Use `true` for port 465, `false` for all other ports

         secure: config.NODE_ENV === 'production',
        auth: {
          user: "asifahmedsahil.007@gmail.com",
          pass: "zgqa hqru fbvo toqq",
        },
      });

      await transporter.sendMail({
        from: 'asifahmedsahil.007@gmail.com', // sender address
        to ,
        subject: "Please change your password within 10 mins!", // Subject line
        text: "hello, change your password with this link", // plain text body
        html, // html body
      });
}