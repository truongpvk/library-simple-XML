export let library = JSON.parse(localStorage.getItem("library"));

if (!library) {
  library = [];
}

export function setLibraryToStorage() {
  localStorage.setItem("library", JSON.stringify(library));
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

export function getContent(bookId, chapterId) {
  library.forEach((book) => {
    if (book.bookId === bookId) {
      book.chapters.forEach((chapter) => {
        if (chapter.id === chapterId) {
          return {
            chapter_title: chapter.title,
            content: chapter.content
          };
        }
      })
    }
  });

  return undefined;
}

export function removeBook(bookId) {
  
}

// Lấy dữ liệu từ xml
fetch("../data/books.xml")
  .then(response => response.text())
  .then(xmlString => {
    const xmlDocuments = new DOMParser().parseFromString(xmlString, "text/xml");
    const books = xmlDocuments.querySelectorAll("book");

    books.forEach((book) => {
      let bookId = book.getAttribute("bookId");
      let isMatch = false;
      library.forEach((item) => {
        if (bookId === item.bookId) {
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

        library.push(bookItem);
        setLibraryToStorage();
      }
    });
  });
