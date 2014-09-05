'use strict';

/* jasmine specs for IO.js go here */

var IO = require('../../js/IO');

describe('IO', function() {

    var io;
    beforeEach(function() {
        io = new IO();
    });

    it('should have "null" data', function() {
        expect(io.data).toBe(null);
    });

    it('should have a project_base', function() {
        expect(io.project_base).toBe('http://projects.scratch.mit.edu/internalapi/project/');
    });

    it('should have a project_suffix', function() {
        expect(io.project_suffix).toBe('/get/');
    });

    it('should have an asset_base', function() {
        expect(io.asset_base).toBe('http://cdn.scratch.mit.edu/internalapi/asset/');
    });

    it('should have an asset_suffix', function() {
        expect(io.asset_suffix).toBe('/get/');
    });

    it('should have an soundbank_base', function() {
        expect(io.soundbank_base).toBe('soundbank/');
    });

    it('should have a spriteLayerCount', function() {
        expect(io.spriteLayerCount).toBe(0);
    });
});
