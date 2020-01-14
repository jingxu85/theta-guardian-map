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
      this.page = 0;
      this.aMap = {};
      this.chosenNode = null;
      this.state = { nodes : [], chosen : this.chosenNode, connected : [], page : 0};
  }
  
  async loadTable() {
    // pagination
    const test_response = await fetch('http://guardian-metrics.thetatoken.org:9000/peers/testdb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ page: this.page, amount: 100}),
    });
    var resJson = await test_response.json();
    console.log("for test DB, response is ", resJson);
    if (resJson && resJson.length > 0) {
      for (let i = 0; i < resJson.length; i++) {
        this.aMap[resJson[i]._id] = i;
      }
      this.Nodes = resJson;
      this.setState({nodes : this.Nodes, chosen : this.chosenNode, connected : this.createConn(this.chosenNode), page : this.page})
    } else if (this.page > 0) {
      this.page--;
      alert("last page");
    }
  }

  componentDidMount() {
    this.loadTable();
  };

  handleClick(i) {
    this.chosenNode = this.Nodes[i];
    this.setState({nodes : this.Nodes, chosen : this.chosenNode, connected : this.createConn(this.chosenNode)});
  };

  handlePage(change) {
    this.page += change;
    if (this.page < 0) {
      this.page = 0;
    }
    this.loadTable();
  }

  createConn(node) {
    var conn = [];
    if (node) {
      node._peer.forEach((id) => {
        if (this.aMap[id] !== undefined) {
           conn.push(this.aMap[id]);
        }
      });  
    }
    return conn;
  }

  render() {
    return (
      <div className="App">
        <Table page={this.state.page} nodes={this.state.nodes} connected = {this.state.connected} 
          onClick={i => this.handleClick(i)} chosen={this.state.chosen} changePage={i => this.handlePage(i)}/>
        <Map node={this.state.chosen} />
        <InfoBar node={this.state.chosen}/>
        <PeersBar node={this.state.chosen} />
      </div>
    );
  }
}

export default App;