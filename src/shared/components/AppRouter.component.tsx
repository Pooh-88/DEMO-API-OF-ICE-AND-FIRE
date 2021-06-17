import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import { CharactersDetails } from '../../characters/components/CharactersDetails.component';
import { CharactersList } from '../../characters/components/CharactersList.component';

export const AppRouter = () => {
	return (
		<Switch>
			<Redirect exact path='/' to='/characters' />
			<Route component={ CharactersList } exact path='/characters' />
			<Route component={ CharactersDetails } exact path='/characters/:id' />
		</Switch>
	);
}

export default AppRouter;