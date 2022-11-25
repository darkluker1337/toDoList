import { Database } from "../database/Database";

class TodoList {
  constructor(){
   this.database = Database.getInstance()
  }
  
  createTask(body){
    return this.database.create('tasks',body);
  }
  
  getTasks(){
    return this.database.read('tasks')
  }
  
  updateTask(id,body){
    return this.database.update('tasks',id,body)
  }
  
  deleteTask(id){
    return this.database.delete('tasks',id)
  }
}

export const todoList = new TodoList()