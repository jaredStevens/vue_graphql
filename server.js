const { ApolloServer} = require('apollo-server');

const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path')

//import typeDefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

//import Environment Variables and Mongoose Models
require('dotenv').config({path: 'variables.env'});
const User = require('./models/User')
const Post = require('./models/Post')

//connect to MLAB database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"))
  .catch(err => console.error(err))

//Creating Apollo/GraphQl Server using typeDefs, resolvers, and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

//Listening on port -- port server is run
server.listen(3000).then(({url}) => {
  console.log(`Server Listening on ${url}`)
});
