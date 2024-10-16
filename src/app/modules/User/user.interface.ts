/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE, USER_STATUS, USER_TYPES } from './user.constant';

export type TUser = {
  _id?: string;
  name: string;
  role: keyof typeof USER_ROLE;
  email: string;
  bio: string;
  password: string;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
  username?: string;
  profilePhoto?: string;
  type: keyof typeof USER_TYPES;
  createdAt?: Date;
  updatedAt?: Date;
  followerIds?: string[]; 
  followingIds?: string[]; 
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}
