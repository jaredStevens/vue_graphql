module.exports = {
  Mutation: {
    signupUser: async (_, {username, email, password}, {User}) => {
      const user = await User.findOne({username})
    }
  }
}
