import React from 'react';
import { Link } from 'react-router-dom';

import { Characters } from '../models/Characters.interface';

export const CharactersListItem = (props: any) => {
	const characters: Characters = props.characters;

	const getAlive = (born: String, died: String) => {
		if (born === '') return 'No'

		if (died === '') {return 'Yes';}
		else if (died === null) {
			return 'Undefined'
		} else {
			let x = 0;
			let val = `No, died at ${x} years old`;
			return val;
		}
	}

	const getAliases = (aliases: String[]) => {
		let val = '';
		aliases.forEach(alias => {
			val += "," + alias;
		})
		return val;
	}

	const getAlligence = (alligencees: String[]) => {
		let val = '';
		if (alligencees.length === 0)
			return 'No allegiances'
		alligencees.forEach((alligence, index) => {
			if (index === 0) {
				val += alligence;
			} else {
				val += " - " + alligence;
			}			
		})
		return val;
	}

	return (			
		<article>	
			<h1>
				<Link to={`/characters/${ characters.id }`}>{ characters.name }{ getAliases(characters.aliases) }</Link>
			</h1>
			<dl>
				<dt>Alive</dt>
				<dd>{getAlive(characters.born, characters.died)}</dd>
				<dt>Gender</dt>
				<dd>{ characters.gender }</dd>
				<dt>Culture</dt>
				<dd>{characters.culture === '' ? 'Unknown' : characters.culture}</dd>
				<dt>Allegiances</dt>
				<dd>{ getAlligence(characters.allegiances) }</dd>
			</dl>
		</article>	
		
	)
};

export default CharactersListItem;