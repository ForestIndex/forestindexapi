module.exports = () => {
    Array.prototype.matchVals = function(arr2) {
        const result = [];
        this.sort();
        arr2.sort();
        for (let i = 0; i < this.length; i++) {
            if (arr2.indexOf(this[i])) {
                result.push(this[i]);
            }
        }
        return result;
    };
};
