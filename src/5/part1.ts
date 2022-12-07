import {readInputContents} from '../generic/Utils.ts';

const text = await readInputContents(5, 2);

const database: Map<string, string[]> = new Map();
const lines: string[] = text.split('\n');
const initialStackAndActionsSeparator = lines.indexOf('');
const keys = lines[initialStackAndActionsSeparator - 1].trim().split(/\s+/);
const initialStack = lines.slice(0, initialStackAndActionsSeparator - 1);
const actions = lines.slice(initialStackAndActionsSeparator + 1);


// Update the database to match the initial stack
for (let i = initialStack.length - 1; i >= 0; i--) {
	const line = lines[i];
	const keysOfValues = calculateKeyByNumberOfSpaces(line);
	for (const [key, value] of keysOfValues.entries()) {
		const keyAsString = key.toString(10);
		const valueAsString = value[1];
		let alreadyInMap = database.get(keyAsString);
		if (alreadyInMap == undefined) {
			alreadyInMap = [];
		}
		alreadyInMap.push(valueAsString)
		database.set(keyAsString, alreadyInMap);
	}
}

//Based on the actions, update the database
for (const action of actions) {
	const regexResult = action.match(/(\d+) from (\d+) to (\d+)/);
	if (regexResult === null) {
		throw new Error('invalid action');
	}
	if (regexResult.length !== 4) {
		throw new Error('invalid action');
	}
	const quantity = parseInt(regexResult[1]);
	const source = parseInt(regexResult[2]);
	const destination = parseInt(regexResult[3]);

	// console.log(`quantity: ${quantity}, source: ${source}, destination: ${destination}`);
	const sourceKeys = database.get(source.toString());
	const destinationKeys = database.get(destination.toString());
	if (sourceKeys === undefined || destinationKeys === undefined) {
		throw new Error('invalid action');
	}
	for (let i = 0; i < quantity; i++) {
		const key = sourceKeys.pop();
		if (key === undefined) {
			continue;
		}
		destinationKeys.push(key);
	}
}

// Grab the last item of each key from the database and concatenate them
const answer = keys.map(key => {
	const keyIndex = database.get(key);
	if (keyIndex === undefined) {
		throw new Error('invalid key');
	}
	return keyIndex[keyIndex.length - 1];
}).join('');
console.log(answer);


// Hacky as fuck method to calculate the key of each item by the number of spaces
function calculateKeyByNumberOfSpaces(line: string) {
	const split = line.split(' ');
	let spacesInARow = 0;
	let index = 1;
	let lastItem = ''
	const keysByIndex: Map<number, string> = new Map();
	for (const item of split) {
		if (spacesInARow === 4) {
			index++;
			spacesInARow = 0;
		}
		if (item === '') {
			spacesInARow++;
			continue;
		}

		if (lastItem !== '') {
			index++;
		}
		lastItem = item;
		keysByIndex.set(index, item);
	}
	return keysByIndex;
}
