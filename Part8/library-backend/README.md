library
    
  The server application stores information about authors and their books
    
  stack: GraphQl
- PartA
  - 8.1: The number of books and authors
      - queries bookCount and authorCount return the number of books and the number of authors.

        query {
          bookCount, authorCount
        }

  -  8.2, 8.3 AllBooks / authors

        query {
          allBooks { title, author, published, genres }
        }

        query {
          allAuthors { name, bookCount }
        }

  - 8.4: Books of an author
    - query allBooks  with optional parameter author

        query {
          allBooks(author: "Robert Martin") {
            title
          }
        }

  - 8.5: Books by genre
    - query allBooks with optional parameter genre, wokrs with both parameters: author, genres

        query {
          allBooks(genre: "refactoring") {
            title, author
          }
        }

  - 8.6: Adding a book
    - mutation addBook (new author will be saved in the list of authors)

        mutation {
          addBook(
            title: "Pimeyden tango",
            author: "Reijo Mäki",
            published: 1997,
            genres: ["crime"]
          ) {
            title,
            author
          }
        }

  - 8.7: Updating the birth year of an author
    - mutation editAuthor to set a birth year for an author
      (returns null if the author is not in the system)

        mutation {
          editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
            name
            born
          }
        }

 - partC
  - 8.13: Database, part 1 //ready to push github
    - saves data to mongo

        mutation {
          addAuthor(
            name: "...",
            born: ...
          ) {
            id,
            name,
            born
          }
        }

        mutation {
          addBook(
            title: "title2",
            published: 1872,
            author: "Fyodor Dostoevsky",
            genres: ["classic", "revolution"]
          ) {
            id,
            title,
            published,
            genres,
            author {
              name
              id
            }
          }
        }

  - 8.14: Database, part 2
    - other queries(allBooks with param: author and genre, field Author is not required) and mutations (!are completed)
      
      p.s. field author in allBook may be later, ti doesn't works now

  - 8.15 Database, part 3
    - database validation errors cause GraphQLError with a suitable error message.

  - 8.16 user and logging in
    - usermanagement
      - query: me,
      - mutations: createUser, login
        
        all users have the same hardcoded password
        addBook and editAuthor work only for logged users