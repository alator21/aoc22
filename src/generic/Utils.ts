export async function readInputContents(
	day: number,
	index: number,
): Promise<string> {
	const fileName = `./src/${day}/data/input${index}.txt`;
	return await Deno.readTextFile(fileName);
}
