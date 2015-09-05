import {DURATIONS} from './constans';
import {playOpen} from './audio';

export const COUNT_UPDATED = 'COUNT_UPDATED';
export const FIGURES_UPDATED = 'FIGURES_UPDATED';
export const NEW_SEQUENCE = 'NEW_SEQUENCE';
export const TEMP_UPDATED = 'TEMP_UPDATED';
export const NOTE_START_PLAY = 'NOTE_START_PLAY';
export const NOTE_END_PLAY = 'NOTE_END_PLAY';
export const PAUSE = 'PAUSED';
export const PLAY = 'PLAY';

export function countUpdated(count) {
	return {type: COUNT_UPDATED, count};
}

export function figuresUpdated(figures) {
	return {type: FIGURES_UPDATED, figures};
}

export function newSequence() {
	return {type: NEW_SEQUENCE};
}

export function tempUpdated(temp) {
	return {type: TEMP_UPDATED, temp};
}

let playNoteTimer;
export function pause() {
	return dispatch => {
		dispatch({type: PAUSE});
		dispatch({type: NOTE_END_PLAY});
		clearTimeout(playNoteTimer);
	}
}
export function play() {
	return (dispatch, getState) => {
		dispatch({type: PLAY});
		playNote()(dispatch, getState);
	}
}

export function playNote() {
	return (dispatch, getState) => {
		const state = getState();
		const {sequence, figureIndex, noteIndex} = state.melody;
		const note = sequence[figureIndex][noteIndex];
		const duration = 4 * 60 * 1000 / state.methronome.temp * DURATIONS[note];
		clearTimeout(playNoteTimer);
		dispatch({type: NOTE_START_PLAY, note});
		playOpen().then(() => {
			playNoteTimer = setTimeout(() => {
				dispatch({type: NOTE_END_PLAY, note});
				play()(dispatch, getState);
			}, duration);
		});
	}
}
