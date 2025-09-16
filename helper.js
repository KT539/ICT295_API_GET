function isValidId(value) {
    return Number.isInteger(Number(value)) && Number(value) > 0;
}

function isValidDuration(duration) {
    return Number.isInteger(Number(duration)) && Number(duration) > 0 && Number(duration) < 144;
}

function isValidStarting_date(starting_date) {
    if (typeof starting_date === 'string' || starting_date instanceof Date) {
        const date = new Date(starting_date);
        return !isNaN(date.getTime());
    }
    return false;
}

export {isValidId, isValidStarting_date, isValidDuration};