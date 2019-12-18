import React, { Component } from 'react'

class PeersBar extends Component {
    constructor(props) {
        super(props)//since we are extending class Table so we have to use super in order to override Component class constructor
    }
  
    renderInfo(){
        if (this.props.node){
            var peers = this.props.node.Details._peer
            return peers.map((id) => {
                return <tr><td>{id}</td></tr>
            })
        }
        return (
           <tr/>
        )
    }
    
    render() {
        return (
            <div className="PeersBar">
            <h3 className="title">Peers connected : </h3>
                <table>
                    <tbody>
                        {this.renderInfo()}
                    </tbody>
                </table>
            </div> 
        )
    }
}

export default PeersBar