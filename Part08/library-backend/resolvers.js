const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')


const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),

    allBooks: async (_root, args) => {
      const crit = {}
        if(args.author){
          const author = await Author.findOne({ name: args.author })
          crit.author = author._id
        }
        if(args.genre)
          crit.genres = args.genre

      let res = await Book.find(crit).populate('author')
      return res
    },
    allAuthors: async () => {
      const authorsBooksArray = await Author.find({})
      const authorsBooksCount = authorsBooksArray.map(a => {
        a.bookCount = a.books.length
        delete a.books
        return a
      }
    )
      return authorsBooksCount
    },
    me: (_root, _args, context) => {
      return context.currentUser
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
  Mutation: {
    addBook: async (_root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      
      let author = await Author.findOne({ name: args.author })
      if(!author) {
        author = new Author({ name: args.author})
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author: author._id })
      author.books = author.books.concat(book._id)

      try {
        await book.save()
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      const populatedBook = await Book.findOne({ title: book.title }).populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

      return populatedBook
    },
    addAuthor: async (root, args) => {

      const author = new Author({ ...args })
      
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return author
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = await Author.findOne({ name: args.name })
      if(!author) throw new GraphQLError(`there is no author with name:${args.author} in the database`)

      author.born = args.setBornTo
      
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      author.bookCount = author.books.length
      delete author.books

      return author
    },
    createUser: async (_root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        })
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

module.exports = resolvers