function generateCollection() {
    return (function () {
        let storage = [];

        function getSize() {
            return storage.length;
        }

        function add(element) {
            storage.push(element);
            reSort();
        }

        function remove(index) {
            if (isValidIndex(index)) {
                storage.splice(index, 1);
                reSort();
            } else {
                throw new Error;
            }
        }

        function reSort() {
            storage = storage.sort((a, b) => a - b);
        }

        function isValidIndex(index) {
            return index >= 0 && index < storage.length;
        }

        function get(index) {
            if (isValidIndex(index)) {
                return storage[index];
            } else {
                throw new Error;
            }
        }

        let collection = {add, remove, get};
        collection.__defineGetter__("size", getSize);

        return collection;
    })();
}

//Mocha
let list = generateCollection();
console.log(list.hasOwnProperty('size'));
list.add(5);
// list.get(5);
console.log(list.get(0));