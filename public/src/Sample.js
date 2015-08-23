import React from 'react'
import classnames from 'classnames'
import {EIGHT, SIXTEEN, DURATIONS} from './constans'
import {playOpen} from './audio';
import Figure from './Figure';

module.exports = React.createClass({
	displayName: 'Sample',

	getInitialState() {
		return {
			currentGroup: 0,
			currentNote: 0
		};
	},
	componentWillReceiveProps(newProps) {
		clearTimeout(this.updateTimeout);
		this.setState(this.getInitialState(), this.update);
	},

	componentWillMount() {
		this.update();
	},
	componentWillUnmount() {
		clearTimeout(this.updateTimeout);
	},
	update() {
		var {currentNote, currentGroup} = this.state;
		var {order} = this.props;
		var delay = 4000 * DURATIONS[order[currentGroup][currentNote]];

		var note = currentNote + 1;
		var group = currentGroup;
		if (note > order[currentGroup].length - 1) {
			note = 0;
			group ++;
		}
		if (group > order.length - 1) {
			group = 0;
		}
		playOpen().then(() => {
			this.updateTimeout = setTimeout(() => {
				this.setState({
					currentGroup: group,
					currentNote: note
				});
				this.update();
			}, delay);
		});
	},
	render() {
		return <div>
			{this.props.order.map((figure, groupIndex) => {
				return <Figure
					figure={figure}
					currentNote={this.state.currentGroup === groupIndex && this.state.currentNote}
				/>;
			})}
		</div>
	}
});
