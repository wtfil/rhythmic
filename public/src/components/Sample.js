import React from 'react'
import {Spring, TransitionSpring} from 'react-motion'
import classnames from 'classnames'
import Figure from './Figure';

module.exports = React.createClass({
	displayName: 'Sample',

	render() {
		return <div>
			{this.props.sequence.map((figure, figureIndex) => {
				return <TransitionSpring
					endValue={{val: 0}}
					willEnter={() => {console.log(1); return {val: -100}}}
					willLeave={() => {val: 100}}>
					{current =>
						<div style={{display: 'inline-block', transform: `translate3d(0, ${current.val}px, 0)` }} >
							<Figure
								figure={figure}
								currentNote={this.props.figureIndex === figureIndex && this.props.noteIndex}
							/>
						</div>
					}
				</TransitionSpring>
			})}
		</div>
	}
});

React.createClass({
	displayName: 'Sample',

	render() {
		return <div>
			{this.props.sequence.map((figure, figureIndex) => {
				return <Spring defaultValue={{val: -100}} endValue={{val: 0}}>
					{x =>
						<div style={{display: 'inline-block', transform: `translate3d(0, ${x.val}px, 0)` }} >
							<Figure
								figure={figure}
								currentNote={this.props.figureIndex === figureIndex && this.props.noteIndex}
							/>
						</div>
					}
				</Spring>
			})}
		</div>
	}
});
