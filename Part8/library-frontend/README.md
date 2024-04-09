library-frontend

  Frontend side of the library application 

- 8.8: Authors view
    implemented router
    Author views shows the autors details

- 8.9: Books view
    Books view shows on a page all other details of all books except their genres

- 8.10: Adding a book
    functionality for adding new books

- 8.11 - 8.12: Authors birth year advanced

    change birth year only for excisting authors
    select not ready!

- partC
  - 8.17 Listing books
    List of books are fixed

  - 8.18 Log in
    login functionality
       authors and books pages are available to all
       add book and set birth year(authors) - only to a logged user

  - 8.19 Books by genre, part 1
      filter the book list by genre

  - 8.20 - 8.21 Books by genre, part 2
      recommend view shows all the books based on the logged-in user's favourite genre + graphQL query

  - 8.22 Up-to-date cache and book recommendations
      The book view is kept up to date.
      (if a book was added before selecting a genre and it is not in the cache, after changing the genre it will be in the list)