import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';

var props = {
	controllerUrl: "ws://sprinkler-controller.globochem.net:4000/socket"
}

ReactDOM.render(
  <App {...props}/>,
  document.getElementById('root')
);
