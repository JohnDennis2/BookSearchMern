const jwt = require('jsonwebtoken');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Your schema definition
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Your resolver functions
const root = {
  hello: () => 'Hello world!',
};

// Authentication middleware
const authMiddleware = (req, res, next) => {
  // Extract token from headers or query
  let token = req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return res.status(400).json({ message: 'You have no token!' });
  }

  // Verify token and get user data out of it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    next();
  } catch {
    console.log('Invalid token');
    return res.status(400).json({ message: 'invalid token!' });
  }
};

// Create GraphQL HTTP middleware with authentication
const graphqlWithAuth = graphqlHTTP((req, res, graphQLParams) => ({
  schema: schema,
  rootValue: root,
  graphiql: true, // Optionally enable GraphiQL for testing
  context: { user: req.user }, // Provide user context to resolvers
}));

// Expose the GraphQL endpoint with authentication middleware
app.use('/graphql', authMiddleware, graphqlWithAuth);



// const jwt = require('jsonwebtoken');

// // set token secret and expiration date
// const secret = 'mysecretsshhhhh';
// const expiration = '2h';

// module.exports = {
//   // function for our authenticated routes
//   authMiddleware: function (req, res, next) {
//     // allows token to be sent via  req.query or headers
//     let token = req.query.token || req.headers.authorization;

//     // ["Bearer", "<tokenvalue>"]
//     if (req.headers.authorization) {
//       token = token.split(' ').pop().trim();
//     }

//     if (!token) {
//       return res.status(400).json({ message: 'You have no token!' });
//     }

//     // verify token and get user data out of it
//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log('Invalid token');
//       return res.status(400).json({ message: 'invalid token!' });
//     }

//     // send to next endpoint
//     next();
//   },
//   signToken: function ({ username, email, _id }) {
//     const payload = { username, email, _id };

//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };
