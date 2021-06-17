import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import { CharactersDetails } from '../CharactersDetails.component';

const props = {
	match: {
		params: {
			id: '1'
		}
	}
}

it('renders without crashing', () => {
	const div = document.createElement('div');
  ReactDOM.render((
		<Router>
			<CharactersDetails { ...props } />
		</Router>
	), div);
  ReactDOM.unmountComponentAtNode(div);
});