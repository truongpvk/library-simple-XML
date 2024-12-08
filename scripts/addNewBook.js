import { updateLibrary } from "./data/books.js";

document.querySelector("button").addEventListener("click", (event) => {
  getBookInfo();
})

function getBookInfo() {
  const form = document.getElementById('bookForm');
  const title = form.elements['title'].value;
  const other_title = form.elements['subtitle'].value;
  const authors = form.elements['author'].value.split(",");
  const description = form.elements['description'].value;

  if (!title || !authors || !description) {
    alert('Chưa nhập đủ thông tin');
  } else {
    addNewBook(title, other_title, authors, description);
  }

}

function addNewBook(title, other_title, authors, description) {
  console.log("Here")
  fetch('http://127.0.0.1:5000/addBook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      other_title: other_title,
      authors: authors,
      description: description
    })
  })
    .then(response => {
      updateLibrary();
      window.location.href = "../templates/index.html";
      return response.text;
    })
    .then(data => console.log(data))
    .catch(error => console.log(error));
  updateLibrary();
  window.location.href = "../templates/index.html";

}