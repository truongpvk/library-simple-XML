import { 
  allBooks, 
  library, 
  removeBook, 
  searchBookList, 
  setLibraryToStorage,
  sortObjectByString, 
  sortObjectByDate,
  sortObjectByUpdateDate
} from "./data/books.js";

function createButtonElement(bookId) {
  const button_class = "btn hover:shadow-lg";
  const button_class_2 = "btn hover:bg-red-600 hover:text-white";

  const container = document.createElement("div");
  container.setAttribute("class", "button-container");
  container.setAttribute("data-book-id", bookId);
  // Nút danh sách chương
  const listBtn = document.createElement("button");
  listBtn.setAttribute("class", button_class + " list-chapter-btn");
  listBtn.textContent = "Danh sách chương";
  listBtn.addEventListener("click", (event) => {
    localStorage.setItem("bookForInfo", JSON.stringify(bookId));
    window.location.href = "../templates/info-book.html";
  });
  container.appendChild(listBtn);

  // Nút chỉnh sửa sách
  const editBtn = document.createElement("button");
  editBtn.setAttribute("class", button_class + " edit-book-btn");
  editBtn.textContent = "Chỉnh sửa";
  editBtn.addEventListener("click", (event) => {
    localStorage.setItem("bookForEdit", JSON.stringify(bookId));
    window.location.href = "../templates/edit_book.html"
  });
  container.appendChild(editBtn);

  // Nút xóa sách
  const removeBtn = document.createElement("button");
  removeBtn.setAttribute("class", button_class_2 + " remove-book-btn");
  removeBtn.textContent = "Xóa";
  removeBtn.addEventListener("click", (event) => {
    removeBook(bookId);
    console.log("Đã xóa");
  });
  container.appendChild(removeBtn);

  return container;
}

function createNewBookCard(book) {
  const newBookCard = document.createElement("div");
  newBookCard.setAttribute("class", "book-card");

  const newAnchor = document.createElement("a");
  newAnchor.setAttribute("href", "#");
  newAnchor.setAttribute("data-book-id", book.bookId);

  const newTitle = document.createElement("h2");
  newTitle.setAttribute("class", "book-title");
  newTitle.innerHTML = `${book.title} (<i>${book.other_title}</i>)`;
  newAnchor.appendChild(newTitle);

  const newAuthorList = document.createElement("div");
  newAuthorList.setAttribute("class", "authors flex space-x-5");
  book.authors.forEach((author) => {
    let newAuthor = document.createElement("h4");
    newAuthor.setAttribute("class", "book-author");
    newAuthor.textContent = author;
    newAuthorList.appendChild(newAuthor);
  });
  newAnchor.append(newAuthorList);

  const description = document.createElement("p");
  description.setAttribute("class", "book-description");
  description.textContent = book.description;
  newAnchor.appendChild(description);

  newAnchor.addEventListener("click", (event) => {
    event.preventDefault();

    const bookId = newAnchor.dataset.bookId;
    localStorage.setItem("bookForInfo", JSON.stringify(bookId));
    window.location.href = "../templates/info-book.html";
  })

  newBookCard.appendChild(newAnchor);
  newBookCard.appendChild(createButtonElement(book.bookId));

  return newBookCard;
}

// Hiển thị các book card bao gồm tên, tác giả, giới thiệu và ba nút chức năng
export function loadPage() {
  let container = document.querySelector(".books-container");
  if (container.hasChildNodes()) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  console.log("Library trước khi hiển thị: ");
  console.log(library);

  if (library) {
    library.forEach((book) => {
      let bookCard = createNewBookCard(book);
      document.querySelector(".books-container").appendChild(bookCard);
    });
  }
}

// Tìm kiếm
document.getElementById("search-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    let searchString = event.target.value;
    let bookList = searchBookList(searchString);

    setLibraryToStorage(bookList);
    loadPage();
  }
})

// Sắp xếp
document.getElementById("filter-dropdown").addEventListener("change", (event) => {
  const selected = event.target.value;
  if (selected == 1) {
    const sortList = sortObjectByString(library);
    setLibraryToStorage(sortList);
    loadPage();
  } else if (selected == 2) {
    const sortList = sortObjectByDate(library);
    setLibraryToStorage(sortList);
    loadPage();
  } else if (selected == 3) {
    const sortList = sortObjectByUpdateDate(library);
    setLibraryToStorage(sortList);
    loadPage();
  } else {
    setLibraryToStorage(allBooks);
    loadPage();
  }
})

loadPage();

