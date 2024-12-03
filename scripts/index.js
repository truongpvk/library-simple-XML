import { library, removeBook, setLibraryToStorage } from "./data/books.js";

function createButtonElement(bookId) {
  const button_class = "btn hover:shadow-lg";
  const button_class_2 = "btn hover:bg-red-600 hover:text-white";

  const container = document.createElement("div");
  container.setAttribute("class", "button-container");
  container.setAttribute("data-book-id", bookId);
    const listBtn = document.createElement("button");
    listBtn.setAttribute("class", button_class + " list-chapter-btn");
    listBtn.textContent = "Danh sách chương";
    container.appendChild(listBtn);

    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", button_class + " edit-book-btn");
    editBtn.textContent = "Chỉnh sửa";
    container.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", button_class_2 + " remove-book-btn");
    removeBtn.textContent = "Xóa";
    container.appendChild(removeBtn);

  return container;
}

library.forEach((book) => {
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
  newBookCard.appendChild(newAnchor);
  newBookCard.appendChild(createButtonElement());
  
  document.querySelector(".books-container").appendChild(newBookCard);
  console.log(document.querySelector(".book-container"));
});

document.querySelectorAll(".book-card > a").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    event.preventDefault();

    const bookId = anchor.dataset.bookId;
    localStorage.setItem("bookForInfo", JSON.stringify(bookId));
    window.location.href = "../templates/info-book.html";
  })
});

document.querySelectorAll(".remove-book-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const bookId = button.parentElement.dataset.bookId;
    removeBook(bookId);
    location.reload();
  })
})
