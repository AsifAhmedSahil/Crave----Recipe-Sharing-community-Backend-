import { USER_ROLE, USER_TYPES } from '../User/user.constant';

export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterUser = {
  name: string;
  email: string;
  username:string,
  password: string;
  profilePhoto?:string;
  type:keyof typeof USER_TYPES,
  role: keyof typeof USER_ROLE;
};
