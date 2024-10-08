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

const updateUser = async (id: string, payload: Partial<TUser>) => {
  const updatedUser = await User.findByIdAndUpdate(id, payload, { new: true });
  if (!updatedUser) {
    throw new Error("User not found");
  }
  return updatedUser;
};

const updateUserStatus = async (id: string, status: string) => {
  const updatedUser = await User.findByIdAndUpdate(id, { status }, { new: true });
  if (!updatedUser) {
      throw new Error("User not found");
  }
  return updatedUser;
};

const deleteUserAccount = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
      throw new Error("User not found");
  }
  return deletedUser;
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

const unfollowUser = async (followerId: string, followeeId: string) => {
  const follower = await User.findById(followerId);
  const followee = await User.findById(followeeId);

  if (!follower || !followee) {
      throw new Error("User not found");
  }

  follower.followingIds = follower?.followingIds?.filter(id => id !== followeeId);
  followee.followerIds = followee?.followerIds?.filter(id => id !== followerId);

  await follower.save();
  await followee.save();

  return follower; // Return the updated follower user object
};

export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  followUser,
  unfollowUser,
  updateUser,
  updateUserStatus,
  deleteUserAccount
};
