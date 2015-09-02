import {TEMP_UPDATED} from '../actions';
const MAX_TEMP = 300;
const MIN_TEMP = 10;

const initialState = {
	temp: 60,
	takt: 0,
	bit: 0,
	minTemp: MIN_TEMP,
	maxTemp: MAX_TEMP
};

export default function methronome(state = initialState, action) {
	switch(action.type) {
	case TEMP_UPDATED:
		let temp = Math.max(MIN_TEMP, action.temp);
		temp = Math.min(MAX_TEMP, temp);
		return {...state, temp};
	default:
		return state;
	}
}
