// tslint:disable:no-console
import * as fs from 'fs';
import * as Bluebird from 'bluebird';
import { TruthBooth, Pair, Constraint, getPossibleSolutions } from './lib';

interface ITruthBoothImport {
    guyName: string;
    girlName: string;
    match: boolean;
}

interface IMatchUp {
    beams: number;
    matches: Array<{ guyName: string, girlName: string }>;
}

async function importJSON<Type> (fileName): Promise<Type> {
    const data = await Bluebird.fromCallback((callback) => {
        fs.readFile(__dirname + '/' + fileName, callback);
    });
    // @ts-ignore
    return JSON.parse(data) as Type;
}

async function run (): Promise<void> {
    console.log('Reading inputs...');

    const girls = await importJSON<string[]>('../data/season7/girls.json');
    const guys = await importJSON<string[]>('../data/season7/guys.json');
    const truthBoothsImport = await importJSON<ITruthBoothImport[]>('../data/season7/truth_booths.json');

    const week1 = await importJSON<IMatchUp>('../data/season7/week1.json');
    const week2 = await importJSON<IMatchUp>('../data/season7/week2.json');
    const week3 = await importJSON<IMatchUp>('../data/season7/week3.json');
    const week4 = await importJSON<IMatchUp>('../data/season7/week4.json');
    const week5 = await importJSON<IMatchUp>('../data/season7/week5.json');
    const week6 = await importJSON<IMatchUp>('../data/season7/week6.json');
    const week7 = await importJSON<IMatchUp>('../data/season7/week7.json');
    const week8 = await importJSON<IMatchUp>('../data/season7/week8.json');
    const week9 = await importJSON<IMatchUp>('../data/season7/week9.json');
    const weeks = [week1, week2, week3, week4, week5, week6, week7, week8, week9];

    console.log('Reading inputs complete.');

    const girlMap = new Map<string, number>();
    girls.forEach((name, index) => {
        girlMap.set(name, index);
    });

    const guysMap = new Map<string, number>();
    guys.forEach((name, index) => {
        guysMap.set(name, index);
    });

    const truthBooths = truthBoothsImport.map((booth) => {
        const guyIndex = guysMap.get(booth.guyName)!;
        const girlIndex = girlMap.get(booth.girlName)!;
        return new TruthBooth(new Pair(guyIndex, girlIndex), booth.match);
    });

    const constraints = weeks.map((week) => {
        const pairs = week.matches.map((match) => {
            const guyIndex = guysMap.get(match.guyName)!;
            const girlIndex = girlMap.get(match.girlName)!;
            return new Pair(guyIndex, girlIndex);
        });
        return new Constraint(pairs, week.beams);
    });

    console.log('Finding solutions...');
    const answers = getPossibleSolutions(guys, girls, truthBooths, constraints);
    console.log('Num possible answers: ' + answers);
}

run();
