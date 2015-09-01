import {FIGURES} from '../constans';
import {COUNT_UPDATED, FIGURES_UPDATED, NEW_SEQUENCE} from '../actions';

const initialState = {
	sequence: [FIGURES.f1, FIGURES.f2, FIGURES.f3, FIGURES.f4],
	figures: ['f1', 'f2', 'f3', 'f4'],
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
			let sequence = [], index, i;
			for (i = 0; i < count; i++) {
				index = Math.round(Math.random() * (figures.length - 1));
				sequence.push(FIGURES[figures[index]]);
			}
			return {...state, sequence};

		default:
			return state;
	}
}

