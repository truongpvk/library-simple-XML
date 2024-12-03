import { library, getContent, getBook } from "./data/books.js";

let bookId = JSON.parse(localStorage.getItem("bookForInfo"));
let chapterId = JSON.parse(localStorage.getItem("chapterForRead"));
let book = getBook(bookId);
console.log(bookId);
const title = book.title;
let chapter = getContent(bookId, chapterId);
console.log(chapterId);

document.querySelector(".book-title").innerHTML = title;
document.querySelector(".chapter-title").innerHTML = chapter.title;
document.querySelector(".content > p").innerHTML = chapter.content;

// Chuyển chương
document.querySelector(".previous-chapter").addEventListener("click", (event) => {
  if (chapterId != 1) {
    localStorage.setItem("chapterForRead", JSON.stringify(parseInt(chapterId) - 1));
    location.reload();
  } else {
    alert("Đây là chương đầu tiên");
  }
});
console.log(book.chapters.length);
document.querySelector(".next-chapter").addEventListener("click", (event) => {
  if (!(chapterId == book.chapters.length)) {
    localStorage.setItem("chapterForRead", JSON.stringify(parseInt(chapterId) + 1));
    location.reload();
  } else {
    alert("Đây là chương cuối cùng")
  }

});