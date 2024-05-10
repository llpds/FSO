import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id
  title
  published
  genres
  author {
    name
    born
    id
  }
}
`

export const ALL_AUTHORS = gql`
query AllAuthors {
  allAuthors {
    name
    id
    born
    bookCount
  } 
}
`

export const ALL_BOOKS = gql`
query AllBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
mutation Mutation($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
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

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`