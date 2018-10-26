"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pair {
    constructor(guy, girl) {
        this.guy = guy;
        this.girl = girl;
    }
}
exports.Pair = Pair;
class Constraint {
    constructor(matches, beams) {
        this.matches = matches;
        this.beams = beams;
    }
}
exports.Constraint = Constraint;
function getPossibleSolutions(guys, girls, constraints) {
    const possibleMatches = getPossiblePairs(guys, girls);
    return possibleMatches.filter((pm) => isValidWithConstraints(pm, constraints));
}
exports.getPossibleSolutions = getPossibleSolutions;
function getPossiblePairs(guys, girls) {
    const recurse = (guyNums, girlNums, ppairs) => {
        if (guyNums.length === 0) {
            return [ppairs];
        }
        let ans = [];
        girlNums.forEach((girlNumber) => {
            ans = ans.concat(recurse(guyNums.slice(1), girlNums.filter((n) => n !== girlNumber), [...ppairs, new Pair(guyNums[0], girlNumber)]));
        });
        return ans;
    };
    return recurse(Array.from({ length: guys.length }, (_, k) => k), Array.from({ length: girls.length }, (_, k) => k), []);
}
exports.getPossiblePairs = getPossiblePairs;
function isValidWithConstraints(ans, constraints) {
    const violatedConstraints = constraints.filter((constraint) => {
        let foundBeams = 0;
        ans.forEach((pair) => {
            if (constraint.matches.includes(pair)) {
                foundBeams++;
            }
        });
        return foundBeams !== constraint.beams;
    });
    return violatedConstraints.length === 0;
}
exports.isValidWithConstraints = isValidWithConstraints;
//# sourceMappingURL=app.js.map