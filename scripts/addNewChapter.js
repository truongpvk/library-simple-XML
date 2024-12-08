import { updateLibrary } from "./data/books.js";

const bookId = JSON.parse(localStorage.getItem("bookForInfo"));

document.querySelector("button").addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  addNewChapter(bookId, title, content);
});

function addNewChapter(bookId, title, content) {
  fetch("http://127.0.0.1:5000/addNewChapter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      bookId: bookId,
      title: title,
      content: content
    })
  })
    .then((response) => {
      updateLibrary();
      window.location.href = "../templates/info-book.html";
      return response.text;
    })
    .then((data) => {
      return data;
    })
    .catch(err => console.log(err));
}