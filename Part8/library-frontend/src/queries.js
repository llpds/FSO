import { gql} from '@apollo/client'

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
query AllBooks {
  allBooks {
    title
    published
    id
    author
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
    author
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