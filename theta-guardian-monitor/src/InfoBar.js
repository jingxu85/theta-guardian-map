import React, { Component } from 'react'

class InfoBar extends Component {
    renderInfo(){
        if (this.props.node){
            return(
                <table>
                    <tr><td> Peer ID is {this.props.node.Details._id}</td></tr>
                    <tr><td> Chain ID is {this.props.node.Details._chain_id}</td></tr>
                    <tr><td> LatestFinalizedBlockHeight is {this.props.node.Details._lastheight}</td></tr>
                    <tr><td> Syncing is {this.props.node.Details._syncing}</td></tr>
                    <tr><td> Latitude is {this.props.node.Details._latitude}</td></tr>
                    <tr><td> Longitude is {this.props.node.Details._longitude}</td></tr>
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