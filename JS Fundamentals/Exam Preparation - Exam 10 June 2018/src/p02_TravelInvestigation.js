function solve(inputArr) {
    let companiesDelimiter = inputArr[1];
    let companies = inputArr[0].split(companiesDelimiter).map(k => k.trim());

    let isValid = (sentence) => {
        for (let company of companies) {
            if (sentence.indexOf(company) < 0) {
                return false;
            }
        }
        return true;
    };

    let validSentences = inputArr.slice(2)
        .map(e => e.toLowerCase())
        .filter(s => isValid(s))
        .map((e, i) => `${i + 1}. ${e}`);

    let invalidSentences = inputArr.slice(2)
        .map(e => e.toLowerCase())
        .filter(s => !isValid(s))
        .map((e, i) => `${i + 1}. ${e}`);

    if (validSentences.length > 0) {
        console.log('ValidSentences');
        console.log(validSentences.join('\n'));
    }
    if (validSentences.length > 0 && invalidSentences.length > 0) {
        console.log('='.repeat(30));
    }
    if (invalidSentences.length > 0) {
        console.log('InvalidSentences');
        console.log(invalidSentences.join('\n'));
    }
}

solve([
    "bulgariatour@, minkatrans@, koftipochivkaltd",
    "@,",
    "Mincho e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
    "dqdo mraz some text but is KoftiPochivkaLTD MinkaTrans",
    "someone continues as no "
]);
solve([
    "bulgariatour@, minkatrans@, koftipochivkaltd",
    "@,",
    "Mincho  e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
    "We will koftipochivkaLTD travel e expenses no MinkaTrans mu e BulgariaTour",
    "dqdo BuLGariaTOUR mraz some text but is KoftiPochivkaLTD minkaTRANS"
]);