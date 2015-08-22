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
			}, this.generate);
		};
	},

	changeCount(count) {
		return () => {
			this.setState({
				figureCount: count
			}, this.generate);
		}
	},

	renderFigure(figureName) {
		var figure = FIGURES[figureName];
		// TODO remove copypast
		return <div className="note-group">
			{figure.map((note, index) => {
				var classes = classnames({
					note: true,
					eight: note === EIGHT,
					sixteen: note === SIXTEEN,
					current: this.state.activeFigures[figureName]
				});
				return <div key={index} onClick={this.addOrRemoveFigure(figureName)} className={classes} />;
			})}
		</div>
	},

	render() {
		return <div className="well">
			<div className="row">

				<div className="col-md-4">
					<h4>Figures</h4>
					{Object.keys(FIGURES).map(key => this.renderFigure(key))}
				</div>
				<div className="col-md-4 btn-toolbar" role="toolbar" >
					<h4>Repeats</h4>
					{[1, 2, 4, 8, 16].map(num => {
						return <button
							className={classnames('btn btn-default', {active: num === this.state.figureCount})}
							onClick={this.changeCount(num)}
							children={num}
							key={num}
						/>
					})}
				</div>
			</div>
			<div className="row mt">
				<div className="col-md-4">
					<button className="btn btn-primary" onClick={this.generate}>Regenerate</button>
				</div>
			</div>
		</div>;
	},
});

