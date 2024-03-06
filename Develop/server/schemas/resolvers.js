


const { AuthenticationError } = require('apollo-server-express');
const User = require('./path/to/User'); // Import your User model

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
      // Your login logic here
    },
    addUser: async (_, { username, email, password }) => {
      // Your add user logic here
    },
    saveBook: async (_, { bookInput }, context) => {
      // Your save book logic here
    },
    removeBook: async (_, { bookId }, context) => {
      // Your remove book logic here
    }
  },
  User: {
    // Resolve the 'bookCount' field
    bookCount: async (parent) => parent.savedBooks.length
  },
  // Optionally, you can define resolvers for nested types like 'Book'
};

module.exports = resolvers;
