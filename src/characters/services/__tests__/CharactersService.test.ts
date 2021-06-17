import * as axios from 'axios';
import * as MockAdapter from 'axios-mock-adapter';

import { Configuration } from '../../../shared/models/Configuration.interface';
import { Characters } from '../../models/Characters.interface';
import { CharactersService } from '../CharactersService';

const mockAdapter: any = new MockAdapter.default(axios.default);
const mockConfiguration: Configuration = {
	apiBaseUrl: 'api_base_url',
	apiPageSize: 5,
}
const mockGetCharactersResponse: any = require('./get-characters-response.json');
const mockGetCharactersResponseTransformed: Characters = require('./get-characters-response-transformed.json');
const mockGetCharactersesResponse: any = require('./get-characterses-response.json');
const mockGetCharactersesResponseTransformed: Characters[] = require('./get-characterses-response-transformed.json');

afterEach(() => {
	mockAdapter.reset();
});

describe('CharactersService', () => {
	const charactersService: CharactersService = new CharactersService(mockConfiguration);

	it('is exported', () => {
		expect(CharactersService).toBeDefined();
	})

	describe('getCharacters()', () => {
		it('given a characters ID, returns the expected result', async () => {
			mockAdapter
				.onGet()
				.reply(200, mockGetCharactersResponse);

			expect(await charactersService.getCharacters('1')).toEqual(mockGetCharactersResponseTransformed);
		});

		it('given an invalid characters ID, returns the expected 404 error', async () => {
			mockAdapter
				.onGet()
				.reply(404);

			try {
				await charactersService.getCharacters('0');
			} catch (error) {
				expect.assertions(2);
				expect(error).toBeInstanceOf(Error);
				expect(error.message).toBe('Request failed with status code 404');
			}
		});

		it('given an unhandled error, returns it', async () => {
			mockAdapter
				.onGet()
				.reply(500);

			try {
				await charactersService.getCharacters('1');
			} catch (error) {
				expect.assertions(1);
				expect(error).toBeInstanceOf(Error);
			}
		});
	});

	describe('getCharacterses()', () => {
		it('given a request, returns a collection of characterses', async () => {
			mockAdapter
				.onGet()
				.reply(200, mockGetCharactersesResponse);

			expect(await charactersService.getCharacterses()).toEqual(mockGetCharactersesResponseTransformed);
		});

		it('given an unhandled error, returns it', async () => {
			mockAdapter
				.onGet()
				.reply(500);

			try {
				await charactersService.getCharacterses();
			} catch (error) {
				expect.assertions(1);
				expect(error).toBeInstanceOf(Error);
			}
		});
	});
});