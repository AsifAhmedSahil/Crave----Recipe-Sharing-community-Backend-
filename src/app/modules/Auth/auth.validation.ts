import { z } from 'zod';

// const registerValidationSchema = z.object({
//   body: z.object({
//     name: z.string({
//       required_error: 'Name is required',
//     }),
//     email: z.string({
//       required_error: 'Email is required',
//     }),
//     password: z.string({ required_error: 'Password is required' }),
//     username: z.string({ required_error: 'User name is required' }),
//     profilePhoto: z.string(),
//   }),
// });
const registerValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    username: z.string({
      required_error: 'User name is required',
    }),
    profilePhoto: z.string().optional(), // Made optional
    bio: z.string().optional(), // Made optional
    // type: z.enum(['GENERAL', 'ADMIN', 'USER']), // Adjust based on your USER_TYPES
    // role: z.enum(['USER', 'ADMIN']), // Adjust based on your USER_ROLE
    followerIds: z.array(z.string()).optional(), // Optional
    followingIds: z.array(z.string()).optional(), // Optional
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const forgetPasswordValidation = z.object({
  body:z.object({
      email:z.string({
          required_error: 'email is required!'
      })
  })
})

const resetPasswordValidation = z.object({
  body:z.object({
      email:z.string({
          required_error: 'email id is required!'
      }),
      password:z.string({
          required_error: 'password is required!'
      }),
  })
})


export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidation,
  resetPasswordValidation
};
