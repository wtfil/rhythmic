import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import App from './containers/App';

import melody from './reducers/melody';
import methronome from './reducers/methronome';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const combined = combineReducers({melody, methronome});
const store = createStoreWithMiddleware(combined);

React.render(
	<Provider store={store}>
		{() => <App/>}
	</Provider>,
	document.body
);
