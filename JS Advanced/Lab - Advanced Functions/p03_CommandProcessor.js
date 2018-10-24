// Without IIFE
function commandDispatcher(arguments) {
    let dispatcher = {
        str: '',
        append: function (inputStr) { this.str += inputStr },
        removeStart: function (n) { this.str = this.str.slice(Number(n)) },
        removeEnd: function (n) { this.str = this.str.substr(0, this.str.length - Number(n)) },
        print: function() { console.log(this.str) }
    };

    for (let line of arguments) {
        let [cmd, arg] = line.split(' ');
        dispatcher[cmd](arg)
    }
}

console.log('Without IIFE');
commandDispatcher(['append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print']
);

// Using IIFE
function commandProcessorWith_IIFE(commands) {
    let commandProcessor = (function () {
        let result = '';
        return {
            append: (str) => result += str,
            removeStart: (n) => result = result.slice(Number(n)),
            removeEnd: (n) => result = result.slice(0, result.length - Number(n)),
            print: () => console.log(result)
        }
    })();

    for (let cmd of commands) {
        let [cmdName, arg] = cmd.split(' ');
        commandProcessor[cmdName](arg);
    }
}

console.log('With IIFE');
commandProcessorWith_IIFE(['append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print']);