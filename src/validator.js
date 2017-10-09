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
    * Returns true if query parameters size are equals that rule parameter
    * quantity. */
    this.validateParameters = function (queryParameters,rulesParameters) {
        if ( queryParameters.length !== rulesParameters.length) {
            throw new Error("Query parameters are invalid.");
        }
    }
};

module.exports = Validator;