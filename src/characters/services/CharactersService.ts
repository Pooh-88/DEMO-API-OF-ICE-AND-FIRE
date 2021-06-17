import * as axios from 'axios';
import * as pino from 'pino';

import { Configuration } from '../../shared/models/Configuration.interface';
import { Characters } from '../models/Characters.interface';

export class CharactersService {
	private _logger: pino.Logger = pino.default();

	public constructor(private readonly _configuration: Configuration) {}

	public async getCharacters(id: string): Promise<Characters> {
		try {
			const response = await axios.default.get(
				`${this._configuration.apiBaseUrl}/api/characters/${id}`
			);
			return {
				...response.data,
				id: CharactersService._extractId(response.data.url),
			};
		} catch (error) {
			this._logger.error('[CharactersService.getCharacters]:', error);
			throw error;
		}
	}

	public async getCharacterses(page: number = 1, pageSize: number = this._configuration.apiPageSize || 10): Promise<Characters[]> {
		try {
			const response = await axios.default.get(
				`${this._configuration.apiBaseUrl}/api/characters?page=${page}&pageSize=${pageSize}`
			);
			return response.data.map((characters: Characters) => {
				return {
					...characters,
					id: CharactersService._extractId(characters.url),
				}
			});
		} catch (error) {
			this._logger.error('[CharactersService.getCharacterses]:', error);
			return [];
		}
	}

	private static _extractId(url: string): string {

		return url.split('/').pop() || '';
	}
}

export default CharactersService;