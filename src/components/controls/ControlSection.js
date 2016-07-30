import React from 'react';
import Controls from './Controls.js';

class ControlSection extends React.Component{
	handleConnect() {
		this.props.connect()
	}

	render() {
		if (this.props.connected) {
			let controlsProps = {
				close: this.props.close,
				send: this.props.send,
				zones: this.props.zones
			}

			return <Controls {...controlsProps} />;
		} else {
			//return <button onClick={this.handleConnect.bind(this)} >Connect</button>;
			return <div>If you can read this, there's a problem</div>;
		}
	}
}

export default ControlSection