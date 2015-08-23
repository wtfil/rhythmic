import React from 'react'
import classnames from 'classnames'
import {EIGHT, SIXTEEN, SIXTEEN3, THREEOLE} from './constans'

module.exports = React.createClass({
	displayName: 'Figure',
	render() {
		var {figure} = this.props;
		var classes = classnames('note-group', {
			triple: figure[0] === THREEOLE
		});
		return <div className={classes}>
			{figure.map((note, index) => {
				var classes = classnames({
					note: true,
					eight: note === EIGHT,
					sixteen: note === SIXTEEN,
					sixteen3: note === SIXTEEN3,
					threeole: note === THREEOLE,
					current: this.props.currentNote === index ||
						this.props.active
				});
				return <div key={index} className={classes} />;
			})}
		</div>
	}
});
