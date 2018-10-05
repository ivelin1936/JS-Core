function printExpressionSplit (expression) {
    console.log(expression
        .split(/[\s().,;]/g)
        .filter(e => e !== '')
        .join('\n')
    );
}

printExpressionSplit('let sum = 4 * 4,b = "wow";');
console.log('*'.repeat(25));
printExpressionSplit('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}');