const library = [];

function Book(id, title, author, numPages, haveRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.haveRead = haveRead;
}

Book.prototype.getSurname = function () {
  const author = this.author.split(" ");
  let surname = author.at(-1);
  if (surname.toLowerCase().includes("jr")) {
    surname = author.at(-2);
  }
  return surname;
};

Book.toggleHaveRead = function (bookID) {
  for (const book of library) {
    if (book.id == bookID) {
      book.haveRead = !book.haveRead;
      return;
    }
  }
};

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 366, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Anna Karenina", "Leo Tolstoy", 964, false);
addBookToLibrary("Dracula", "Bram Stoker", 488, true);
addBookToLibrary("The Metamorphosis", "Franz Kafka", 201, true);
addBookToLibrary("The Old Man and the Sea", "Ernest Hemingway", 96, true);
addBookToLibrary("The Grapes of Wrath", "John Steinbeck", 496, false);
addBookToLibrary("The Adventures of Huckleberry Finn", "Mark Twain", 327, true);

document.addEventListener("DOMContentLoaded", displayLibrary);
document.addEventListener("click", handleClick);

function addBookToLibrary(title, author, numPages, haveRead) {
  const newId = crypto.randomUUID();
  const newBook = new Book(newId, title, author, numPages, haveRead);

  let i = 0;
  let added = false;
  const newSurname = newBook.getSurname();
  while (i < library.length && !added) {
    const currentSurname = library[i].getSurname();
    if (newSurname.localeCompare(currentSurname) == -1) {
      library.splice(i, 0, newBook);
      added = true;
    } else {
      ++i;
    }
  }

  if (!added) {
    library.push(newBook);
  }
}

function removeBookFromLibrary(bookID) {
  let i = 0;
  while (library[i].id != bookID) {
    ++i;
  }
  library.splice(i, 1);
  displayLibrary();
}

function displayLibrary() {
  const bookCardArea = document.querySelector(".book-card-area");
  bookCardArea.replaceChildren();
  for (const book of library) {
    const card = document.createElement("div");
    const title = document.createElement("h1");
    const author = document.createElement("h2");
    const numPages = document.createElement("h3");
    const removeButton = document.createElement("button");
    const readButton = document.createElement("button");

    card.className = book.haveRead
      ? "book-card book-card--read"
      : "book-card book-card--unread";
    title.textContent = book.title;
    author.textContent = "by " + book.author;
    numPages.textContent = book.numPages + " pages";
    removeButton.className = "book-card__remove-button";
    removeButton.textContent = "Remove";
    removeButton.dataset.bookID = book.id;
    readButton.className = book.haveRead
      ? "book-card__read-button book-card__read-button--unread"
      : "book-card__read-button book-card__read-button--read";
    readButton.textContent = book.haveRead ? "Unread" : "Read";
    readButton.dataset.bookID = book.id;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(numPages);
    card.appendChild(removeButton);
    card.appendChild(readButton);
    bookCardArea.appendChild(card);
  }
}

function handleClick(event) {
  const isNewBookButton = event.target.className.includes("new-book-button");
  const isDialogCloseButton = event.target.className.includes(
    "new-book-dialog__close-button"
  );
  const isRemoveBookButton = event.target.className.includes(
    "book-card__remove-button"
  );
  const isReadButton = event.target.className.includes(
    "book-card__read-button"
  );
  const isDialogSubmitButton =
    event.target ==
    document.querySelector(".new-book-form button[type=submit]");

  if (isNewBookButton) {
    showNewBookDialog();
  } else if (isDialogCloseButton) {
    closeNewBookDialog();
  } else if (isDialogSubmitButton) {
    event.preventDefault();
    submitNewBook();
  } else if (isRemoveBookButton) {
    removeBookFromLibrary(event.target.dataset.bookID);
  } else if (isReadButton) {
    Book.toggleHaveRead(event.target.dataset.bookID);
    displayLibrary();
  }
}

function showNewBookDialog() {
  const bookDialog = document.querySelector(".new-book-dialog");
  bookDialog.showModal();
}

function closeNewBookDialog() {
  const bookDialog = document.querySelector(".new-book-dialog");
  const bookForm = document.querySelector(".new-book-form");
  bookDialog.close();
  bookForm.reset();
}

function submitNewBook() {
  const titleField = document.getElementById("title");
  const authorField = document.getElementById("author");
  const numPagesField = document.getElementById("num_pages");
  const haveReadField = document.getElementById("have_read");

  const title = titleField.value;
  const author = authorField.value;
  const numPages = Number(numPagesField.value);
  const haveRead = haveReadField.checked;

  addBookToLibrary(title, author, numPages, haveRead);
  closeNewBookDialog();
  displayLibrary();
}
