import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../components/Toolbar';
import Sample from '../components/Sample';
import {figuresUpdated, countUpdated, newSequence, tempUpdated} from '../actions';

let App = React.createClass({
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
				temp={methronome.temp}
			/>
		</div>;
	}
});

function select(state) {
	return state;
}

export default connect(select)(App);
