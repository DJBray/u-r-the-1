// tslint:disable:max-classes-per-file

// const guysNames: string[] = [];
// const girlsNames: string[] = [];

export class Pair {
    public guy: number;
    public girl: number;

    constructor (guy: number, girl: number) {
        this.guy = guy;
        this.girl = girl;
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

// const constraintsList: Constraint[] = [];

export function getPossibleSolutions (guys: string[], girls: string[], constraints: Constraint[]): PossibleAnswer[] {
    const possibleMatches = getPossiblePairs(guys, girls);
    return possibleMatches.filter((pm: PossibleAnswer) => isValidWithConstraints(pm, constraints));
}

export function getPossiblePairs (guys: string[], girls: string[]): PossibleAnswer[] {
    const recurse = (guyNums: number[], girlNums: number[], ppairs: Pair[]): PossibleAnswer[] => {
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

export function isValidWithConstraints (ans: PossibleAnswer, constraints: Constraint[]): boolean {
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
