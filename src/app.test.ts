import { expect } from 'chai';
import { getPossiblePairs, Pair } from './app';

describe('getPossiblePairs() -- ', () => {
    describe('with 2 guys and two girls', () => {
        const guys = ['a', 'b'];
        const girls = ['x', 'y'];

        it('should return all matches', () => {
            const ans = getPossiblePairs(guys, girls);
            expect(ans).to.deep.equal([
                // Solution 1
                [
                    new Pair(0, 0),
                    new Pair(1, 1),
                ],
                // Solution 2
                [
                    new Pair(0, 1),
                    new Pair(1, 0),
                ],
            ]);
        });
    });

    describe('with 3 guys and 3 girls', () => {
        const guys = ['a', 'b', 'c'];
        const girls = ['x', 'y', 'z'];

        it('should return all matches', () => {
            const ans = getPossiblePairs(guys, girls);
            expect(ans).to.deep.equal([
                // Solution 1
                [
                    new Pair(0, 0),
                    new Pair(1, 1),
                    new Pair(2, 2),
                ],
                // Solution 2
                [
                    new Pair(0, 0),
                    new Pair(1, 2),
                    new Pair(2, 1),
                ],
                // Solution 3
                [
                    new Pair(0, 1),
                    new Pair(1, 0),
                    new Pair(2, 2),
                ],
                // Solution 4
                [
                    new Pair(0, 1),
                    new Pair(1, 2),
                    new Pair(2, 0),
                ],
                // Solution 5
                [
                    new Pair(0, 2),
                    new Pair(1, 0),
                    new Pair(2, 1),
                ],
                // Solution 6
                [
                    new Pair(0, 2),
                    new Pair(1, 1),
                    new Pair(2, 0),
                ],
            ]);
        });
    });
});
