class SortedList {
    constructor() {
        this.collection = [];
        this.size = 0;
    }

    add(element) {
        if (element === null || Number.isNaN(element)) {
            throw new Error('Passed element is not a number');
        }

        this.collection.push(element);
        this._sort();
        this.size = this.collection.length;
    }

    remove(index) {
        if (!Number.isInteger(index)
            || index < 0
            || index >= this.collection.length) {
            throw new Error('Incorrect index');
        }

        this.collection.splice(index, 1);
        this._sort();
        this.size = this.collection.length;
    }

    get(index) {
        if (!Number.isInteger(index)
            || index < 0
            || index >= this.collection.length) {
            throw new Error('Incorrect index');
        }

        return this.collection[index];
    }

    _sort() {
        this.collection = this.collection.sort((a, b) => a - b);
    }
}