import React, { Component } from "react";
import Table from './Table.js'
import Map from './Map.js'
import InfoBar from './InfoBar.js'
import PeersBar from './PeersBar.js'
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { nodes : [], chosen : -1, connected : []};
  }

  async callAPI() {
    const response = await fetch('http://34.220.181.170:9000/peers/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ example: 'data' }),
    })
    var resJson = await response.json()
    var nodes = resJson.Nodes
     if (nodes && nodes.length > 0) {
      var map = {}
      nodes.map((node, index) => {
        map[node.Details._id] = index
      })
      this.aMap = map
      this.Nodes = nodes
      this.setState({nodes : nodes, chosen : -1, conn : []})
    }
  }
  
  componentDidMount() {
    this.callAPI();
  }

  handleClick(i) {
    var conn = []
    var node = this.Nodes[i]
    node.Details._peer.map((id) => {
       if (this.aMap[id] !== undefined) {
          conn.push(this.aMap[id])
       }
    })
    this.setState({nodes : this.Nodes, chosen : i, connected : conn})
  }

  render() {
    console.log(this.state.nodes)
    return (
      <div className="App">
        <Table nodes={this.state.nodes} connected = {this.state.connected} onClick={i => this.handleClick(i)} chosen={this.state.chosen}/>
        <Map node={this.state.nodes[this.state.chosen]}/>
        <InfoBar node={this.state.nodes[this.state.chosen]}/>
        <PeersBar node={this.state.nodes[this.state.chosen]} />
      </div>
    );
  }
}

export default App;