class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.room = room;
        this.shelfGenre = shelfGenre;
        this.shelfCapacity = +shelfCapacity;
        this.shelf = [];
    }

    set room(room) {
        const possibleRooms = ['livingRoom', 'bedRoom', 'closet'];
        if (possibleRooms.indexOf(room) < 0) {
            throw new Error(`Cannot have book shelf in ${room}`);
        }
        this._room = room;
    }

    get room() {
        return this._room;
    }

    addBook(bookName, bookAuthor, genre = '') {
        if (this.shelf.length === this.shelfCapacity) {
            this.shelf.shift();
        }

        let newBook = {
            bookName: bookName,
            bookAuthor: bookAuthor,
            genre: genre
        };

        this.shelf.push(newBook);
        this._sortAlphabeticallyShelf();

        return this;
    }

    _sortAlphabeticallyShelf() {
        this.shelf.sort((a, b) => {
            return a.bookAuthor.localeCompare(b.bookAuthor);
        });
    }

    throwAwayBook(bookName) {
        // this.shelf = this.shelf.filter(x => x.bookName !== bookName);
        const elementIndex =
            this.shelf
                .map(e => e.bookName)
                .indexOf(`${bookName}`);

        if (elementIndex > -1) {
            this.shelf.splice(elementIndex, 1);
        }
    }

    showBooks(genre) {
        const searchedBooks = this.shelf
            .filter(b => b.genre === genre)
            .map(b => `\uD83D\uDCD6 ${b.bookAuthor} - "${b.bookName}"`)
            .join('\n');

        return `Results for search "${genre}":\n${searchedBooks}`;
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length;
    }

    toString() {
        const books = this.shelf
            .map(b => `\uD83D\uDCD6 "${b.bookName}" - ${b.bookAuthor}`)
            .join('\n');

        return this.shelf.length === 0
            ? `It's an empty shelf`
            : `"${this.shelfGenre}" shelf in ${this.room} contains:\n${books}`
    }
}

let livingRoom = new BookCollection("Programming", "livingRoom", 5);
livingRoom.addBook("Introduction to Programming with C#", "Svetlin Nakov");
livingRoom.addBook("Introduction to Programming with Java", "Svetlin Nakov");
livingRoom.addBook("Programming for .NET Framework", "Svetlin Nakov");
console.log(livingRoom.toString());
livingRoom.throwAwayBook('Introduction to Programming with C#');
console.log(livingRoom.toString());

try {
    let garden = new BookCollection("Programming", "garden");
} catch (ex) {
    console.log(ex.message);
}

let bedRoom = new BookCollection('Mixed', 'bedRoom', 5);
bedRoom.addBook("John Adams", "David McCullough", "history");
bedRoom.addBook("The Guns of August", "Cuentos para pensar", "history");
bedRoom.addBook("Atlas of Remote Islands", "Judith Schalansky");
bedRoom.addBook("Paddle-to-the-Sea", "Holling Clancy Holling");
console.log("Shelf's capacity: " + bedRoom.shelfCondition);
console.log(bedRoom.showBooks("history"));
