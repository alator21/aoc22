import { readInputContents } from '../generic/Utils.ts';

const text = await readInputContents(3, 2);

const split: string[] = text.split('\n');

function calculateCommonItems(
	itemsOfTheFirstComparment: string,
	itemsOfTheSecondComparment: string,
): Set<string> {
	const firstComparmentItems = itemsOfTheFirstComparment.split('');
	const secondComparmentItems = itemsOfTheSecondComparment.split('');
	const commonItems = new Set<string>();
	for (const item of firstComparmentItems) {
		if (secondComparmentItems.includes(item)) {
			commonItems.add(item);
		}
	}
	return commonItems;
}

let totalSum = 0;

function calculatePriority(character: string) {
	const characterCode = character.charCodeAt(0);
	if (characterCode >= 97 && characterCode <= 122) {
		return characterCode - 96;
	}
	if (characterCode >= 65 && characterCode <= 90) {
		return characterCode - 38;
	}
	throw new Error('Could not calculate priority for character ' + character);
}

for (const rucksack of split) {
	const numberOfItems = rucksack.length;
	const itemsOfTheFirstComparment = rucksack.substring(0, numberOfItems / 2);
	const itemsOfTheSecondComparment = rucksack.substring(numberOfItems / 2, numberOfItems);
	const commonItems = calculateCommonItems(itemsOfTheFirstComparment, itemsOfTheSecondComparment);
	let sumOfPriorities = 0;
	for (const item of commonItems) {
		sumOfPriorities += calculatePriority(item);
	}
	totalSum += sumOfPriorities;
}
console.log(totalSum);
