export const COUNT_UPDATED = 'COUNT_UPDATED';
export const FIGURES_UPDATED = 'FIGURES_UPDATED';
export const NEW_SEQUENCE = 'NEW_SEQUENCE';
export const TEMP_UPDATED = 'TEMP_UPDATED';

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
