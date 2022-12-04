import { readInputContents } from '../generic/Utils.ts';

const text = await readInputContents(1, 2);

const split: string[] = text.split('\n\n');
let maxNumberOfCalories = 0;
for (const item of split) {
	const caloriesOfSnacks = item.split('\n').map((x) => parseInt(x, 10));
	const sumOfCalories = caloriesOfSnacks.reduce((a, b) => a + b, 0);
	if (sumOfCalories > maxNumberOfCalories) {
		maxNumberOfCalories = sumOfCalories;
	}
}
console.log(maxNumberOfCalories);
