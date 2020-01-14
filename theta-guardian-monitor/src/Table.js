import React, { Component } from 'react'

class Table extends Component {
   constructor(props) {
      super(props)//since we are extending class Table so we have to use super in order to override Component class constructor
   }

   handleClick(i) {
      this.props.onClick(i);
   }
   
   renderTableData() {
      return this.props.nodes.map((node, index) => {
         var i = index
         var bcolor = "background-normal"
         this.props.connected.forEach((num) => {
            if (i === num) {
               bcolor = "background-red"
            }
         })
         if (this.props.chosen && node._id === this.props.chosen._id) {
            bcolor = "background-blue"
         }
         return (
            <tr key={node._id} className={bcolor}>
               <td>{i+1}</td>
               <td>{node._address}</td>
               <td>{node._ip}</td>
               <td>{node._city}</td>
               <td>{node._country}</td>
               <td>{node._peer.length}</td>
               <td>{node._version}</td>
               <td>
                  <button className="showPeersButtton" onClick={() => this.props.onClick(i)} >
                     Show Details 
                  </button>
               </td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["INDEX","ADDRESS","IP","CITY","Country","Peers","VERSION"]
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      if (this.props.nodes){
         return (
            <div className='nodeTable'>
               <h1>Guardian Node Table( Page : {this.props.page} )</h1>
                  <button className="pageButtton" onClick={() => this.props.changePage(-1)} >
                     Pre
                  </button>
                  <button className="pageButtton" onClick={() => this.props.changePage(1)} >
                     Next
                  </button>

               <table>
                   <tbody>
                       <tr>{this.renderTableHeader()}</tr>
                       {this.renderTableData()}
                   </tbody>
               </table>
            </div>
         )
      }
      return(
         <div/>
      )
   }
}

export default Table