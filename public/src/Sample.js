import React from 'react'
import classnames from 'classnames'
import {EIGHT, SIXTEEN} from './constans'

module.exports = React.createClass({
	displayName: 'Sample',

	getInitialState() {
		return {
			currentGroup: 0,
			currentNote: 0
		};
	},
	componentWillReceiveProps() {
		this.setState(this.getInitialState());
	},
	componentWillMount() {
		this.interval = setInterval(() => {
			var note = this.state.currentNote + 1;
			var group = this.state.currentGroup;
			if (note > this.props.order[this.state.currentGroup].length - 1) {
				note = 0;
				group ++;
			}
			if (group > this.props.order.length - 1) {
				group = 0;
			}
			this.setState({
				currentGroup: group,
				currentNote: note

			});
		}, 300);

	},
	componentWillUnmount() {
		clearInterval(this.interval);
	},
	render() {
		return <div>
			{this.props.order.map((figure, groupIndex) => {
				return <div className="note-group">
					{figure.map((note, noteIndex) => {
						var classes = classnames({
							note: true,
							eight: note === EIGHT,
							sixteen: note === SIXTEEN,
							current: this.state.currentGroup === groupIndex &&
								this.state.currentNote === noteIndex
						});
						return <div className={classes} />;
					})}
				</div>
			})}
		</div>
	}
});
