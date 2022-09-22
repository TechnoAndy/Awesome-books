/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */

// const listBtn = document.querySelector('#listBtn');
// const addNewBtn = document.querySelector('#addNewBtn');
// const contactBtn = document.querySelector('#contactBtn');

// const listSec = document.querySelector('.list');
// const addNewSec = document.querySelector('.addNew');
// const contactSec = document.querySelector('.contact');

/* const addBtn = document.querySelector('#addBtn'); */

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
        <td><button type='submit' class='btn btn-outline-dark'>Remove</button></td>
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
    e.target.parentElement.previousElementSibling.previousElementSibling
      .textContent,
  );
});

// !!! Single Page Application "showing and hiding section"
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const page = document.querySelector(
      `#${link.getAttribute('data-trigger')}`,
    );

    // remove current class from the one who have it.
    document.querySelector('.current').classList.remove('current');
    // add the current class to the current section
    page.classList.add('current');
  });
});

// !!! Time and Date
const time = document.querySelector('.time');
const date = document.querySelector('.date');

function formatTime(date) {
  const hour = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  let state;

  if (date.getHours() < 12) {
    state = 'am';
  } else {
    state = 'pm';
  }

  return `${hour.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${state}`;
}

function formatDate(date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  let state;

  switch (day) {
    case 1:
      state = 'st';
      break;
    case 2:
      state = 'nd';
      break;
    default:
      state = 'th';
      break;
  }

  return `${months[month]} ${day}${state} ${year},`;
}

setInterval(() => {
  const today = new Date();

  time.textContent = formatTime(today);
  date.textContent = formatDate(today);
}, 1000);
