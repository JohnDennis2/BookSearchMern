const User = require('./User');
const Book = require('./Book');

module.exports = { User, Book };



type Book = {
  authors: [String]
  description: String!
  bookId: String!
  image: String
  link: String
  title: String!
}

type User = {
  _id: ID!
  username: String!
  email: String!
  password: String!
  savedBooks: [Book]!
  bookCount: Int
}

const User = require('./path/to/User'); // Import User model

