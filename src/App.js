import React from 'react';
import StatusSection from './components/status/StatusSection.js';
import ControlSection from './components/controls/ControlSection.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			connected: false,
			status: "",
			zones: []
		}
	}

	componentDidMount() {
		console.log("App componentDidMount");
		this.connect();
	}

	connect() {
		var ws = this.ws = new WebSocket(this.props.controllerUrl);
		ws.onmessage = this.onMessage.bind(this);
		ws.onopen = this.onOpen.bind(this);
		ws.onclose = this.onClose.bind(this);
	}

	send(msg) {
		this.ws.send(JSON.stringify(msg))
	}

	onMessage(e) {
		console.log("onMessage");
		let data = JSON.parse(e.data);
		switch (data.action) {
			case "status":
				this.setState({status: data.status});
				break;
			case "zones":
				this.setState({zones: data.zones});
				break;
			default:
				break;
		}
	}

	onOpen() {
		console.log("onOpen");
		this.setState({connected: true});
		
		let msg = { action: "status" }
		this.ws.send(JSON.stringify(msg));

		msg = { action: "zones" }
		this.ws.send(JSON.stringify(msg));
	}

	onClose() {
		console.log("onClose");
		this.setState({connected: false});
	}

	close() {
		console.log("close");
		// let msg = {
		// 	action: "close"
		// }
		// this.send(msg)
		this.ws.close();
		// this.setState({connected: false});
	}

	render() {
		let statusProps = {
			watering: this.state.status.watering,
			address: this.state.status.address,
			running_program: this.state.status.running_program,
			program_id: this.state.status.program_id,
			connected: this.state.connected
		}

		let controlProps = {
			connect: this.connect.bind(this),
			connected: this.state.connected,
			close: this.close.bind(this),
			send: this.send.bind(this),
			zones: this.state.zones
		}

		return <div>
			<StatusSection {...statusProps} />
			<ControlSection {...controlProps} />
		</div>;
	}
}

// var props = {
// 	controllerUrl: "ws://sprinkler-controller.globochem.net:4000/socket"
// }

//ReactDOM.render(<App {...props}/>, document.getElementById("container"));

export default App;