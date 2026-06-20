String.prototype.toCapitalize = function (): string {
    // 3. Use String(this) to grab the value of the string calling the method
    return String(this)
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
