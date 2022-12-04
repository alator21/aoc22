import { readInputContents } from '../generic/Utils.ts';

const text = await readInputContents(1, 2);

const split: string[] = text.split('\n\n');
let maxNumberOfCalories = 0;
const caloriesByElf = [];
for (const item of split) {
	const caloriesOfSnacks = item.split('\n').map((x) => parseInt(x, 10));
	const sumOfCalories = caloriesOfSnacks.reduce((a, b) => a + b, 0);
	caloriesByElf.push(sumOfCalories);
}
const topThreeCalories = caloriesByElf.sort((a, b) => b - a).slice(0, 3);
const sumOfTopThreeCalories = topThreeCalories.reduce((a, b) => a + b, 0);
console.log(sumOfTopThreeCalories);
