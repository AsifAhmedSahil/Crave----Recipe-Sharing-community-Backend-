import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createToken } from '../../utils/verifyJWT';
import { USER_ROLE } from '../User/user.constant';
import { User } from '../User/user.model';
import { TLoginUser, TRegisterUser } from './auth.interface';
import { sendEmail } from '../../utils/emailSender';

const registerUser = async (payload: TRegisterUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!');
  }

  payload.role = USER_ROLE.USER;
  

  //create new user
  const newUser = await User.create(payload);

  //create token and sent to the  client

  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    username: newUser.username,
    role: newUser.role,
    profilePhoto: newUser.profilePhoto,
    status: newUser.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const registerAdmin = async (payload: TRegisterUser) => {
  // Check if the admin already exists by email
  const existingAdmin = await User.isUserExistsByEmail(payload.email);
  if (existingAdmin) {
    throw new AppError(httpStatus.CONFLICT, 'This admin already exists!');
  }

  // Set role to ADMIN
  payload.role = USER_ROLE.ADMIN;

  // Create new admin user
  const newAdmin = await User.create(payload);

  // Prepare JWT payload
  const jwtPayload = {
    _id: newAdmin._id,
    name: newAdmin.name,
    email: newAdmin.email,
    username: newAdmin.username,
    role: newAdmin.role,
    profilePhoto: newAdmin.profilePhoto,
    status: newAdmin.status,
  };

  // Generate access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  // Generate refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  // Return tokens and admin data
  return {
    accessToken,
    refreshToken,
    user: jwtPayload,  // Optionally return admin data
  };
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role,
    profilePhoto: user.profilePhoto,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role,
    status: user.status,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (email: string) => {
  // check user is exist in database or not

  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This user is not exist in database'
    );
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role,
    status: user.status,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m'
  );

  console.log(resetToken);

  const resetUIdLink = `http://localhost:3000/reset-password/?email=${user.email}&token=${resetToken}`;

  console.log(resetUIdLink);

  sendEmail(user.email, resetUIdLink);
};

const resetPassword = async(payload:{email:string,password:string},token:string) =>{

  // check user is exist in database or not

  const user = await User.isUserExistsByEmail(payload?.email)
 
  if(!user){
      throw new AppError(httpStatus.NOT_FOUND,"This user is not exist in database")
  }

 

  // verify is token is valid or not
  const decoded = jwt.verify(token,config.jwt_access_secret as string) as JwtPayload 
  console.log(decoded)

  if(payload.email !== decoded.email){
      throw new AppError(httpStatus.FORBIDDEN,"You are forbiden.email not found")
  }

  // hash new password
  const hashedNewPassword = await bcrypt.hash(payload.password,Number(config.bcrypt_salt_rounds))
  console.log(hashedNewPassword)
  await User.findOneAndUpdate(
      {
          email:decoded.email,
          role:decoded.role
      },
      {
          password: hashedNewPassword,
          needPasswordChange:false,
          passwordChangeAt : new Date()
      }
  )

}


export const AuthServices = {
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
  registerAdmin
};
