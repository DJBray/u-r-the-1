import { expect } from 'chai';
import { getPossiblePairs, Pair, isValidWithConstraints } from './app';

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

describe('isValidWithConstraints() -- ', () => {
    describe('with one constraint', () => {
        describe('with one beam', () => {
            describe('that over satisfies the constraint', () => {
                const constraints = [{
                    beams: 1,
                    matches: [
                        new Pair(1, 2),
                        new Pair(0, 1),
                        new Pair(2, 0),
                    ],
                }];

                const answer = [
                    new Pair(1, 2),
                    new Pair(0, 1),
                    new Pair(2, 0),
                ];

                it('should return false', () => {
                    const isValid = isValidWithConstraints(answer, constraints);
                    expect(isValid).to.equal(false);
                });
            });

            describe('that satisfies the constraint', () => {
                const constraints = [{
                    beams: 1,
                    matches: [
                        new Pair(1, 2),
                        new Pair(0, 1),
                        new Pair(2, 0),
                    ],
                }];

                const answer = [
                    new Pair(1, 0),
                    new Pair(0, 1),
                    new Pair(2, 2),
                ];

                it('should return true', () => {
                    const isValid = isValidWithConstraints(answer, constraints);
                    expect(isValid).to.equal(true);
                });
            });

            describe('that does not match', () => {
                const constraints = [{
                    beams: 1,
                    matches: [
                        new Pair(1, 2),
                        new Pair(0, 1),
                        new Pair(2, 0),
                    ],
                }];

                const answer = [
                    new Pair(0, 0),
                    new Pair(1, 1),
                    new Pair(2, 2),
                ];

                it('should return false', () => {
                    const isValid = isValidWithConstraints(answer, constraints);
                    expect(isValid).to.equal(false);
                });
            });
        });

        describe('with two beams', () => {
            describe('that over satisfies the constraint', () => {
                const constraints = [{
                    beams: 2,
                    matches: [
                        new Pair(1, 2),
                        new Pair(0, 1),
                        new Pair(2, 0),
                        new Pair(3, 3),
                    ],
                }];

                const answer = [
                    new Pair(1, 2),
                    new Pair(0, 1),
                    new Pair(2, 0),
                    new Pair(3, 3),
                ];

                it('should return false', () => {
                    const isValid = isValidWithConstraints(answer, constraints);
                    expect(isValid).to.equal(false);
                });
            });

            describe('that satisfies the constraint', () => {
                const constraints = [{
                    beams: 2,
                    matches: [
                        new Pair(1, 2),
                        new Pair(0, 1),
                        new Pair(2, 0),
                        new Pair(3, 3),
                    ],
                }];

                const answer = [
                    new Pair(1, 0),
                    new Pair(0, 1),
                    new Pair(2, 2),
                    new Pair(3, 3),
                ];

                it('should return true', () => {
                    const isValid = isValidWithConstraints(answer, constraints);
                    expect(isValid).to.equal(true);
                });
            });

            describe('that does not match', () => {
                const constraints = [{
                    beams: 2,
                    matches: [
                        new Pair(1, 2),
                        new Pair(0, 1),
                        new Pair(3, 0),
                        new Pair(2, 3),
                    ],
                }];

                const answer = [
                    new Pair(1, 2),
                    new Pair(0, 3),
                    new Pair(2, 0),
                    new Pair(3, 1),
                ];

                it('should return false', () => {
                    const isValid = isValidWithConstraints(answer, constraints);
                    expect(isValid).to.equal(false);
                });
            });
        });
    });

    describe('with three constraints', () => {
        describe('when it satisfies all three', () => {
            it('should return true', () => {
                const constraints = [{
                    beams: 1,
                    matches: [
                        new Pair(0, 2),
                        new Pair(1, 1),
                        new Pair(3, 0),
                        new Pair(2, 3),
                    ],
                }, {
                    beams: 2,
                    matches: [
                        new Pair(1, 1),
                        new Pair(0, 0),
                        new Pair(3, 2),
                        new Pair(2, 3),
                    ],
                }, {
                    beams: 0,
                    matches: [
                        new Pair(1, 2),
                        new Pair(0, 1),
                        new Pair(3, 0),
                        new Pair(2, 3),
                    ],
                }];

                const answer = [
                    new Pair(0, 0),
                    new Pair(1, 1),
                    new Pair(2, 2),
                    new Pair(3, 3),
                ];

                const isValid = isValidWithConstraints(answer, constraints);
                expect(isValid).to.equal(true);
            });
        });

        describe('when it satisfies two', () => {
            it('should return false', () => {
                const constraints = [{
                    beams: 1,
                    matches: [
                        new Pair(0, 2),
                        new Pair(1, 1),
                        new Pair(3, 0),
                        new Pair(2, 3),
                    ],
                }, {
                    beams: 2,
                    matches: [
                        new Pair(1, 1),
                        new Pair(0, 0),
                        new Pair(3, 2),
                        new Pair(2, 3),
                    ],
                }, {
                    beams: 0,
                    matches: [
                        new Pair(1, 2),
                        new Pair(0, 1),
                        new Pair(2, 0),
                        new Pair(3, 3),
                    ],
                }];

                const answer = [
                    new Pair(0, 0),
                    new Pair(1, 1),
                    new Pair(2, 2),
                    new Pair(3, 3),
                ];

                const isValid = isValidWithConstraints(answer, constraints);
                expect(isValid).to.equal(false);
            });
        });
    });
});
