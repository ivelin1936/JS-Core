(function () {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this.toString()
        }
        return this.toString()
    };

    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
           return this.toString() + str;
        }
        return this.toString();
    };

    String.prototype.isEmpty = function () {
        return this.toString() === '';
    };

    String.prototype.truncate = function (n) {
        if (this.length <= n) {
            return this.toString()
        }
        if (n < 4) {
            return '.'.repeat(n)
        }

        if (!this.includes(' ')) {
            return this.slice(0, n - 3) + '...'
        }

        let tokens = this.split(' ');
        let result = tokens[0];

        for (let i = 1; i < tokens.length; i++) {
            if (result.length + tokens[i].length + 4 > n) {
                return result + '...'
            }
            result += ' ' + tokens[i]
        }
    };

    String.format = function (string, ...params) {
        for (let i = 1; i < arguments.length; i++) {
            string = string.replace('{' + (i - 1) + '}', arguments[i]);
        }

        return string;
    };
})();

let str = 'string';
str = str.ensureStart('my');
str = str.ensureStart('hello ');
str = str.truncate(16);
str = str.truncate(14);
str = str.truncate(8);
str = str.truncate(4);
str = str.truncate(2);
str = String.format('The {0} {1} fox', 'quick', 'brown');
str = String.format('jumps {0} {1}', 'dog');
