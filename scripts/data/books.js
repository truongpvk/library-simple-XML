export let library = JSON.parse(localStorage.getItem("library"));

if (!library) {
  library = [];
}

export function setLibraryToStorage(books) {
  if (!books) {
    console.log("Khong hop le khi luu vao Local");
  } else {
    localStorage.setItem("library", JSON.stringify(books));
  }
}

function sortObjectsByKey(list, key, ascending = true) {
  return list.sort((a, b) => {
    // Lấy giá trị của thuộc tính
    const valA = a[key];
    const valB = b[key];

    // So sánh giá trị
    if (valA < valB) return ascending ? -1 : 1;
    if (valA > valB) return ascending ? 1 : -1;
    return 0; // Bằng nhau
  });
}

export function getBook(bookId) {
  for (const book of library) {
    if (book.bookId === bookId) {
      return book;
    }
  }
  return null;
}

export function getChapters(bookId) {
  const book = getBook(bookId);
  if (!book) {
    return null;
  }
  return book.chapters;
}

export function getContent(bookId, chapterId) {
  let item;
  library.forEach((book) => {
    if (book.bookId === bookId) {
      book.chapters.forEach((chapter) => {
        if (chapter.id == chapterId) {
          item = {
            title: chapter.title,
            content: chapter.content
          };
        }
      })
    }
  });

  return item;
}

export function removeBook(bookId) {
  fetch('http://127.0.0.1:5000/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bookId: bookId })
  })
    .then(response => {
      updateLibrary();
      return response.json;
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });

}
// Lấy dữ liệu từ xml
export function updateLibrary() {
  let newLibrary = []
  fetch("../data/books.xml")
    .then(response => response.text())
    .then(xmlString => {
      const xmlDocuments = new DOMParser().parseFromString(xmlString, "text/xml");
      const books = xmlDocuments.querySelectorAll("book");
      console.log("Thẻ book đọc được từ XML: " + books);

      books.forEach((book) => {
        let bookId = book.getAttribute("bookId");
        let isMatch = false;
        newLibrary.forEach((item) => {
          if (bookId === item.bookId) {
            console.log("trùng lặp");
            isMatch = true;
          }
        })

        // Nếu sách chưa tồn tại trong danh sách
        if (!isMatch) {
          let bookItem = {
            bookId: bookId,
            datePublic: book.getAttribute("datepublic"),
            title: book.querySelector("title").textContent,
            other_title: book.querySelector("other-title").textContent,
            authors: [],
            description: book.querySelector("description").textContent,
            chapters: [],
          };

          // lấy các thông tin từ tag và attr
          const authors = book.querySelector("authors");
          authors.querySelectorAll("author").forEach((author) => bookItem.authors.push(author.textContent));

          const chapters = book.querySelector("chapters");
          chapters.querySelectorAll("chapter").forEach((chapter) => {
            let chapterItem = {
              id: parseInt(chapter.getAttribute("id")),
              datePublic: chapter.getAttribute("datepublic"),
              title: chapter.querySelector("chapter-title").textContent,
              content: chapter.querySelector("content").textContent,
            };
            bookItem.chapters.push(chapterItem);
          });

          // Sắp xếp các chương theo id
          bookItem.chapters = sortObjectsByKey(bookItem.chapters, "id");

          console.log(bookItem);

          newLibrary.push(bookItem);
        }
      });
      setLibraryToStorage(newLibrary);
    })
    .catch(err => console.log(err));
}

updateLibrary();
