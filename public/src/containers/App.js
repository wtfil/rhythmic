import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../components/Toolbar';
import Sample from '../components/Sample';
import {
	figuresUpdated,
	countUpdated,
	newSequence,
	tempUpdated,
	playNote
} from '../actions';

let App = React.createClass({
	getInitialState() {
		return {melody: this.props.melody};
	},
	play() {
		let {dispatch} = this.props;
		let {melody} = this.state;
		let {sequence, figureIndex, noteIndex} = melody;
		let note = sequence[figureIndex][noteIndex];
		dispatch(playNote(note));
	},
	componentWillReceiveProps(newProps) {
		if (this.state.melody !== newProps.melody) {
			this.setState({melody: newProps.melody}, this.play);
		}
	},
	componentWillMount() {
		this.play();
	},

	render() {
		const {dispatch, methronome, melody} = this.props;
		return <div className="container">
			<Toolbar
				figuresCount={melody.count}
				activeFigures={melody.figures}
				temp={methronome.temp}

				onChangeFigures={figures => dispatch(figuresUpdated(figures))}
				onChangeCount={count => dispatch(countUpdated(count))}
				onRegenerate={() => dispatch(newSequence())}
				onTempChange={temp => dispatch(tempUpdated(temp))}
			/>
			<Sample
				sequence={melody.sequence}
				figureIndex={melody.figureIndex}
				noteIndex={melody.noteIndex}
				temp={methronome.temp}
			/>
		</div>;
	}
});

function select(state) {
	return state;
}

export default connect(select)(App);
