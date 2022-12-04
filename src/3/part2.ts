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

function findTheOnlyCommonItem(
	rucksackItems1: string,
	rucksackItems2: string,
	rucksackItems3: string,
): string {
	const commonItems1And2 = calculateCommonItems(rucksackItems1, rucksackItems2);
	const commonItems2And3 = calculateCommonItems(rucksackItems2, rucksackItems3);
	const commonItems1And3 = calculateCommonItems(rucksackItems1, rucksackItems3);
	for (const item of commonItems1And2) {
		if (commonItems2And3.has(item) && commonItems1And3.has(item)) {
			return item;
		}
	}
	throw new Error('Could not find the only common item');
}

let totalSum = 0;
for (let i = 0; i < split.length; i += 3) {
	const rucksackItems1 = split[i];
	const rucksackItems2 = split[i + 1];
	const rucksackItems3 = split[i + 2];
	const commonItemInRucksacks = findTheOnlyCommonItem(
		rucksackItems1,
		rucksackItems2,
		rucksackItems3,
	);
	totalSum += calculatePriority(commonItemInRucksacks);
}
console.log(totalSum);
