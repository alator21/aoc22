import { readInputContents } from '../generic/Utils.ts';

const text = await readInputContents(4, 2);

const split = text.split('\n');
let count = 0;
for (const line of split) {
	const items = line.split(',');
	const firstElfSections = items[0];
	const secondElfSections = items[1];

	const sectionsOfFirst = firstElfSections.split('-');
	const sectionsOfSecond = secondElfSections.split('-');

	const firstElfMin = parseInt(sectionsOfFirst[0], 10);
	const firstElfMax = parseInt(sectionsOfFirst[1], 10);
	const secondElfMin = parseInt(sectionsOfSecond[0], 10);
	const secondElfMax = parseInt(sectionsOfSecond[1], 10);

	if (firstElfMax >= secondElfMin && firstElfMax <= secondElfMax) {
		count++;
		continue;
	}

	if (secondElfMax >= firstElfMin && secondElfMax <= firstElfMax) {
		count++;
	}
}
console.log(count);
