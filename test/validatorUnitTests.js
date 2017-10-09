var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Validator = require('../src/validator');

describe("Validator", function () {

    var validator = null;

    beforeEach(function () {
        // runs before each test in this block
        validator = new Validator();
    });

    describe('is valid query function',function(){
        it('valid query deberia devolver false para query malaquery', function(){
            assert(validator.isValidInput('malaquery') === false)
        });
        it('valid query deberia devolver true para query buena(query)', function (){
            assert(validator.isValidInput('buena(query)') === true)
        });
        it('valid query deberia devolver true para query buena(query,bonita)', function (){
            assert(validator.isValidInput('buena(query,bonita)') === true)
        });
    });

    describe('is valid fact function',function(){
        it('is valid input with varon(juan) parameter should return true.', function(){
            assert(validator.isValidInput('varon(juan)') === true)
        });
        it('is valid input with padre(roberto, cecilia) parameter should return true.', function(){
            assert(validator.isValidInput('padre(roberto, cecilia)') === true)
        });
        it('is valid input with hija(X, Y) :- mujer(X), padre(Y, X) parameter should return false.', function(){
            assert(validator.isValidInput('hija(X, Y) :- mujer(X), padre(Y, X)') === false)
        });
    });

    describe('is valid rule function',function(){

        it('is valid fact with hija(X, Y) :- mujer(X), padre(Y, X) parameter should return true.', function(){
            assert(validator.isValidRule('hija(X, Y) :- mujer(X), padre(Y, X)') === true)
        });
        it('is valid fact with hija(X, Y) : mujer(X), padre(Y, X) parameter should return false.', function(){
            assert(validator.isValidRule('hija(X, Y) : mujer(X), padre(Y, X)') === false)
        });
        /*
         it('is valid fact with hija(X, Y) :- mujer(x parameter should return false.', function(){
         assert(interpreter.isValidRule('hija(X, Y) :- mujer(x') === false)
         });*/
    });
});
