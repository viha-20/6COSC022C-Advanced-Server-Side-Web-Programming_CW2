const UserDAO = require('../dao/UserDAO');
const FollowDAO = require('../dao/FollowDAO');
const BlogPostDAO = require('../dao/BlogPostDAO');

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserDAO.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const [postsCount, followersCount, followingCount] = await Promise.all([
      BlogPostDAO.countByUserId(userId),
      FollowDAO.getFollowersCount(userId),
      FollowDAO.getFollowingCount(userId)
    ]);
    
    res.json({
      id: user.id,
      username: user.username,
      createdAt: user.created_at,
      postsCount: postsCount || 0,
      followersCount: followersCount || 0,
      followingCount: followingCount || 0
    });
  } catch (err) {
    next(err);
  }
};

const followUser = async (req, res, next) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.id;
    
    if (followerId === followingId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }
    
    const alreadyFollowing = await FollowDAO.exists(followerId, followingId);
    if (alreadyFollowing) {
      return res.status(400).json({ message: 'Already following this user' });
    }
    
    await FollowDAO.create(followerId, followingId);
    res.json({ message: 'User followed successfully' });
  } catch (err) {
    next(err);
  }
};

const unfollowUser = async (req, res, next) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.id;
    
    const isFollowing = await FollowDAO.exists(followerId, followingId);
    if (!isFollowing) {
      return res.status(400).json({ message: 'Not following this user' });
    }
    
    await FollowDAO.delete(followerId, followingId);
    res.json({ message: 'User unfollowed successfully' });
  } catch (err) {
    next(err);
  }
};

const getFollowers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { page = 1, limit = 10 } = req.query;
    
    const followers = await FollowDAO.getFollowers(userId, { limit, offset: (page - 1) * limit });
    res.json(followers);
  } catch (err) {
    next(err);
  }
};

const getFollowing = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { page = 1, limit = 10 } = req.query;
    
    const following = await FollowDAO.getFollowing(userId, { limit, offset: (page - 1) * limit });
    res.json(following);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserProfile,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
};