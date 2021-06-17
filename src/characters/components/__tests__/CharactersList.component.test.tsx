import React from 'react';
import ReactDOM from 'react-dom';

import { CharactersList } from '../CharactersList.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CharactersList />, div);
  ReactDOM.unmountComponentAtNode(div);
});