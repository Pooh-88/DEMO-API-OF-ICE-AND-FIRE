import React, { Component, ContextType } from 'react';
import * as pino from 'pino';

import { ConfigurationContext } from '../../shared/ConfigurationContext';
import { Characters } from '../models/Characters.interface';
import { CharactersListItem } from './CharactersListItem.component';
import { CharactersService } from '../services/CharactersService';
import { Loading } from '../../shared/components/Loading.component';

export class CharactersList extends Component {
	private _charactersService!: CharactersService;
	private _logger: pino.Logger = pino.default();

	static contextType = ConfigurationContext;

	state = {
		charactersFilter: 'Any',
		pagenationStep: '25',
		characterses: [],
		loading: false,
		page: 1,
	};

	componentDidMount() {
		this._charactersService = new CharactersService(this.context);
		this._fetchData();
	}

	render() {
		return (
			<section>
				{ this.state.loading && <Loading /> }
				<h1>Characters</h1>
				{ this._renderFilterOptions() }
				{ this._renderFilteredCharacterses() }
				<hr />
			</section>
		);
	};

	private _fetchData(page: number = 1): void {
		this.setState({ loading: true });

		const nextPage: number = (this.state.page || page) + 1;
		this._charactersService.getCharacterses(page)
			.then((response: any) => this.setState({
				characterses: this.state.characterses.concat(response),
				loading: false,
				page: nextPage,
			}))
			.catch((error: Error) => this._logger.error('[CharactersList._fetchData]:', error));
	}

	private _filterCharacterses(event: React.FormEvent): void {
		this.setState({charactersFilter: ((event.target) as any).value})
	}

	private _renderFilterOptions() {
		return (
			<div>
				<strong>Filtering:</strong>
				&nbsp;
				<select onChange={e=>this._filterCharacterses(e)}>
					<option>Any</option>
					<option>Male</option>
					<option>Female</option>
				</select>
			</div>
		);
	}

	private _renderFilteredCharacterses() {
		return this.state.characterses
				.filter((characters: Characters) => (this.state.charactersFilter === 'Any') ? true : characters.gender === this.state.charactersFilter)
				.map((characters: Characters) => <CharactersListItem key={ characters.id } characters={ characters } />)	
	}
};

export default CharactersList;