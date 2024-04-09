const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `

type Author {
  name: String!
  born: Int
  bookCount: String
  id: ID!
}

type Book {
  title: String!
  published: Int!
  author: Author!
  id: ID!
  genres: [String]!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  authorCount: Int!
  bookCount: Int!
  allBooks(
    author: String
    genre: String
  ): [Book!]!
  allAuthors: [Author!]!
  me: User
}

type Mutation {
  addA(
    title: String!
    published: Int!
    author: String!
    genres: [String]!
  ): Author


  addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String]!
  ): Book

  addAuthor(
    name: String!
    born: Int
  ): Author

  editAuthor(
    name: String!
    setBornTo: Int!
  ):Author

  createUser(
    username: String!
    favoriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token
}
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    // "id": "6607d25266c6c2c606d674bf",
    // "name": "Robert Martin"

    // bookCount: async () => Book.collection.countDocuments({ published: {$gt: 2000}}),
  //   bookCount: async () => Book.collection.aggregate([
  //     { $match: { published: {$gt: 2000}} },
  //     { $group: { _id: null, n: { $sum: 1 } } }
  //  ]),

    // bookCount: async () => Book.collection.countDocuments({ title: {$eq: 'Clean Code'}}),
    // bookCount: async () => Book.collection.countDocuments({ genres: {$eq: 'design'}}),
    // bookCount: async () => Book.collection.countDocuments({ genres: {$all: ['agile', 'design']}}),

    bookCount: () => Book.collection.countDocuments(),

    allBooks: async (_root, args) => {
      const crit = {}
        if(args.author){
          const author = await Author.findOne({ name: args.author })
          crit.author = author._id
        }
        if(args.genre)
          crit.genres = args.genre
        // find({ genres: { $all: ['agile', 'patterns'] } })  -  [..., ...]
        // find({ genres: { sub: 'agile'} })  -  [{},{}]
        // find({ 'genres.sub': 'agile'})  -  [{},{}]
        // https://www.mongodb.com/docs/manual/tutorial/query-array-of-documents/
        // https://www.mongodb.com/docs/manual/tutorial/query-arrays/

      let res = await Book.find(crit).populate('author')
      return res
    },
    allAuthors: async () => Author.find({}),
    me: (_root, _args, context) => {
      return context.currentUser
    }
  },
  Author: {
    // name: (root) => "root.name"
    // bookCount: async (root) => Book.collection.countDocuments({ author: {$eq: root.name} })
    bookCount: async (root) => Book.find({ author: root._id}).countDocuments()
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
      try {
        await book.save()
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
    addA: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.author })
      const author2 = { id: author._id, name: author.name, born: author.born}
      console.log('author', author)
      console.log('author2', author2)
      const book = new Book({...args, author: author._id})
      // console.log('book', book)
      // try {
      //   await book.save()
      // } catch (error) {
      //   throw new GraphQLError('Saving book failed', {
      //     extensions: {
      //       code: 'BAD_USER_INPUT',
      //       invalidArgs: args.name,
      //       error
      //     }
      //   })
      // }

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})