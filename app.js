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
  // Check if there is a local storage for books
  static #checkStorage() {
    return localStorage.getItem('books');
  }

  // Get all the books Infos from the local storage
  static getBooks() {
    let books = [];
    if (Store.#checkStorage()) {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  // Save a book in local storage
  static saveBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  // Delete a book in local storage
  static unSaveBook(title) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// AppBook Class: Handle AppBook Tasks
class AppBook {
  // Display books to the screen
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => AppBook.addBookToList(book));
  }

  // Display one book to the screen
  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><button type='submit' class='btn'>Remove</button></td>
        `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('btn')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.forms[0].reset();
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', AppBook.displayBooks);

// Event: Add a Book
document.querySelector('#addBtn').addEventListener('click', (e) => {
  // Prevent actual
  e.preventDefault();

  // Get form values
  const title = document.forms[0].title.value;
  const author = document.forms[0].author.value;

  // Validation Check
  if (title === '' || author === '') {
    window.alert('Please Fill out both fields!!');
  } else {
    // Instantiate book
    const book = new Book(title, author);

    // save the book in local storage
    Store.saveBook(book);

    // Display book to the Screen
    AppBook.addBookToList(book);

    // Clear fields
    AppBook.clearFields();
  }
});

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from AppBook
  AppBook.deleteBook(e.target);

  // Remove book from store
  Store.unSaveBook(
    e.target.previousElementSibling.previousElementSibling.textContent
  );
});
