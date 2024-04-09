import { gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
query AllAuthors {
  allAuthors {
    name
    id
    born
  }
}
`

export const ALL_BOOKS = gql`
query AllBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    title
    published
    author {
      name
      born
      id
    }
    id
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    id
    genres
    author {
      name
      born
      id
    }
  }
}
`

export const EDIT_BIRTH_YEAR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    id
    born
    bookCount
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`

export const USER = gql`
query Query {
  me {
    id
    favoriteGenre
    username
  }
}
`
export const NEWA = gql`
mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addA(title: $title, published: $published, author: $author, genres: $genres)
}
`