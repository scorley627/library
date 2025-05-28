const library = [];

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180);
addBookToLibrary("The Old Man and the Sea", "Ernest Hemingway", 96);
addBookToLibrary("The Metamorphosis", "Franz Kafka", 201);
addBookToLibrary("The Grapes of Wrath", "John Steinbeck", 496);
addBookToLibrary("Dracula", "Bram Stoker", 488);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 366);
addBookToLibrary("Anna Karenina", "Leo Tolstoy", 964);
addBookToLibrary("The Adventures of Huckleberry Finn", "Mark Twain", 327);

document.addEventListener("DOMContentLoaded", displayLibrary);

function addBookToLibrary(title, author, numPages) {
  const newId = crypto.randomUUID();
  const newBook = new Book(newId, title, author, numPages);
  library.push(newBook);
}

function Book(id, title, author, numPages) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.numPages = numPages;
}

function displayLibrary() {
  const body = document.querySelector("body");
  for (const book of library) {
    const card = document.createElement("div");
    const title = document.createElement("h1");
    const author = document.createElement("h2");
    const numPages = document.createElement("h3");

    title.textContent = book.title;
    author.textContent = "by " + book.author;
    numPages.textContent = book.numPages + " pages";

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(numPages);
    body.appendChild(card);
  }
}
