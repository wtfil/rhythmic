import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../components/Toolbar';
import Sample from '../components/Sample';
import {figuresUpdated, countUpdate, newSequence} from '../actions';

let App = React.createClass({
	render() {
		const {dispatch, count, figures, sequence} = this.props;
		return <div className="container">
			<Toolbar
				figuresCount={count}
				activeFigures={figures}
				onChangeFigures={figures => dispatch(figuresUpdated(figures))}
				onChangeCount={count => dispatch(countUpdate(count))}
				onRegenerate={() => dispatch(newSequence())}
			/>
			<Sample sequence={sequence} />
		</div>;
	}
});

function select(state) {
	return state;
}

export default connect(select)(App);
