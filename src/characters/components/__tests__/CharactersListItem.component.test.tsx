import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import { Characters } from '../../models/Characters.interface';
import { CharactersListItem } from '../CharactersListItem.component';

const mockCharacters: Characters = require('../../services/__tests__/get-characters-response-transformed.json');
const props = {
	characters: mockCharacters
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
		<Router>
			<CharactersListItem { ...props } />
		</Router>
	), div);
  ReactDOM.unmountComponentAtNode(div);
});