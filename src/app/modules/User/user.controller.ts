import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const userRegister = catchAsync(async (req, res) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.id; // Get user ID from the URL
  const updatedUser = await UserServices.updateUser(userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const { id } = req.params; // Assuming userId is passed in the route params
  const updatedUser = await UserServices.updateUserStatus(id, 'BLOCKED');

  sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User blocked successfully',
      data: updatedUser,
  });
});

const unblockUser = catchAsync(async (req, res) => {
  const { id } = req.params; // Assuming userId is passed in the route params
  const updatedUser = await UserServices.updateUserStatus(id, 'ACTIVE');

  sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User unblocked successfully',
      data: updatedUser,
  });
});

const followUser = catchAsync(async (req, res) => {
  const { followerId, followingId } = req.body;
  const follower = await UserServices.followUser(followerId, followingId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Follow the user',
    data: follower,
  });
});
const unfollowUser = catchAsync(async (req, res) => {
  const { followerId, followingId } = req.body;
  const follower = await UserServices.unfollowUser(followerId, followingId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Unfollow the user',
    data: follower,
  });
});




export const UserControllers = {
  getSingleUser,
  userRegister,
  getAllUsers,
  followUser ,
  unfollowUser,
  updateUser,
  blockUser,
  unblockUser
};
