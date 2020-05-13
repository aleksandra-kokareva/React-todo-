import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Todo} from '../type'

import '../ModalWindow/modal.css'

interface ModalProps {
 
    content: Todo| undefined
    onClose(id: any): void
    deleteItem(): void
    
     
}


const modalRoot = document.getElementById("root-modal") as HTMLElement;

export default class ModalWindow extends Component<ModalProps, {}> {
   
  el: HTMLElement = document.createElement("div");

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render(): JSX.Element {
    return ReactDOM.createPortal(
        // <div className="modal fade">
      <div className="modal ">
      <div className=" modal-dialog">
           <div className="modal-content">
              <div className="modal-header">
                  <h3 className="modal-title">Delete Item</h3>
                </div>
              <div className="modal-body">
              <p>Do you want delete {this.props.content?.label}?</p>
  
               </div>
               <div className="modal-footer">
                   <button className="btn btn-primary" onClick = {this.props.deleteItem}>Delete</button>
                   <button className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onClose}>Close
                   </button>
               </div>
              </div></div>
            {/* </div>  */}
           
      {this.props.children} </div> , 
      this.el);
}

      
 
  
}
    



// const modalRoot = document.getElementById("modal-root") as HTMLElement;
// // assuming in your html file has a div with id 'modal-root';

// export class Modal extends React.Component {
//   el: HTMLElement = document.createElement("div");

//   componentDidMount() {
//     modalRoot.appendChild(this.el);
//   }

//   componentWillUnmount() {
//     modalRoot.removeChild(this.el);
//   }

//   render() {
//     return ReactDOM.createPortal(this.props.children, this.el);
//   }
// }

// render(): JSX.Element {
//   return ReactDOM.createPortal(
//       // <div className="modal" id="myModal">
//       <div className="modal-dialog">
//            <div className="modal-content">
//               <div className="modal-header">
//                   <h3 className="modal-title">Delete Item</h3>
//                 </div>
//               <div className="modal-body">
//               <p>Do you want delete {this.props.content?.label}?</p>
  
//                </div>
//                <div className="modal-footer">
//                    <button className="btn btn-primary" onClick = {this.props.deleteItem}>Delete</button>
//                    <button className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onClose}>Close
//                    </button>
//                </div>
//               </div>
//             {/* </div>  */}
           
//       {this.props.children} </div> , 
//       this.el);
// }
// }



