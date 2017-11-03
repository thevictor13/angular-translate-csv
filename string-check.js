module.exports = {
    isNullOrWhitespace: isNullOrWhitespace
}

function isNullOrWhitespace(input) {
    if (typeof input === 'undefined' || input == null) return true;
    return input.replace(/\s/g, '').length < 1;
}
