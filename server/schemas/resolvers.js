


const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models'); // Import your User model
const { signToken } = require("../auth")
const resolvers = {
  Query: {
    me: async (parent, context) => {
      // Check if user is authenticated
      console.log(context)
      // if (!context.user) {
      //   throw new AuthenticationError('You are not authenticated');
      // }
      // Return the authenticated user
      const userData = await User.findOne({_id: context.user._id}).select("-__v -password")
      return userData;
    }
  },
  
    Mutation: {
      login: async (_, { email, password }) => {
        // Implement login logic
        // Check if a user with the provided email exists
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Invalid email or password');
        }
  
        // Check if the password is correct
        const isPasswordValid = await user.isCorrectPassword(password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }
  
        // Generate and return an authentication token
        const token = signToken(user);
        return { token, user };
      },
      addUser: async (_, { username, email, password }) => {
        // Implement logic to add a new user
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      saveBook: async (_, { bookData }, context) => {
        // Ensure user is authenticated
        // if (!context.user) {
        //   throw new Error('Authentication required');
        // }
  
        // Add the book to the user's savedBooks array
        const userData = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$push: {savedBooks: bookData}},
          {new: true}
        )
  
        // Return the updated user =
        return userData;
      },
      removeBook: async (_, { bookId }, context) => {
        // Ensure user is authenticated
        if (!context.user) {
          throw new Error('Authentication required');
        }
  
        // Remove the book from the user's savedBooks array
        const userData = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$pull: {savedBooks: {bookId}}},
          {new: true}
        )
  
        // Return the updated user
        return userData;
      }
    }
  };
  
  // Helper function to generate authentication token
  function generateAuthToken(user) {
    // Implement token generation logic
    // Return the generated token
  }
  
  module.exports = resolvers;