function getTotalBooksCount(books = []) {
  // Takes in an array of books
  let totalBooks = 0; // Creates an accumulator variable
  books.forEach((book) => (totalBooks += 1)); // Loops through books and adds 1 to the accumulator for each book
  return totalBooks; // Returns the accumulator
}

function getTotalAccountsCount(accounts = []) {
  // Takes in an array of accounts
  let totalAccounts = 0; // Creates an accumulator variable
  accounts.forEach((book) => (totalAccounts += 1)); // Loops through accounts and adds 1 to the accumulator for each book
  return totalAccounts; // Returns the accumulator
}

function getBooksBorrowedCount(books = []) {
  // Takes in an array of books
  let borrowedBooks = books.filter(
    // Creates a new array (borrowedBooks)
    (book) =>
      book.borrows.filter((transaction) => transaction.returned === false)
        .length > 0 // Filters through the borrows array to find the transactions where returned is equal to false
  );
  return borrowedBooks.length; // Returns a number equal to the length of borrowedBooks
}

function sortingHelper(objectToSort = {}) {
  // This helper functions assists in sorting the array in getMostCommonGenres.
  return Object.keys(objectToSort).sort((left, right) => {
    if (objectToSort[left] < objectToSort[right]) return 1;
    if (objectToSort[left] > objectToSort[right]) return -1;
    return 0;
  });
}

function getMostCommonGenres(books = []) {
  // Takes in an array of books
  let mostCommonGenres = books.reduce((state, book) => {
    // Creates a new array (mostCommonGenres)
    if (!state[book.genre]) {
      state[book.genre] = 0;
    }
    // Uses reduce to count book genres and returns an array with objects
    state[book.genre] += 1;
    return state;
  }, {});

  let sorted = sortingHelper(mostCommonGenres); // Calls sotringHelper to sort the array

  let mappedSort = sorted.map((genre) => {
    // Uses map to update the array to the correct shape
    return {
      name: genre,
      count: mostCommonGenres[genre],
    };
  });

  return mappedSort.slice(0, 5); // Slices the array so it doesn't contain more than 5 elements, then returns the correctly formatted array
}

function getMostPopularBooks(books = []) {
  return books
    .map((book) => {
      return { name: book.title, count: book.borrows.length };
    })
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .slice(0, 5);
}

function getMostPopularAuthors(books = [], authors = []) {
  // Takes in 2 arrays: One of book objects, the other of author objects
  let mostPopularAuthors = []; // Creates a result array
  authors.forEach((author) => { // Loops through authors and creates an array of appropriately formatted objects
   let formattedAuthorObject = {
    name: `${author.name.first} ${author.name.last}`,
    count: 0 // Initializes count to 0
   };
   books.forEach((book) => { // Loops through books and updates the value of count for each author to add their borrowed book counts
    if (book.authorId === author.id) {
     formattedAuthorObject.count += book.borrows.length;
    }
   });
   mostPopularAuthors.push(formattedAuthorObject); // Pushes the newly formatted objects into the result array
  });
  return mostPopularAuthors.sort((a, b) => b.count - a.count).slice(0, 5); // Returns a sorted and spliced version of the result array
 }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
