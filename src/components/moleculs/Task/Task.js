import { Component } from "../../../core";

export class Task extends Component{

  constructor(){
    super()
    this.state = {
     isEditting: false
    }
  }

  static get observedAttributes(){
   return ['title','id','iscompleted']
  }

 onClick=(evt)=>{
   const target = evt.target;
   if(target.closest('.edit-action'))
   {
     this.setState((state)=>{
      return{
       ...state,
       isEditting:true
      }
     })
   }
 }
 /*
 
  togelEding = ()=>{
    this.setState((state)=>{
      return{
        ...state,
        isEditting: !state.isEditting
      }
    })
  }
 
 
 
   onClick=(evt)=>{
   const target = evt.target;
   if(target.closest('.edit-action'))
   {
     this.togelEding()
   }
   if(target.closest('.cansel'))
   {
     this.togelEding()
   }
 }

  создаем функцию togle и упр. ей через онКлик (это другой вариант решения работы кнопки едит) 
 */
 
 
 onClickCansel =(evt)=>{
  const target = evt.target;
  if(target.closest('.btn-outline-secondary'))
  {
    this.setState((state)=>{
     return{
      ...state,
      isEditting:false
     }
    })
  }
}
 
  componentDidMount(){
    this.addEventListener('click',this.onClick)
    this.addEventListener('click',this.onClickCansel)
  }
  componentWillUnmount(){
   this.removeEventListener('click',this.onClick)
   this.removeEventListener('click',this.onClickCansel)

  }
   render(){
     return`
     <li class="list-group-item">
      <div class="form-check d-flex justify-content-between align-items-center">
       ${this.state.isEditting 
       ? `<my-input-group type="edit-task" isshowcanselbutton='true' taskid=${this.props.id}  value='${this.props.title}'></my-input-group>`
       : `
        <div>
            <input 
                class="form-check-input" 
                type="checkbox" ${this.props.isCompleted ? 'checked' : ''} 
                value="" 
                id="${this.props.id}">
            <label 
              class="form-check-label" 
              for="${this.props.id}">
               ${this.props.title}
            </label>
          </div>
          <div class='d-flex'>
            <button data-id="${this.props.id}" class="btn btn-danger btn-sm m-2 delete-action">Delete</button>
            <button data-id="${this.props.id}" class="btn btn-primary btn-sm m-2 edit-action">Update</button>
          </div> `}
       </div>
    </li>
     ` 
   }
}

customElements.define('my-task',Task)