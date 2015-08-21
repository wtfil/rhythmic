import React from 'react'
import classnames from 'classnames'

var EIGHT = '1/8';
var SIXTEEN = '1/16';
var figures = {
	f1: [EIGHT, EIGHT],
	f2: [SIXTEEN, SIXTEEN, EIGHT],
	f3: [EIGHT, SIXTEEN, SIXTEEN],
	f4: [SIXTEEN, EIGHT, SIXTEEN]
};

var Sample = React.createClass({
	getInitialState() {
		return {
			currentGroup: 0,
			currentNote: 0
		};
	},
	componentWillMount() {
		setInterval(() => {
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
	render() {
		return <div>
			{this.props.order.map((figure, groupIndex) => {
				return <div className="note-group">
					{figure.map((note, noteIndex) => {

						console.log(groupIndex * 4 + noteIndex, this.state.current);
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
})

var App = React.createClass({
	render() {
		return <Sample order={[figures.f1, figures.f2, figures.f3, figures.f4]} />;
	}
});

React.render(<App/>, document.body);
