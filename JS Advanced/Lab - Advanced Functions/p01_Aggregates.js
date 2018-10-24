function solve(arguments) {
    const sum = arguments.reduce((a, b) => a + b);

    const min = arguments.reduce((a, b) => { return (a < b ? a : b); });
    const min2 = arguments.reduce(( acc, cur ) => Math.min( acc, cur ));

    const max = arguments.reduce((a, b) => { return (a > b ? a : b); });
    const max2 = arguments.reduce(( acc, cur ) => Math.max( acc, cur ));

    const product = arguments.reduce((a, b) => a * b);
    
    const joined = arguments.reduce(function(prevVal,currVal,idx){
        return idx === 0 ? currVal : prevVal + '' + currVal;
    }, '');

    console.log(sum);
    console.log(min);
    console.log(max);
    console.log(product);
    console.log(joined);
}

solve([2, 3, 10, 5]);
solve([5, -3, 20, 7, 0.5]);