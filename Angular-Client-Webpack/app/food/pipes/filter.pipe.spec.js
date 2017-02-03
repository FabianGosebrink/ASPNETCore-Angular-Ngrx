"use strict";
var filter_pipe_1 = require('./filter.pipe');
describe('FilterPipe', function () {
    var filterPipe;
    // synchronous beforeEach
    beforeEach(function () {
        filterPipe = new filter_pipe_1.FilterPipe();
    });
    it('filterPipe should be instanciated', function () {
        expect(filterPipe).toBeDefined();
    });
    it('filterPipe should filter', function () {
        var items = [];
        items.push({ id: 1, name: 'Hans' });
        items.push({ id: 2, name: 'Franz' });
        items.push({ id: 3, name: 'Kurt' });
        items.push({ id: 4, name: 'Gustav' });
        var filtered = filterPipe.transform(items, 'name', 'Hans');
        expect(filtered).Any;
        expect(filtered.length).toBe(1);
    });
    it('filterPipe should filter two items', function () {
        var items = [];
        items.push({ id: 1, name: 'Hans' });
        items.push({ id: 2, name: 'Hans' });
        items.push({ id: 3, name: 'Kurt' });
        items.push({ id: 4, name: 'Gustav' });
        var filtered = filterPipe.transform(items, 'name', 'Hans');
        expect(filtered).Any;
        expect(filtered.length).toBe(2);
    });
});
//# sourceMappingURL=filter.pipe.spec.js.map