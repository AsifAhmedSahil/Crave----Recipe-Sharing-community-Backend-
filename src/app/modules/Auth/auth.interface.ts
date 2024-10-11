import { USER_ROLE, USER_TYPES } from '../User/user.constant';

export type TLoginUser = {
  email: string;
  password: string;
};

// export type TRegisterUser = {
//   name: string;
//   email: string;
//   username:string,
//   password: string;
//   profilePhoto?:string;
//   type:keyof typeof USER_TYPES,
//   role: keyof typeof USER_ROLE;
// };

export type TRegisterUser = {
  name: string;
  email: string;
  username: string;
  password: string;
  bio:string;
  profilePhoto?: string; // Optional property
  type: keyof typeof USER_TYPES; // Assuming USER_TYPES is defined elsewhere
  role: keyof typeof USER_ROLE; // Assuming USER_ROLE is defined elsewhere
  followerIds?: string[]; // Added property
  followingIds?: string[]; // Added property
};
