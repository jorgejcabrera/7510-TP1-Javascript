var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Database = require('../src/database');

describe("Database", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var dbWithErrros = [
        "varon(ju.",
        "varon(pepe)."
    ];

    var database = null;
    var dbWithError = null;

    beforeEach(function () {
        // runs before each test in this block
        database = new Database();
        database.load(db);
        dbWithError = new Database();
        dbWithError.load(dbWithErrros);
    });

    describe('load database function', function () {

        it('load function should create 12 facts', function () {
            assert(database.facts.length === 12);
        });

        it('load function should create 2 rules', function () {
            assert(database.rules.length === 2);
        });
    });

    describe('load databases with errors function', function () {

        it('load database with error', function () {
            assert(dbWithError.hasErrors() == true);
        });

    });

});
