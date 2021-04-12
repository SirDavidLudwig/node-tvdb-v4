import { expect } from "chai";
import * as Schema from "../src/schema";
import "mocha";

// Helper export functions --------------------------------------------------------------------------------

/**
 * Expect a value to be a number or null
 */
 export function expectNullableNumber(value: any) {
	expect(value).to.satisfy((d: any) => typeof value === "number" || value === null, "expected nulllable number:" + value);
}

/**
 * Expect a value to be a string or null
 */
export function expectNullableString(value: any) {
	expect(value).to.satisfy((d: any) => typeof value === "string" || value === null, "expected nullable string:" + value);
}

/**
 * Expect a value to be a Date object or null
 */
export function expectNullableDate(value: any) {
	expect(value).to.satisfy((d: any) => d instanceof Date || d === null, "expected nullable date:" + value);
}

/**
 * Check if a character record has been parsed
 */
 export function expectCharacterToBeParsed(character: Schema.ICharacter | null, nullable = false) {
	if (nullable && character === null) {
		return;
	}
	expectNullableNumber(character!.episodeId);
	expectNullableNumber(character!.movieId);
	expectNullableNumber(character!.seriesId);
	expectNullableString(character!.image);
	expectNullableString(character!.url);
}

/**
 *
 * @param episode
 * @param nullable
 */
export function expectEpisodeToBeParsed(episode: Schema.IEpisodeBaseRecord | null, nullable = false) {
	if (nullable && episode === null) {
		return;
	}
	expect(episode).to.not.be.null;
	expectNullableDate(episode!.aired);
}

/**
 * Check if a movie record has been parsed
 */
export function expectMovieToBeParsed(movie: Schema.IMovieExtendedRecord | null, nullable = false) {
	if (nullable && movie === null) {
		return;
	}
	expect(movie).to.not.be.null;
	expect(movie!.characters).to.not.be.empty;
	expectCharacterToBeParsed(movie!.characters[0]);
	expect(movie!.releases).to.not.be.empty;
	expect(movie!.releases[0].date).to.be.an.instanceOf(Date);
}

/**
 * Check if a series record has been parsed
 */
export function expectSeriesToBeParsed(series: Schema.ISeriesBaseRecord | null, nullable = false) {
	if (nullable && series === null) {
		return;
	}
	expect(series).to.not.be.null;
	expectNullableDate(series!.firstAired);
	expectNullableDate(series!.lastAired);
	expectNullableDate(series!.nextAired);
}

// -------------------------------------------------------------------------------------------------

/**
 * A small wrapper for extra tests
 */
export interface ITest<T> {
	description: string,
	callback: (record: T) => void | Promise<any>
}

/**
 * Create a an extra test case
 */
export function test<T>(description: string, callback: (record: T) => void | Promise<any>) {
	return <ITest<T>>{ description, callback };
}

 /**
  * Test an individual record
  */
export function testRecord<T>(fetch: () => Promise<T>, keys: string[],
                              parsedCb?: (record: T) => void, ...extraTests: ITest<T>[])
{
	var record: T;
	it("should fetch a record", async () => {
		record = await fetch();
		expect(record).to.not.be.undefined;
	});
	it("should have required keys", () => {
		expect(record).to.have.all.keys(...keys);
	});
	if (parsedCb !== undefined) {
		it("should have parsed records", () => {
			parsedCb(record);
		});
	}
	for (let { description, callback } of extraTests) {
		it(description, () => callback(record));
	}
}

/**
 * Test an array of records
 */
export function testRecords<T>(fetch: () => Promise<T[]>, keys: string[],
                               parsedCb?: (record: T) => void, ...extraTests: ITest<T>[])
{
	var records: T[];
	it("should fetch a record", async () => {
		records = await fetch();
		expect(records).to.not.be.undefined;
	});
	it("should be a list of records", () => {
		expect(records).to.be.an.instanceOf(Array);
		expect(records).to.not.be.empty;
	});
	if (keys !== undefined) {
		it("should have required keys", () => {
			expect(records[0]).to.have.all.keys(...keys);
		});
	}
	if (parsedCb !== undefined) {
		it("should have parsed records", () => {
			parsedCb(records[0]);
		});
	}
	for (let { description, callback } of extraTests) {
		it(description, () => callback(records[0]));
	}
}
