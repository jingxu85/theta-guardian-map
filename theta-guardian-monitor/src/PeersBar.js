import React, { Component } from 'react'

class PeersBar extends Component {
    constructor(props) {
        super(props);
    }

    renderInfo(){
        if (this.props.node){
            var peers = this.props.node._peer
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