"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const app_1 = require("./app");
describe('getPossiblePairs() -- ', () => {
    describe('Test case 1', () => {
        const guys = ['a', 'b'];
        const girls = ['x', 'y'];
        it('should return all matches', () => {
            const ans = app_1.getPossiblePairs(guys, girls);
            chai_1.expect(ans).to.deep.equal([
                [
                    new app_1.Pair(0, 0),
                    new app_1.Pair(1, 1),
                ],
                [
                    new app_1.Pair(0, 1),
                    new app_1.Pair(1, 0),
                ],
            ]);
        });
    });
    describe('Test case 2', () => {
        const guys = ['a', 'b', 'c'];
        const girls = ['x', 'y', 'z'];
        it('should return all matches', () => {
            const ans = app_1.getPossiblePairs(guys, girls);
            chai_1.expect(ans).to.deep.equal([
                [
                    new app_1.Pair(0, 0),
                    new app_1.Pair(1, 1),
                    new app_1.Pair(2, 2),
                ],
                [
                    new app_1.Pair(0, 0),
                    new app_1.Pair(1, 2),
                    new app_1.Pair(2, 1),
                ],
                [
                    new app_1.Pair(0, 1),
                    new app_1.Pair(1, 0),
                    new app_1.Pair(2, 2),
                ],
                [
                    new app_1.Pair(0, 1),
                    new app_1.Pair(1, 2),
                    new app_1.Pair(2, 0),
                ],
                [
                    new app_1.Pair(0, 2),
                    new app_1.Pair(1, 0),
                    new app_1.Pair(2, 1),
                ],
                [
                    new app_1.Pair(0, 2),
                    new app_1.Pair(1, 1),
                    new app_1.Pair(2, 0),
                ],
            ]);
        });
    });
});
//# sourceMappingURL=app.test.js.map