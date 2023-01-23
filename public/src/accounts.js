function findAccountById(accounts = [], id = "") {
  // Takes in an array of account objects and an id string value
  return accounts.find((account) => account.id === id); // returns the object with the matching id
}

function sortAccountsByLastName(accounts = []) {
  // Takes in an array of account objects
  accounts.sort(
    (accountA, accountB) =>
      accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase()
        ? 1
        : -1 // Sorts the accounts array by last name, descending
  );
  return accounts; // Returns the sorted array of account objects
}

function getTotalNumberOfBorrows(account = {}, books = []) { // Takes in an account object and the books array
  let borrowsCount = 0; // Initializes an accumulator at 0
  books.forEach((book) => { // Loops through books
    book.borrows.forEach((borrow) => { // Loops through books.borrows
      if (account.id === borrow.id) { // Sets a condition
        borrowsCount += 1; // If condition is met, add 1 to the accumulator
      }
    });
  });
  return borrowsCount; // Return the accumulator
}

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  let booksPossessed = [];
  books.forEach((book) => {
    let borrowed = book.borrows;
    if (
      borrowed.find(
        (borrow) => borrow.id === account.id && borrow.returned === false
      )
    ) {
      booksPossessed.push(book);
    }
  });
  booksPossessed.forEach((book) => {
    let author = authors.find((author) => author.id === book.authorId);
    book["author"] = author;
  });
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
