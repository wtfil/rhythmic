import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import App from './containers/App';

import melody from './reducers/melody';
import methronome from './reducers/methronome';

let combined = combineReducers({melody, methronome});
let store = createStore(combined);

React.render(
	<Provider store={store}>
		{() => <App/>}
	</Provider>,
	document.body
);
