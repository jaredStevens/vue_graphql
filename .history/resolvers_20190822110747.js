module.exports = {
  Query: {
    getPosts: async (_, args, {Post}) => {
      const posts = await Post.find({}).sort({createdDate: 'desc'});
    }
  },
  Mutation: {
    addPost: async (_, {title, imageUrl, categories, description, creatorId}, {Post}) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save()
      return newPost
    },
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
