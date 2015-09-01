import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './containers/App';
import sequence from './reducers/sequence';

let store = createStore(sequence);

React.render(
	<Provider store={store}>
		{() => <App/>}
	</Provider>,
	document.body
);
