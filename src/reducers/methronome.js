import {TEMP_UPDATED, PLAY, PAUSE} from '../actions';
const MAX_TEMP = 300;
const MIN_TEMP = 10;

const initialState = {
	temp: 60,
	takt: 0,
	bit: 0,
	minTemp: MIN_TEMP,
	maxTemp: MAX_TEMP,
	isPlaying: false
};

export default function methronome(state = initialState, action) {
	switch(action.type) {
	case TEMP_UPDATED:
		let temp = Math.max(MIN_TEMP, action.temp);
		temp = Math.min(MAX_TEMP, temp);
		return {...state, temp};

	case PLAY:
		return {...state, isPlaying: true};

	case PAUSE:
		return {...state, isPlaying: false};

	default:
		return state;
	}
}
