var Database = require('./database')
var Validator = require('./validator')

var Interpreter = function () {

    this.db;

    this.parseDB = function (database) {
        this.db = new Database();
        this.db.load(database);
        if (this.db.hasErrors()){
            throw new Error("Database has invalid rows.");
        }
    }

    this.checkQuery = function (query) {
        var validator = new Validator();
        if (validator.isValidInput(query)){
            return this.db.executeQuery(query);
        }
        return true;
    }
}

module.exports = Interpreter;
