function findAuthorById(authors = [], id = "") {
  // Takes in an array of author objects and an id string
  return authors.find((author) => author.id === id); // Returns the book object with the matching id
}

function findBookById(books = [], id = "") {
  // Takes in an array of books and an id string
  return books.find((book) => book.id === id); // Returns the book object with the matching id
}

function partitionBooksByBorrowedStatus(books = []) {
  // Takes in an array of books
  let borrowed = books.filter(
    (book) => book.borrows.some((borrow) => borrow.returned === false) // Creates a new array (borrowed) that contains books that have not been returned
  );
  let returned = books.filter(
    (book) => book.borrows.every((borrow) => borrow.returned === true) // Creates another array (returned) that contains books that have been returned
  );

  let partitionedArray = [[...borrowed], [...returned]]; // Combines all of borrowed and returned into two separate arrays inside of a larger array
  return partitionedArray; // Returns the partitionedArray
}

// For the Id in the passed in book object (book.borrows.id), push an object into the result array that contains the id of the book and it's returned key, as well as
// all of the info for the account that borrowed

function getBorrowersForBook(book = {}, accounts = []) {
  // Takes in a book object and an array of accounts
  return book.borrows // Returns the following
    .map((borrow) => { // Uses .map on book.borrows
      let account = accounts.find((account) => account.id === borrow.id); // Finds the corresponding account
      return { ...borrow, ...account }; // Returns all of book.borrows and all of the account info
    })
    .slice(0, 10); // Uses slice to ensure no more than 10 entries will be listed in the final result array
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
