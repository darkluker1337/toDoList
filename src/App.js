import { Component } from "./core";
import {todoList} from './services/todoList/TodoList'
import './components/moleculs/InputGroup/InputGroup'

export class App extends Component {

  constructor(){
    super()
    this.state = {
      tasks: []
    }
  }
  
  componentDidMount(){
    todoList.getTasks().then((data)=>{
      this.setState((state)=>{
        return {
          ...state,
          tasks: data,
      }
      })
      
    })
  }

  render() {
    return `
      <div class='container mt-5'>
        <my-input-group></my-input-group>
      </div>
      <ul class="list-group">
        ${this.state.tasks.map((task)=>{
        return`
            <li class="list-group-item">
            <div class="form-check d-flex justify-content-between align-items-center">
              <div>
                  <input class="form-check-input" type="checkbox" ${task.isCompleted ? 'checked' : ''} value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                     ${task.title}
                  </label>
                </div>
                <div class='d-flex'>
                  <button type="button" class="btn btn-danger btn-sm">Delete</button>
                  <button type="button" class="btn btn-primary btn-sm">Update</button>
                </div>
            </div>
          </li>
            `
        
        }).join(' ')}
      </ul>
        `
  }
}

customElements.define("my-app", App);


{/* <ul class="list-group">
          <li class="list-group-item">
            <div class="form-check d-flex justify-content-between align-items-center">
              <div>
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    Default checkbox
                  </label>
                </div>
                <div class='d-flex'>
                  <button type="button" class="btn btn-danger btn-sm">Delete</button>
                  <button type="button" class="btn btn-primary btn-sm">Update</button>
                </div>
            </div>
          </li>
        </ul>
      </div> */}