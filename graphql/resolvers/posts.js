const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = Post.findById(postId);

        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error("???????");
      }
    },
  },
  Mutation: {
    async createPost(_, {body, game}, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Post cannot be empty");
      }

      const newPost = new Post({
        body,
        game,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully!";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const user = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === user.username)) {
          // already liked, so remove like
          post.likes = post.likes.filter(
            (like) => like.username !== user.username
          );
        } else {
          // add the like
          post.likes.unshift({
            username: user.username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};
