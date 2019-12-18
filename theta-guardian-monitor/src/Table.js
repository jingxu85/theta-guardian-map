import React, { Component } from 'react'

class Table extends Component {
   constructor(props) {
      super(props)//since we are extending class Table so we have to use super in order to override Component class constructor
   }

   handleClick(i) {
      this.props.onClick(i)
   }
   
   renderTableData() {
      console.log(this.props.nodes)
      return this.props.nodes.map((node, index) => {
         var details = node.Details;
         var i = index
         var bcolor = "background-normal"
         this.props.connected.map((num) => {
            if (i === num) {
               bcolor = "background-red"
            }
         })
         if (i === this.props.chosen) {
            bcolor = "background-blue"
         }
         return (
            <tr key={details._id} className={bcolor}>
               <td>{details._address}</td>
               <td>{details._ip}</td>
               <td>{details._city}</td>
               <td>{details._country}</td>
               <td>{details._peer.length}</td>
               <td>
                  <button className="showPeersButtton" onClick={() => this.handleClick(i)} >
                     Show Details 
                  </button>
               </td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = ["ADDRESS","IP","CITY","Country","Peers"]
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
      if (this.props.nodes){
         return (
            <div className='nodeTable'>
               <h1>Guardian Node Table</h1>
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