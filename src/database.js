var Validator = require('./validator')
var Parser = require('./parser')

class Database {

    constructor () {
        this._rules = [];
        this._facts = [];
        this._errors = [];
        this._parser = new Parser();
        this._validator = new Validator();
    }

    get rules () { return this._rules }
    set rules (rules) { this._rules = rules}
    get facts () { return this._facts }
    set facts (facts) { this._facts = facts}
    get errors () { return this._errors}
    set errors (errors) { this._errors = errors}
    hasErrors () { return this._errors.length !== 0}

    load(database) {
        for (var value of database) {
            var row = value.trim().replace(".", "");
            if (this._validator.isValidRule(row)) {
                this._rules.push(row);
            } else if (this._validator.isValidInput(row)) {
                this._facts.push(row);
            } else {
                this._errors.push(row);
            }
        }
    }

    findRule(query) {
        for (var rule of this._rules) {
            var queryRule = query.match(/^[a-zA-Z]+/);
            if (rule.match(new RegExp("^"+queryRule[0])))
                return rule;
        }
        return null;
    }

    buildFacts(rule,query) {
        var queryParams = this._parser.getParameters(query);
        var rulesParams = this._parser.getParameters(rule);
        if (!this._validator.areValidParameters(queryParams,rulesParams)) {
            throw new Error("Query parameters are invalid.");
        }
        for (var position in rulesParams){
            rule = rule.replace(new RegExp(rulesParams[position],'g'),queryParams[position]);
        }
        var allFacts = rule.match(/[^:-]+$/)
        return allFacts[0].match(/[a-z]+\([^()]+\)/g);
    }

    evaluateRule(query) {
        var rule = this.findRule(query);
        if (rule !== null) {
            var facts = this.buildFacts(rule,query);
            var intersection = this._facts.filter(function(n) { return facts.indexOf(n) > -1;});
            return intersection.length == facts.length;
        }
        return false
    }

    evaluateFact(fact) {
        return this._facts.includes(fact);
    }

    executeQuery(query) {
        return this.evaluateFact(query) || this.evaluateRule(query);
    }
}

module.exports = Database;