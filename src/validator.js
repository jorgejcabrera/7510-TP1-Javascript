var Validator = function(){

    /*
     * Returns true if row has valid rule format.
     * */
    this.isValidRule = function (row) {
        var isValid = row.match(/:-/g) !== null;
        if (isValid) {
            row.match(/[a-zA-Z]+\([^()]+\)/g).forEach(function(element){
                if (element.match(/^[a-zA-Z]+\([^()]+\)$/g) === null)
                    isValid =  false;
            });
        }
        return isValid;
    };

    /*
     * Returns true if input (row or query) has valid fact format.
     * */
    this.isValidInput = function (row) {
        var matches = row.match(/^[a-zA-Z]+\([^()]+\)$/g)
        return matches !== null;
    }

    /*
    * Returns true if query parameters size are equals than rule parameters
    * quantity. */
    this.areValidParameters = function (queryParameters,rulesParameters) {
        return queryParameters.length === rulesParameters.length;
    }
};

module.exports = Validator;