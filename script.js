const library = []
const booksSection = document.querySelector("#books")

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? "already read." : "not read yet."}`        
    }
}

function addBookToLibrary(bookInformation) {
    const {title, author, pages, isRead} = bookInformation
    const book = new Book(title, author, pages, isRead)
    library.push(book)
    return library
}

function displayBooks() {
    for (let book in library) {
        const book = document.createElement("div")
        book.classList.add("book")
        booksSection.appendChild(book)
    }
}

for (let i = 0; i < 6; i++) {
    addBookToLibrary({title: "My Book", author: "Me", pages: 15, isRead: true})
}

displayBooks()
