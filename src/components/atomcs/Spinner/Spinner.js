import { Component } from "../../../core";

export class Spinner extends Component{
  constructor(){
    super();
    
  } 
   
  
   
  render(){
   
   const {classname} = this.props
   
   return`
       <div class="spinner-border" role="status">
         <span ></span>
       </div>
   `
  }
}
customElements.define('my-spinner',Spinner)