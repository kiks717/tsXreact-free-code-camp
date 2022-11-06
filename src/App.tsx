import React, { useState } from 'react'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import './App.css'
import { Todo } from './components/model'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completed, setCompleted] = useState<Todo[]>([])

  const handleAdd = (e : React.FormEvent) => {
    e.preventDefault()
    if(todo){
      setTodos([...todos, {id: Date.now(), todo : todo, isDone:false}])
      setTodo("");
    }
  }
    const onDragEnd = (result:DropResult) => {
      const {source, destination} = result;
      if(!destination) return;
      if(destination.droppableId === source.droppableId &&
        destination.index === source.index
        )
        return;
        let add,
        active = todos, 
        complete =  completed;
        if(source.droppableId === 'TodoList'){
          add = active[source.index]
          active.splice(source.index, 1)
        } else {
          add = complete[source.index]
          complete.splice(source.index, 1)
        }

        if(destination.droppableId === 'TodoList'){
            active.splice(destination.index, 0, add)
        } else {
           complete.splice(destination.index, 0, add)
        }
        setCompleted(complete)
        setTodos(active)
     }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList 
       todos={todos} setTodos={setTodos}
       completed={completed} setCompleted={setCompleted}/>
    </div>
    </DragDropContext>

  )
}

export default App
