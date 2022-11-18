import { Component } from "../../../core";
import "../../atomcs/Button/Button"
import "../../atomcs/Input/Input"
import { todoList } from "../../../services/todoList/TodoList";
import "../../atomcs/Spinner/Spinner"
import "./InpuGroup.scss"
export class InputGroup extends Component{
 
   constructor(){
     super();
    
     this.state = {
       inputValue: '',
       isloading:false,
       error:''
     }
   }
   
   onSave(){
     if(this.state.inputValue){
        this.setState((state)=>{
          return{
            ...state,
            isloading:true
          }
        })
       todoList.createTask({
         title: this.state.inputValue,
         isCompleted: false,
       }).then(()=>{
          this.setState((state)=>{
            return{
              ...state,
              isloading:false,
              inputValue:'',
            }
         })
         throw new Error('Ошибочка')
       })
       .catch((e)=>{
          this.setState((state)=>{
            return{
              ...state,
              error: e.message
            }
          })
       })
       .finally(()=>{
        this.setState((state)=>{
          return{
            ...state,
            isloading:false,
            inputValue:'',
          }
       })
     })
     }
   }
   
   onInput(evt){
    this.setState((state)=>{
     return{
      ...state,
      inputValue: evt.detail.value
     }
    })
   }
   
   componentDidMount(){
      this.addEventListener('save-task',this.onSave)
      this.addEventListener('custom-input', this.onInput)
   }

   render(){
    return `
    <div>${this.state.error}</div>
    <div class="input-group mb-3">
      <my-input value="${this.state.inputValue}" placeholder="Add a new task" type="text"></my-input>
      <my-button eventtype='save-task' content="save" class="btn btn-outline-primary" type="button" id="button-addon2"></my-button>
    </div>
    <my-spinner class ="${this.state.isloading ? 'load' : 'notload'}"></my-spinner>
    
   `
   
   }
}

customElements.define('my-input-group',InputGroup)