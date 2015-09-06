import React from 'react'
import classnames from 'classnames'
import {FIGURES} from '../constans'
import Figure from './Figure'
import Slider from './Slider';

module.exports = React.createClass({
	displayName: 'Toolbar',

	addOrRemoveFigure(figureName) {
		return () => {
			let activeFigures = this.props.activeFigures.slice();
			let index = activeFigures.indexOf(figureName);
			if (index >= 0) {
				activeFigures.splice(index, 1);
			} else {
				activeFigures.push(figureName);
			}
			this.props.onChangeFigures(activeFigures);
		};
	},

	renderFigure(figureName) {
		var figure = FIGURES[figureName];
		return <i onClick={this.addOrRemoveFigure(figureName)}>
			<Figure
				figure={figure}
				active={this.props.activeFigures.indexOf(figureName) !== -1}
			/>
		</i>;
	},

	showCreateModal() {

	},

	render() {
		return <div className="well">
			<div className="row">

				<div className="col-md-7">
					<h4>Figures</h4>
					{Object.keys(FIGURES).map(key => this.renderFigure(key))}
				</div>
				<div className="col-md-2">
					<h4>Methronome</h4>
					<Slider value={this.props.temp} step={1} min={10} max={300} onChange={this.props.onTempChange}/>
				</div>
				<div className="col-md-3">
					<h4>Sequence</h4>
					<div className="btn-group">
						{[1, 2, 4, 8, 16].map(num => {
							return <button
								className={classnames('btn btn-default', {active: num === this.props.figuresCount})}
								onClick={() => this.props.onChangeCount(num)}
								children={num}
								key={num}
							/>
						})}
					</div>
				</div>
			</div>
			<div className="row mt">
				<div className="col-md-4">
					<button className="btn btn-primary" onClick={this.props.onRegenerate}>Regenerate</button>
					<button className="btn btn-warning" onClick={this.showCreateModal}>Create New</button>
					{this.props.isPlaying ?
						<button className="btn btn-warning" onClick={this.props.onPause}>| |</button> :
						<button className="btn btn-warning" onClick={this.props.onPlay}>▶</button>
					}
				</div>
			</div>
		</div>;
	},
});

