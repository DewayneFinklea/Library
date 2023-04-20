const { findAuthorById } = require("./books");

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  console.log(account);
  books.forEach((book) => {
    if (book.borrows)
      book.borrows.forEach(
        (borrower) => (count += borrower.id === account.id ? 1 : 0)
      );
  });
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  let checkedOut = books.filter((book) =>
    book.borrows.some((borrow) => !borrow.returned && borrow.id === account.id)
  );
  const result = [];
  checkedOut.forEach((book) => {
    const bookAuthor = findAuthorById(authors, book.authorId);
    result.push({
      id: book.id,
      title: book.title,
      genre: book.genre,
      authorId: book.authorId,
      author: bookAuthor,
      borrows: book.borrows,
    });
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
