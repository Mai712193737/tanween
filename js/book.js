function updateBookInformation(book) {
    if (book) {
        document.title = book.title;
        document.getElementById('book-title').textContent = book.title;
        document.getElementById('book-author').textContent = book.author;
        document.getElementById('book-cover').src = `/assets/covers/${book.cover}`;
        document.getElementById('book-description').textContent = book.description;
    } else {
        document.getElementById('book-container').innerHTML = "<h1>Book not found!</h1>";
    }
}


function updateBookAuthor(book,) {
    fetch('/data/authors.json')
        .then(response => response.json())
        .then(authors => {
            const author = authors.find(element => element.name == book.author)

            document.getElementById('author-name').textContent = author.name;
            document.getElementById('name').textContent = author.name
            document.getElementById('author-about').textContent = author.about;

            document.getElementById('more').addEventListener('click', () => {
                window.location.href = `/pages/author.html?author=${book.author}`;
            })

        })
        .catch(error => console.error('Error loading book:', error));
}


function createBookPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    fetch('/data/books.json')
        .then(response => response.json())
        .then(books => {
            const book = books.find(element => element.id == bookId);
            updateBookInformation(book);
            updateBookAuthor(book)

        })
        .catch(error => console.error('Error loading book:', error));
}


document.addEventListener('DOMContentLoaded', createBookPage());
