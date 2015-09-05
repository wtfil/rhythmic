import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../components/Toolbar';
import Sample from '../components/Sample';
import {
	figuresUpdated,
	countUpdated,
	newSequence,
	tempUpdated,
	play,
	pause
} from '../actions';

let App = React.createClass({

	render() {
		const {dispatch, methronome, melody} = this.props;
		return <div className="container">
			<Toolbar
				figuresCount={melody.count}
				activeFigures={melody.figures}
				temp={methronome.temp}
				isPlaying={methronome.isPlaying}

				onChangeFigures={figures => dispatch(figuresUpdated(figures))}
				onChangeCount={count => dispatch(countUpdated(count))}
				onRegenerate={() => dispatch(newSequence())}
				onTempChange={temp => dispatch(tempUpdated(temp))}
				onPause={() => dispatch(pause())}
				onPlay={() => dispatch(play())}
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
