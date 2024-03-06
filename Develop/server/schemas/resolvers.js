


const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models'); // Import your User model

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      // Check if user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You are not authenticated');
      }
      // Return the authenticated user
      return context.user;
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
        const token = generateAuthToken(user);
        return { token, user };
      },
      addUser: async (_, { username, email, password }) => {
        // Implement logic to add a new user
        const user = await User.create({ username, email, password });
        const token = generateAuthToken(user);
        return { token, user };
      },
      saveBook: async (_, { bookInput }, context) => {
        // Ensure user is authenticated
        if (!context.user) {
          throw new Error('Authentication required');
        }
  
        // Add the book to the user's savedBooks array
        const user = context.user;
        user.savedBooks.push(bookInput);
        await user.save();
  
        // Return the updated user
        return user;
      },
      removeBook: async (_, { bookId }, context) => {
        // Ensure user is authenticated
        if (!context.user) {
          throw new Error('Authentication required');
        }
  
        // Remove the book from the user's savedBooks array
        const user = context.user;
        user.savedBooks = user.savedBooks.filter(book => book.bookId !== bookId);
        await user.save();
  
        // Return the updated user
        return user;
      }
    }
  };
  
  // Helper function to generate authentication token
  function generateAuthToken(user) {
    // Implement token generation logic
    // Return the generated token
  }
  
  module.exports = resolvers;