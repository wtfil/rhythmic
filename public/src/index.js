import React from 'react'
import Toolbar from './Toolbar'
import Sample from './Sample'
import {FIGURES} from './constans'

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
		return <div className="container">
			<Toolbar onGenerate={this.update}/>
			<Sample order={this.state.order} />
		</div>;

	}
});

React.render(<App/>, document.body);
