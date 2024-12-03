import { library } from "./books.js";

function createButtonElement() {
  const button_class = "btn hover:shadow-lg";
  const button_class_2 = "btn hover:bg-red-600 hover:text-white";

  const container = document.createElement("div");
  container.setAttribute("class", "button-container");
    const listBtn = document.createElement("button");
    listBtn.setAttribute("class", button_class);
    listBtn.textContent = "Danh sách chương";
    container.appendChild(listBtn);

    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", button_class);
    editBtn.textContent = "Chỉnh sửa";
    container.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", button_class_2);
    removeBtn.textContent = "Xóa";
    container.appendChild(removeBtn);

  return container;
}

console.log(library);

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
