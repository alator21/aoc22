import { readInputContents } from '../generic/Utils.ts';

enum Action {
	ROCK,
	PAPER,
	SCISSORS,
}

type EnemyChoice = 'A' | 'B' | 'C';
type OutcomeOfTheGame = 'X' | 'Y' | 'Z';
const translateEnemyChoiceToAction = (choice: EnemyChoice): Action => {
	if (choice === 'A') {
		return Action.ROCK;
	}
	if (choice === 'B') {
		return Action.PAPER;
	}
	if (choice === 'C') {
		return Action.SCISSORS;
	}
	throw new Error('Could not translate choice ' + choice);
};
const translateOutcomeOfTheGameToAction = (
	enemyAction: Action,
	outcomeOfTheGame: OutcomeOfTheGame,
): Action => {
	if (outcomeOfTheGame === 'Y') {
		return enemyAction;
	}
	if (outcomeOfTheGame === 'Z') {
		if (enemyAction === Action.ROCK) {
			return Action.PAPER;
		}
		if (enemyAction === Action.PAPER) {
			return Action.SCISSORS;
		}
		if (enemyAction === Action.SCISSORS) {
			return Action.ROCK;
		}
		throw new Error('Could not translate choice ' + enemyAction);
	}
	if (outcomeOfTheGame === 'X') {
		if (enemyAction === Action.ROCK) {
			return Action.SCISSORS;
		}
		if (enemyAction === Action.PAPER) {
			return Action.ROCK;
		}
		if (enemyAction === Action.SCISSORS) {
			return Action.PAPER;
		}
		throw new Error('Could not translate choice ' + enemyAction);
	}
	throw new Error('Could not translate choice ' + outcomeOfTheGame);
};

const pointsBasedOnChoiceMap: Map<Action, number> = new Map<Action, number>([
	[Action.ROCK, 1],
	[Action.PAPER, 2],
	[Action.SCISSORS, 3],
]);
const calculatePointsBasedOnMyAction = (action: Action): number => {
	const points = pointsBasedOnChoiceMap.get(action);
	if (points === undefined) {
		throw new Error('Could not find points for choice ' + action);
	}
	return points;
};

const calculatePointsBasedOnTheOutcomeOfTheGame = (
	myAction: Action,
	enemyAction: Action,
): number => {
	if (myAction === enemyAction) {
		return 3;
	}
	if (enemyAction === Action.ROCK) {
		if (myAction === Action.PAPER) {
			return 6;
		}
		return 0;
	}
	if (enemyAction === Action.PAPER) {
		if (myAction === Action.SCISSORS) {
			return 6;
		}
		return 0;
	}
	if (enemyAction === Action.SCISSORS) {
		if (myAction === Action.ROCK) {
			return 6;
		}
		return 0;
	}
	throw new Error(`Could not calculate points for actions ${myAction} and ${enemyAction}`);
};
const text = await readInputContents(2, 2);

const split: string[] = text.split('\n');
let totalSum = 0;
for (const item of split) {
	const choices = item.split(' ');
	const enemyAction: Action = translateEnemyChoiceToAction(choices[0] as EnemyChoice);
	const myAction: Action = translateOutcomeOfTheGameToAction(
		enemyAction,
		choices[1] as OutcomeOfTheGame,
	);
	const pointsBasedOnChoice = calculatePointsBasedOnMyAction(myAction);
	const pointsBasedOnOutcome = calculatePointsBasedOnTheOutcomeOfTheGame(myAction, enemyAction);
	totalSum += pointsBasedOnOutcome + pointsBasedOnChoice;
}
console.log(totalSum);
