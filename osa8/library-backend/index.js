const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
/* const uuid = require('uuid/v1') */
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = 'super_seekret_key'

/* let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
] */

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

/* let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
] */

mongoose.set('useFindAndModify', false)

//MUISTA VAIHTAA
//MUISTA VAIHTAA
//MUISTA VAIHTAA
//MUISTA VAIHTAA
const MONGODB_URI = 'mongodb+srv://dbAccess:fsmAccess@cluster0-rqrmq.mongodb.net/library-app?retryWrites=true&w=majority'

console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected')
  })
  .catch((error) => {
    console.log('error connecting:', error.message)
  })


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
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
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    hello: () => { return "world" },
    /* bookCount: () => (books.length),
    authorCount: () => (Author.find), */
    bookCount: async () => {
      b = await Book.find({})
      return b.length
    },
    authorCount: async () => {
      a = await Author.find({})
      return a.length
    },
    allBooks: (root, args) => {
      /* let filteredBooks = books */
      /* if(args.author) {
        filteredBooks = filteredBooks.filter(b => b.author === args.author)
      } */
      if(args.genre) {
        /* filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre)) */
        return Book.find({ genres: args.genre }).populate('author', { name: 1, born: 1 })
      }
      /* return filteredBooks */
      return Book.find({}).populate('author', { name: 1, born: 1 })
    },
    /* allAuthors: () => (authors) */
    allAuthors: () => (Author.find({})),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    /* bookCount: (root) => (
      books.filter(b => b.author === root.name).length
    ) */
    bookCount: async (root) => {
      b = await Book.find({ author: root })
      return b.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      /* const book = { ...args, id: uuid()}
      books = books.concat(book)
      if(!authors.find(a => a.name === args.author)){
        const author = { name: args.author, id: uuid()}
        authors = authors.concat(author)
      }
      return book */
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.author })
      if(!author){
        author = new Author({ name: args.author })
        try{
          await author.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
      const book = new Book({...args, author })
      try {
        await book.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book})

      return book
    },
    editAuthor: async (root, args, context) => {
      /* const author = authors.find(a => a.name === args.name)
      if(!author){
        return null
      }

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor */
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save()
        .catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if(!user || args.password !== '123') { 
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})