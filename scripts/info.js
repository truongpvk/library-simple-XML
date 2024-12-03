import { library } from "./data/books.js";

const bookId = JSON.parse(localStorage.getItem("bookForInfo"));
console.log(bookId);

library.forEach((book) => {
  if (book.bookId === bookId) {
    const header = document.querySelector("header");
      const newTitle = document.createElement("h2");
      newTitle.setAttribute("class", "book-title");
      newTitle.innerHTML = `${book.title} (<i>${book.other_title}</i>)`;
      header.appendChild(newTitle);

      const newAuthorList = document.createElement("div");
      newAuthorList.setAttribute("class", "authors flex space-x-5");
        book.authors.forEach((author) => {
          let newAuthor = document.createElement("h4");
          newAuthor.setAttribute("class", "book-author");
          newAuthor.textContent = author;
          newAuthorList.appendChild(newAuthor);
        });
      header.append(newAuthorList);

      const description = document.createElement("p");
      description.setAttribute("class", "book-description");
      description.textContent = book.description;
      header.appendChild(description);

    // Danh sách chương
    let chapters = "";
    book.chapters.forEach((chapter) => {
      let id = chapter.id;
      let title = chapter.title;
      chapters = chapters + `<a href="#" class="chapter-item" data-chapter-id="${id}">${title}</a>`
    });

    console.log(chapters);
    document.querySelector(".chapter-list").innerHTML = chapters;
  }
});

// Điều hướng chương
document.querySelectorAll(".chapter-item").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const chapterId = item.dataset.chapterId;
    localStorage.setItem("chapterForRead", JSON.stringify(chapterId));

    window.location.href = "../templates/book.html";
  });
});