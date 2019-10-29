import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Paho from 'paho-mqtt'

var MQTT_HOST = "test.mosquitto.org"
var MQTT_PORT = 8081
var MQTT_TOPIC = "bvgs"


var client = new Paho.Client(MQTT_HOST, MQTT_PORT, "clientId");


client.connect({
  useSSL: true,
  onSuccess: function () {
    console.log('connected to broker')
    client.subscribe(MQTT_TOPIC)
  }
});


class App extends Component{

  state = {
    message: ''
  }

  componentDidMount() {

    client.onMessageArrived = (message) => {
      console.log(message)
      this.setState({ message: message.payloadString })
    };
  }

  render() {
    const { message } = this.state
    return (
      <div className="App" >
        <header className="App-header">
          {message}
      </header>
      </div>
    )
  }
}

export default App;
