function extractText() {
    const text =
        $('ul#items li')
            .toArray()
            .map(e => e.textContent)
            .join(', ')

    $('div#result').text(text);
}