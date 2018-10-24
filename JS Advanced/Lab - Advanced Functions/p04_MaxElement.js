function max(arguments) {
    const maxElement = arr => Math.max.apply(null, arguments);

    return maxElement();
}

console.log(max([10, 20, 5]));