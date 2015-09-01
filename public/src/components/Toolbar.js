import React from 'react'
import classnames from 'classnames'
import {FIGURES} from '../constans'
import Figure from './Figure'

module.exports = React.createClass({
	displayName: 'Toolbar',

	getInitialState() {
		return {
			figuresCount: this.props.figuresCount,
			activeFigures: this.props.activeFigures
		};
	},

	addOrRemoveFigure(figureName) {
		return () => {
			let activeFigures = this.state.activeFigures.slice();
			let index = activeFigures.indexOf(figureName);
			if (index >= 0) {
				activeFigures.splice(index, 1);
			} else {
				activeFigures.push(figureName);
			}
			this.setState({ activeFigures });
			this.props.onChangeFigures(activeFigures);
		};
	},

	changeCount(figuresCount) {
		return () => {
			this.setState({figuresCount});
			this.props.onChangeCount(figuresCount);
		}
	},

	renderFigure(figureName) {
		var figure = FIGURES[figureName];
		return <i onClick={this.addOrRemoveFigure(figureName)}>
			<Figure
				figure={figure}
				active={this.state.activeFigures.indexOf(figureName) !== -1}
			/>
		</i>;
	},

	render() {
		return <div className="well">
			<div className="row">

				<div className="col-md-8">
					<h4>Figures</h4>
					{Object.keys(FIGURES).map(key => this.renderFigure(key))}
				</div>
				<div className="col-md-4 btn-toolbar" role="toolbar" >
					<h4>Sequence</h4>
					{[1, 2, 4, 8, 16].map(num => {
						return <button
							className={classnames('btn btn-default', {active: num === this.state.figuresCount})}
							onClick={this.changeCount(num)}
							children={num}
							key={num}
						/>
					})}
				</div>
			</div>
			<div className="row mt">
				<div className="col-md-4">
					<button className="btn btn-primary" onClick={this.props.onRegenerate}>Regenerate</button>
				</div>
			</div>
		</div>;
	},
});

