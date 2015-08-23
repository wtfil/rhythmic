import React from 'react'
import classnames from 'classnames'
import {EIGHT, SIXTEEN, SIXTEEN3} from './constans'

module.exports = React.createClass({
	displayName: 'Figure',
	render() {
		return <div className="note-group">
			{this.props.figure.map((note, index) => {
				var classes = classnames({
					note: true,
					eight: note === EIGHT,
					sixteen: note === SIXTEEN,
					sixteen3: note === SIXTEEN3,
					current: this.props.currentNote === index ||
						this.props.active
				});
				return <div key={index} className={classes} />;
			})}
		</div>
	}
});
