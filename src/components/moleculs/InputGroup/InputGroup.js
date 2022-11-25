import { Component } from "../../../core";

import { todoList } from "../../../services/todoList/TodoList";
import "./InpuGroup.scss"
export class InputGroup extends Component {



  onSumbit = (evt) => {
    evt.preventDefault()
    const data = new FormData(evt.target);
    const task = {}
    
    if(this.props.taskid){
        data.append('id',this.props.taskid)
    }
    
    data.forEach((value,key)=>{
      task[key] = value;
    })
    this.dispatch(this.props.type,task)
  }

  componentDidMount() {
    this.addEventListener('submit', this.onSumbit)
  }
  componentWillUnmount() {
    this.removeEventListener('submit', this.onSumbit)
  }

  static get observedAttributes(){
    return ['type','value','isshowcanselbutton','taskid']
  }

  render() {
    return `
    <form class="input-group mb-3">
      <input
      cansel=""
      name="title"
      type='text'
      class='form-control'
      placeholder='Add new task'
      value="${this.props.value ?? ''}"
      >
      <button type='submit' class="btn btn-outline-primary update">Save</button>
      ${this.props.isshowcanselbutton 
          ? `<button type='button' class="btn btn-outline-primary btn-outline-secondary">Cansel</button>` 
          : ''
          
      }
    </form>
  
    
   `

  }
}

customElements.define('my-input-group', InputGroup)

{/* <div>${this.state.error}</div> */ }
// {<my-spinner class ="${this.state.isloading ? 'load' : 'notload'}"></my-spinner>}