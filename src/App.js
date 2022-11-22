import { Component } from "./core";
import {todoList} from './services/todoList/TodoList'
import './components/moleculs/InputGroup/InputGroup'
import './components/moleculs/Task/Task'

export class App extends Component {

  constructor(){
    super()
    this.state = {
      tasks: [],
      isLoading:false,
    }
  }
  
  getTasks(){
    todoList.getTasks().then((data)=>{
      this.setState((state)=>{
        return {
          ...state,
          tasks: data.map((item)=>({...item, isEditting:false})),
      }
      })
      
    })
  }
  
  
  saveTask = (evt) =>{
    todoList.createTask({...evt.detail, isCompleted:false})
      .then(()=>{
        this.getTasks()
      })
  }
  
  deleteTask = (id) => {
    todoList.deleteTask(id)
    .then(()=>{
      this.getTasks()
    })
  }

  onClick =(evt)=>{
    const target = evt.target;
    if(target.closest('.delete-action')){
      const data = target.dataset // нужен для data-id
      this.deleteTask(data.id)   
    }
  }

  componentDidMount(){
    this.getTasks()
    this.addEventListener('save-task',this.saveTask)
    this.addEventListener('click',this.onClick)

  }
  componentWillUnmount(){
    this.removeEventListener('save-task',this.saveTask)
    this.removeEventListener('click',this.onClick)

  }

  render() {
    return `
      <div class='container mt-5'>
        <my-input-group type='save-task'></my-input-group>
      </div>
      <ul class="list-group">
        ${this.state.tasks.map((task)=>{
        return`
            <my-task id="${task.id}" title="${task.title}" iscompleted="${task.isCompleted}"></my-task>
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