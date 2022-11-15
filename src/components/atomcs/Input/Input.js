import { Component } from "../../../core";
import { debounce } from "../../../Utils/debounce";

export class Input extends Component{
  constructor(){
   super()
   this.state={
     value:'',
   };
   
   this.OnInput = this.OnInput.bind(this)
  }
  componentWillUpdate(name,_,newValue){
    if(name === 'value'){
      this.setState((state)=>{
        return {
         ...state,
         value: newValue
        }
      })
    }
  }
   
  static get observedAttributes(){
   return ['type','placeholder','value']
  }
   
  OnInput(evt){
    this.dispatch('custom-input', {value: evt.target.value})
  }
   
  componentDidMount(){
   this.addEventListener('input', debounce(this.OnInput, 1000))
  }
   
   
  render(){
    return ` 
    <input 
    type="${this.props.type}" 
    class="form-control" 
    placeholder="${this.props.placeholder}" 
    value="${this.state.value}"
    />
`
  }
}

customElements.define('my-input',Input)