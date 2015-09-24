import {FIGURES} from '../constans';
import {COUNT_UPDATED, FIGURES_UPDATED, NEW_SEQUENCE, NOTE_END_PLAY} from '../actions';

const initialState = {
	sequence: [FIGURES.f1, FIGURES.f2, FIGURES.f3, FIGURES.f4],
	figures: ['f1', 'f2', 'f3', 'f4'],
	figureIndex: 0,
	noteIndex: 0,
	count: 4
}

export default function reducer(state = initialState, action) {
	switch(action.type) {

	case COUNT_UPDATED:
		return reducer({...state, count: action.count}, {type: NEW_SEQUENCE});

	case FIGURES_UPDATED:
		return reducer({...state, figures: action.figures}, {type: NEW_SEQUENCE});

	case NEW_SEQUENCE:
		let {figures, count} = state;
		let newSequence = [], index, i;
		for (i = 0; i < count; i++) {
			index = Math.round(Math.random() * (figures.length - 1));
			newSequence.push(FIGURES[figures[index]]);
		}
		return {...state, sequence: newSequence, figureIndex: 0, noteIndex: 0};

	case NOTE_END_PLAY:
		let {noteIndex, figureIndex, sequence} = state;
		noteIndex ++;
		if (noteIndex > sequence[figureIndex].length - 1) {
			noteIndex = 0;
			figureIndex ++;
		}
		if (figureIndex > sequence.length - 1) {
			figureIndex = 0;
		}
		return {...state, figureIndex, noteIndex};

	default:
		return state;
	}
}

