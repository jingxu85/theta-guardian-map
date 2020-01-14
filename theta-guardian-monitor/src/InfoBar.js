import React, { Component } from 'react'

class InfoBar extends Component {
    renderInfo(){
        if (this.props.node){
            return(
                <table>
                    <tr><td> Peer ID is {this.props.node._id}</td></tr>
                    <tr><td> Chain ID is {this.props.node._chain_id}</td></tr>
                    <tr><td> LatestFinalizedBlockHeight is {this.props.node._lastheight}</td></tr>
                    <tr><td> Git Hash is {this.props.node._git_hash}</td></tr>
                    <tr><td> Syncing is {this.props.node._syncing}</td></tr>
                    <tr><td> Latitude is {this.props.node._latitude}</td></tr>
                    <tr><td> Longitude is {this.props.node._longitude}</td></tr>
                </table>
            )
        }
        return (
           <p/>
        )
    }

    render() {
        return (
            <div className="InfoBar">
                <h3 className="title">Details : </h3>
                    {this.renderInfo()}
            </div> 
        )
    }
}

export default InfoBar