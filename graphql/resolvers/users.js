const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const checkAuth = require("../../utils/check-auth");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const User = require("../../models/User");
const { SECRET_KEY } = require("../../config");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // make sure user does not already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // hash password and create Auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async deleteUser(_, { userId }) {
      console.log('deleteUser userId', userId)
      // const user = checkAuth(context);
      // console.log('deleteUser useuserrId', user)
      const userProfile = await User.findById(userId);
      console.log('deleteUser userProfile', userProfile)
      await userProfile.delete();
      return "Account deleted successfully!";
    },
    // async updateUser(_, {userId}, context) {

    // }
  },
};

// async deletePost(_, { postId }, context) {
//   const user = checkAuth(context);

//   try {
//     const post = await Post.findById(postId);
//     if (user.username === post.username) {
//       await post.delete();
//       return "Post deleted successfully!";
//     } else {
//       throw new AuthenticationError("Action not allowed");
//     }
//   } catch (err) {
//     throw new Error(err);
//   }
// },

// async deleteComment(_, { postId, commentId }, context) {
//   const user = checkAuth(context);

//   const post = await Post.findById(postId);

//   if (post) {
//     const commentIndex = post.comments.findIndex((c) => c.id === commentId);

//     if (post.comments[commentIndex].username === user.username) {
//       post.comments.splice(commentIndex, 1);

//       await post.save();
//       return post;
//     } else {
//       throw new AuthenticationError("Action not allowed");
//     }
//   } else {
//     throw new UserInputError("Post not found");
//   }
// },
