/* eslint-disable no-useless-escape */
import bcryptjs from 'bcryptjs';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { USER_ROLE, USER_STATUS, USER_TYPES } from './user.constant';
import { IUserModel, TUser } from './user.interface';

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      required: true,
    },
    email: {
      type: String,
      required: true,
      //validate email
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    status: {
      type: String,
      enum: Object.keys(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    passwordChangedAt: {
      type: Date,
    },
    username: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      
    },
    type: {
      type: String,
      enum: Object.keys(USER_TYPES),
      default: USER_TYPES.GENERAL,
    },
    followerIds: [{ type: String,}],
    followingIds: [{ type: String, }],
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; 
  
  if (user.isModified('password')) {
    if (!user.password) {
        return next(new Error("Password is required"));
    }

    user.password = await bcryptjs.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );
}

next();
});


userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: number,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, IUserModel>('User', userSchema);
