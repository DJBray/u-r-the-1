// tslint:disable:max-classes-per-file
// tslint:disable:no-console

export class Pair {
    public guy: number;
    public girl: number;

    constructor (guy: number, girl: number) {
        this.guy = guy;
        this.girl = girl;
    }
}

export class TruthBooth {
    public pair: Pair;
    public isMatch: boolean;

    constructor (pair: Pair, isMatch: boolean) {
        this.pair = pair;
        this.isMatch = isMatch;
    }
}

export class Constraint {
    public matches: Pair[];
    public beams: number;

    constructor (matches: Pair[], beams: number) {
        this.matches = matches;
        this.beams = beams;
    }
}

type PossibleAnswer = Pair[];

export function getPossibleSolutions (
    guys: string[], girls: string[], truthBooths: TruthBooth[], constraints: Constraint[],
): PossibleAnswer[] {
    console.log('Getting possible pairs...');
    const possibleMatches = getPossiblePairs(guys, girls);
    console.log('Pairs found: ' + possibleMatches.length);
    console.log('Filtering...');
    return possibleMatches
        .filter((pm: PossibleAnswer) => isValidWithTruthBooths(pm, truthBooths))
        .filter((pm: PossibleAnswer) => isValidWithConstraints(pm, constraints));
}

export function getPossiblePairs (guys: string[], girls: string[]): PossibleAnswer[] {
    let recursions = 0;
    const recurse = (guyNums: number[], girlNums: number[], ppairs: Pair[]): PossibleAnswer[] => {
        recursions++;
        console.log(recursions);
        if (guyNums.length === 0) {
            return [ppairs];
        }

        let ans: PossibleAnswer[] = [];
        girlNums.forEach((girlNumber) => {
            ans = ans.concat(recurse(
                guyNums.slice(1),
                girlNums.filter((n) => n !== girlNumber),
                [...ppairs, new Pair(guyNums[0], girlNumber)],
            ));
        });
        return ans;
    };

    return recurse(
        Array.from({ length: guys.length }, (_, k) => k),
        Array.from({ length: girls.length }, (_, k) => k),
        [],
    );
}

export function isValidWithTruthBooths (ans: PossibleAnswer, truthBooths: TruthBooth[]): boolean {
    for (const booth of truthBooths) {
        if (booth.isMatch) {
            if (!includes(booth.pair, ans)) {
                return false;
            }
        } else {
            if (includes(booth.pair, ans)) {
                return false;
            }
        }
    }

    return true;
}

export function isValidWithConstraints (ans: PossibleAnswer, constraints: Constraint[]): boolean {
    const violatedConstraints = constraints.filter((constraint) => {
        let foundBeams = 0;
        ans.forEach((pair) => {
            if (includes(pair, constraint.matches)) {
                foundBeams++;
            }
        });
        return foundBeams !== constraint.beams;
    });

    return violatedConstraints.length === 0;
}

function includes (pair: Pair, list: Pair[]) {
    return list.filter((item) => item.guy === pair.guy && item.girl === pair.girl)
        .length > 0;
}
