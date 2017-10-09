
class Parser {

    constructor(){}

    getParameters(query) {
        var response = [];
        var allParameters = query.match(/\([^()]+\)/);
        if (allParameters.length != 0) {
            response = allParameters[0].match(/[a-zA-Z]+/g);
        }
        return response;
    }
}

module.exports = Parser;