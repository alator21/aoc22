import {readInputContents} from '../generic/Utils.ts';

const text = await readInputContents(6, 2);

const LIMIT = 14;

function nNextCharactersAreDifferent(i: number): boolean {
	if (i + LIMIT > text.length) {
		return false;
	}
	const t: Set<string> = new Set();
	for (let j = i; j < i + LIMIT; j++) {
		t.add(text[j]);
	}
	return t.size === LIMIT;
}

for (let i = 0; i < text.length; i++) {
	if (nNextCharactersAreDifferent(i)) {
		console.log(i + LIMIT);
		break;
	}
}
