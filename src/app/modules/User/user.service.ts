import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const followUser = async (followerId: string, followingId: string) => {
  const follower = await User.findById(followerId);
  const following = await User.findById(followingId);

  if (!follower || !following) {
      throw new Error("User not found");
  }

  if (follower?.followingIds?.includes(followingId)) {
      throw new Error("You are already following this user");
  }

  follower?.followingIds?.push(followingId);
  following.followerIds?.push(followerId);

  await follower.save();
  await following.save();
  
  return { success: true };
};

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  followUser
};
