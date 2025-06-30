function filterBooksByGenre(books, genre) {
    const booksByGenre = [];
    books.forEach(book => {
        if (book.genre == genre) {
            booksByGenre.push(book);
        }
    });

    return booksByGenre;
}


function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.style.background = `
            linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%),
            url(/assets/covers/${book.cover})
            `;
    bookCard.style.backgroundSize = 'cover';
    bookCard.style.backgroundPosition = 'center';

    const titleElement = document.createElement('div');
    titleElement.className = 'book-title';
    titleElement.textContent = book.title;

    const authorElement = document.createElement('div');
    authorElement.className = 'book-author';
    authorElement.textContent = book.author;

    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);

    bookCard.addEventListener('click', () => {
        window.location.href = `/pages/book-page.html?id=${book.id}`;
    });

    return bookCard;
}


document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre');

    const container = document.getElementById('books-container');

    fetch('/data/books.json')
        .then(response => response.json())
        .then(data => {
            const books = filterBooksByGenre(data, genre);

            document.title = genre;

            document.getElementById('genre').textContent = genre;

            books.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))

            books.forEach(book => {
                const card = createBookCard(book);
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading books:', error);
            document.getElementById('container').innerHTML =
                '<p class="error">حدث خطأ في تحميل الكتب. يرجى المحاولة لاحقاً.</p>';
        });
});