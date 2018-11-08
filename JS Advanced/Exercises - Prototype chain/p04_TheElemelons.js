function solve() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new Error('Abstract class cannot be instantiated directly');
            }
            this.weight = +weight;
            this.melonSort = melonSort;
            this._element = '';
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }

        toString() {
            let output = `Element: ${this._element}\n`;
            output += `Sort: ${this.melonSort}\n`;
            output += `Element Index: ${this.elementIndex}`;

            return output;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._element = 'Water';
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._element = 'Fire';
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._element = 'Earth';
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._element = 'Air';
        }
    }

    class Melolemonmelon extends Watermelon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this._elements = ['Water', 'Fire', 'Earth', 'Air'];
            this.morph();
        }

        morph() {
            let current = this._elements.shift();
            this._element = current;
            this._elements.push(current);
        }
    }

    return {
        Melon: Melon,
        Watermelon: Watermelon,
        Firemelon: Firemelon,
        Earthmelon: Earthmelon,
        Airmelon: Airmelon,
        Melolemonmelon: Melolemonmelon
    };
}