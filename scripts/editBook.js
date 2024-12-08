import {
  library,
  getBook,
  updateLibrary,
  setLibraryToStorage,
  allBooks,
} from "../scripts/data/books.js";

console.log(library);

const bookId = JSON.parse(localStorage.getItem("bookForEdit"));
const book = getBook(bookId);

if (!book) {
  alert("Không tìm thấy sách này");
  window.location.href = "../templates/index.html";
} else {
  document.getElementById("title").value = book.title.trim();
  document.getElementById("subtitle").value = book.other_title.trim();
  document.getElementById("author").value = book.authors.map(author => author.trim()).join(", ");
  document.getElementById("description").value = book.description.trim();
}


document.getElementById("bookForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const other_title = document.getElementById("subtitle").value;
  const authors = document.getElementById("author").value.split(", ");
  const description = document.getElementById("description").value;

  if (!title || !other_title || authors.length < 1 || !description) {
    alert("Thông tin chưa đủ, yêu cầu nhập lại");
  } else {
    console.log("Đang gửi thông tin");
    fetch("http://127.0.0.1:5000/updateBook", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bookId: bookId,
        title: title,
        other_title: other_title,
        authors: authors,
        description: description,
      })
    })
      .then((response) => {
        updateLibrary();
        window.location.href = "../templates/index.html";
        return response.text;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});