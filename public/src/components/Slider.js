import React, {PropTypes} from 'react';

function cumulativeOffset(element) {
	var top = 0, left = 0;
	do {
		top += element.offsetTop  || 0;
		left += element.offsetLeft || 0;
		element = element.offsetParent;
	} while(element);

	return {
		top: top,
		left: left
	};
};

export default React.createClass({
	displayName: 'Slider',
	propTypes: {
		value: PropTypes.number.isRequired,
		min: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		step: PropTypes.number,
		onChange: PropTypes.func
	},
	moveProgress(e) {
		const node = this.getDOMNode();
		const {left} = cumulativeOffset(node);
		const ratio = (e.clientX - left) / node.offsetWidth;
		const {min, max, step} = this.props;
		let value = min + (max - min) * ratio;
		if (step) {
			value = Math.round(value / step) * step;
		}
		this.props.onChange(value);
	},
	onMouseMove(e) {
		if (!e.buttons) {
			return;
		}
		this.moveProgress(e);
	},
	render() {
		const {value, min, max} = this.props;
		const styles = {
			left: (value - min) / (max - min) * 100 + '%'
		};
		return <div className="slider" onMouseMove={this.onMouseMove}>
			<div className="slider__progress" onClick={this.moveProgress}></div>
			<div
				className="btn btn-default slider__button"
				style={styles}
				children={value}
			/>
		</div>;
	}
});
