import React from 'react'
import classnames from 'classnames'
import Figure from './Figure';

module.exports = React.createClass({
	displayName: 'Sample',

	render() {
		return <div>
			{this.props.sequence.map((figure, figureIndex) => {
				return <Figure
					figure={figure}
					currentNote={this.props.figureIndex === figureIndex && this.props.noteIndex}
				/>;
			})}
		</div>
	}
});
