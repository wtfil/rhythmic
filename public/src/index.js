import React from 'react'
import {FIGURES} from './constans';
import Sample from './Sample';

var Settings = React.createClass({
	getInitialState() {
		return {
			figureCount: 4
		};
	},
	render() {
		return <div>
			<label for="">Repeats:</label>
			<input type="" value={this.state.figureCount} onChange={this.changeCount}/>
			<button onClick={this.generate}>Generate</button>
		</div>;
	},
	changeCount(e) {
		var num = Number(e.target.value);
		if (num) {
			this.setState({figureCount: num});
		}
	},
	generate() {
		var names = Object.keys(FIGURES);
		var figures = [];
		var index, i;
		for (i = 0; i < this.state.figureCount; i++) {
			index = Math.round(Math.random() * (names.length - 1));
			figures.push(FIGURES[names[index]]);
		}
		this.props.onGenerate(figures)
	}
});

var App = React.createClass({
	getInitialState() {
		return {
			order: [
				FIGURES.f1, FIGURES.f2, FIGURES.f3, FIGURES.f4
			]
		};
	},
	update(order) {
		this.setState({order: order});
	},
	render() {
		return <div>
			<Settings onGenerate={this.update}/>
			<Sample order={this.state.order} />
		</div>;

	}
});

React.render(<App/>, document.body);
