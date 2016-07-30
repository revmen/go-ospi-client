import React from 'react';
//var _ = require('underscore-node');

class StatusSection extends React.Component {

	watering() {
		if (this.props.watering) {
			return "Watering " + this.props.address;
		} else {
			return "Idle";
		}
	}

	render() {
		return (
			<div>
				<div>{this.props.connected ? 'Connected' : 'Not Connected'}</div>
				<div>{this.watering()}</div>
			</div>
			)
	}
}

export default StatusSection