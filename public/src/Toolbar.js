import React from 'react'
import classnames from 'classnames'
import assign from 'object-assign'
import {FIGURES, EIGHT, SIXTEEN} from './constans';

module.exports = React.createClass({
	displayName: 'Toolbar',

	getInitialState() {
		return {
			figureCount: 4,
			activeFigures: assign({}, FIGURES)
		};
	},

	changeCount(e) {
		var num = Number(e.target.value);
		if (num) {
			this.setState({figureCount: num});
		}
	},

	generate() {
		var names = Object.keys(FIGURES).filter(figureName => {
			return this.state.activeFigures[figureName];
		});
		var figures = [];
		var index, i;
		for (i = 0; i < this.state.figureCount; i++) {
			index = Math.round(Math.random() * (names.length - 1));
			figures.push(FIGURES[names[index]]);
		}
		this.props.onGenerate(figures)
	},

	addOrRemoveFigure(figureName) {
		return () => {
			this.setState({
				activeFigures: assign({}, this.state.activeFigures, {
					[figureName]: !(this.state.activeFigures[figureName])
				})
			});
		};
	},

	renderFigure(figureName) {
		var figure = FIGURES[figureName];
		// TODO remove copypast
		return <div className="note-group">
			{figure.map(note => {
				var classes = classnames({
					note: true,
					eight: note === EIGHT,
					sixteen: note === SIXTEEN,
					current: this.state.activeFigures[figureName]
				});
				return <div onClick={this.addOrRemoveFigure(figureName)} className={classes} />;
			})}
		</div>
	},

	render() {
		return <div className="jumbotron">
			<div>
				{Object.keys(FIGURES).map(key => this.renderFigure(key))}
			</div>
			<div className="btn-toolbar" role="toolbar" >
				{[1, 2, 4, 8].map(num => {
					return <button
						className={classnames('btn btn-default', {active: num === this.state.figureCount})}
						onClick={() => this.setState({figureCount: num})}
						children={num}
					/>
				})}
			</div>
			<button className="btn btn-primary" onClick={this.generate}>Generate</button>
		</div>;
	},
});

