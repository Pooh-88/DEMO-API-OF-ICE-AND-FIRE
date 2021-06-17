import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as pino from 'pino';

import { ConfigurationContext } from '../../shared/ConfigurationContext';
import { Characters } from '../models/Characters.interface';
import { CharactersService } from '../services/CharactersService';
import { Loading } from '../../shared/components/Loading.component';
import CharactersList from './CharactersList.component';

export class CharactersDetails extends Component {
	private _charactersService!: CharactersService;
	private _logger: pino.Logger = pino.default();

	static contextType = ConfigurationContext;

	state = {
		loading: true,
		characters: {} as Characters,
	};

	componentDidMount() {
		this._charactersService = new CharactersService(this.context);
		const { match } = this.props as any;
		this._fetchData(match.params.id);
	}

	componentDidUpdate(prevProps: any) {
		const { match } = this.props as any;
		if (match.url !== prevProps.match.url) {
			this._fetchData(match.params.id);
		}
	}

	render() {
		const characters: Characters = this.state.characters;
		return (
			<article>
				{ this.state.loading && <Loading /> }
				( <Link to='/characters'>Back</Link> )
				{ !this.state.loading && <>
					<h1>
						{ characters.name },{ characters.aliases[0] }
					</h1>
					<dl>
						<dt>House</dt>
						<dd>{ characters.allegiances[0] }</dd>
					</dl>
				</>}
			</article>
		);
	}

	private _fetchData(id: string): void {
		this.setState({ loading: true });

		this._charactersService.getCharacters(id)
			.then((response: any) => this.setState({
				characters: response,
				loading: false,
			}))
			.catch((error: Error) => this._logger.error('[CharactersDetails._fetchData]:', error));
	}
};

export default CharactersDetails;