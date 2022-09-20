/* eslint-disable max-classes-per-file */

// Book Class: Represents a book

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Store Class: Handles Storage
class Store {
  #checkStorage() {
    return localStorage.getItem('books');
  }

  static saveBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static unSaveBook(title) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

  static getBooks() {
    let books = [];
    if (this.#checkStorage()) {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }
}

// AppBook Class: Handle AppBook Tasks

// class AppBook {
//   // add book to screen
//   // remove book from screen
//   // add all books when page relode

//   static displayBook() {

//   }

//   static displayBooks() {
//     const books = Store.getBooks();

//     books.forEach((book) => AppBook.addBookToList(book));
//   }

//   static addBookToList(book) {
//     const list = document.querySelector('#book-list');

//     const row = document.createElement('tr');

//     row.innerHTML = `
//         <td>${book.title}</td>
//         <td>${book.author}</td>
//         <button type='submit' class='btn'>Remove</button>
//         `;

//     list.appendChild(row);
//   }

//   static deleteBook(el) {
//     if (el.classList.contains('btn')) {
//       el.parentElement.remove();
//     }
//   }

//   static clearFields() {
//     document.querySelector('#title').value = '';
//     document.querySelector('#author').value = '';
//   }
// }

// Event: Display Books
document.addEventListener('DOMContentLoaded', AppBook.displayBooks);

// Event: Add a Book
document.querySelector('#addBtn').addEventListener('click', (e) => {
  // Prevent actual
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Validate
  if (title === '' || author === '') {
    AppBook.showAlert('Please fill in all the fields');
  } else {
    // Instantiate book
    const book = new Book(title, author);

    // Add book to AppBook
    AppBook.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Clear fields
    AppBook.clearFields();
  }
});

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from AppBook
  AppBook.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(
    e.target.previousElementSibling.previousElementSibling.textContent
  );
});
