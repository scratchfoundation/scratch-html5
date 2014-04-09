'use strict';

/* jasmine specs for IO.js go here */

describe('IO', function() {
    var io;

    beforeEach(function() {
        io = new IO();
    });

    it('should have "null" data', function() {
        expect(io.data).toBe(null);
    });

    it('should have a base', function() {
        expect(io.base).toBe(io_base);
    });

    it('should have a project_base', function() {
        expect(io.project_base).toBe(project_base);
    });

    it('should have a project_suffix', function() {
        expect(io.project_suffix).toBe(project_suffix);
    });

    it('should have an asset_base', function() {
        expect(io.asset_base).toBe(asset_base);
    });

    it('should have an asset_suffix', function() {
        expect(io.asset_suffix).toBe(asset_suffix);
    });

    it('should have an soundbank_base', function() {
        expect(io.soundbank_base).toBe(soundbank_base);
    });

    it('should have a spriteLayerCount', function() {
        expect(io.spriteLayerCount).toBe(spriteLayerCount);
    });
});
