import React from 'react';

class Controls extends React.Component {

	startProgram() {
		let msg = {
			action: "start_program"
		}
		this.props.send(msg);
	}

	startZone(address, time) {
		let msg = {
			action: "run",
			address: address,
			time: time
		}
		this.props.send(msg)
	}

	handleClose() {
		this.props.close();
	}

	stop() {
		let msg = {
			action: "stop"
		}
		this.props.send(msg)
	}

	row(z) {
		return (
		<tr key={z.address}>
			<td>{z.name}</td>
			<td><button onClick={() => this.startZone(z.address, 30)}>30 sec</button></td>
			<td><button onClick={() => this.startZone(z.address, 300)}>5 min</button></td>
			<td><button onClick={() => this.startZone(z.address, 600)}>10 min</button></td>
			<td><button onClick={() => this.startZone(z.address, 1200)}>20 min</button></td>
		</tr>
		)
	}

	render() {
		let rows = [];
		for (var i=0; i < this.props.zones.length; i++) {
			rows.push(this.row(this.props.zones[i]))
		}
		rows.push(<tr><td colSpan="5"><button onClick={this.startProgram.bind(this)}>Start Program</button></td></tr>)
		rows.push(<tr><td colSpan="5"><button onClick={this.stop.bind(this)}>Stop</button></td></tr>)
		//rows.push(<tr><td colSpan="5"><button onClick={this.handleClose.bind(this)} >Disconnect</button></td></tr>)

		return (
			<table>
				<tbody>
				{rows}
				</tbody>
			</table>
		)
	}
}

export default Controls