const { ApolloServer} = require('apollo-server');

const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')
const resolvers = require('./resolvers')

require('dotenv').config({path: 'variables.env'});
const User = require('./models/User')
const Post = require('./models/Post')

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"))
  .catch(err => console.error(err))

const todos = [
  { task: 'Wash Car', completed: false},
  { task: 'Clean Room', completed: true}
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

server.listen(3000).then(({url}) => {
  console.log(`Server Listening on ${url}`)
});
