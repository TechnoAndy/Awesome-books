/* const collection = document.querySelector('.collection');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addBtn = document.querySelector('#addBtn');
let id = 1 || JSON.parse(localStorage.getItem('maxID'));

class BookObject {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static displayBooks = () => {
    collection.innerHTML = '';
    id = JSON.parse(localStorage.getItem('maxID'));
    const keys = Object.keys(localStorage);
    keys.forEach((element) => {
      if (element === 'maxID') return;
      const retrievedBook = JSON.parse(localStorage.getItem(element));
      this.createElements(retrievedBook.title, retrievedBook.author, element);
    });
  };

  static addBook = (title, author, id) => {
    this.createElements(title, author, id);
  };

  static createElements = (title, author, id) => {
    const remBtn = [];
    const div = [];
    div[id] = document.createElement('div');
    div[id].setAttribute('id', id);
    const pText = document.createElement('p');
    pText.textContent = `"${title}" by ${author}`;

    remBtn[id] = document.createElement('button');
    remBtn[id].setAttribute('id', id);
    remBtn[id].textContent = 'Remove';
    remBtn[id].addEventListener('click', (e) => {
      const key = e.target.id;
      div[e.target.id].remove();
      localStorage.removeItem(key);
      if (collection.innerHTML === '') {
        collection.style.border = 'none';
      }
    });
    div[id].append(pText, remBtn[id]);
    collection.appendChild(div[id]);
  };

  static storeLS = (book, id) => {
    localStorage.setItem(id, JSON.stringify(book));
  };

  static clearInputs = () => {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  };
} */

// Add Button Event
/* addBtn.addEventListener('click', () => {
  if (title.value === '' || author.value === '') {
    alert('Fields cannot be blank');
  } else {
    BookObject.addBook(title.value, author.value, id);
    const book = new BookObject(title.value, author.value, id);
    BookObject.storeLS(book, id);
    id += 1;
    localStorage.setItem('maxID', id);
    BookObject.clearInputs();
  }
});

window.onload = () => {
  BookObject.displayBooks();
  if (collection.innerHTML === '') {
    collection.style.border = 'none';
  }
}; */

//Book Class: Represents a book

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

// UI Class: Handle UI Tasks

class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list =document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <button type="submit" class="btn">Remove</button>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('btn')) {
            el.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }
 }

 // Store Class: Handles Storage
 class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.title === title) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
 }

 // Event: Display Books
 document.addEventListener('DOMContentLoaded', UI.displayBooks);

 // Event: Add a Book
 document.querySelector('#addBtn').addEventListener('click', (e) =>
 {

 // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    // Validate
    if(title === ''|| author === '') {
        alert('Please fill in all the fields');
    } else {
        // Instantiate book
        const book = new Book(title, author);

        // Add book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        // Clear fields
        UI.clearFields();
    }
});

 // Event: Remove a book
 document.querySelector('#book-list').addEventListener('click', (e) =>
 {
    // Remove book from UI
    UI.deleteBook(e.target)

    // Remove book from store
    Store.removeBook
    (e.target.parentElement.nextElementSibling.textContent);
 })