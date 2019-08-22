module.exports = {
  Query: {
    getUser: () => null
  },
  Mutation: {
    addPost:
    signupUser: async (_, {username, email, password}, {User}) => {
      const user = await User.findOne({username});
      if(user) {
        throw new Error('User Already Exists')
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return newUser;
    }
  }
}
