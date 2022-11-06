import React from "react"
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import './styles.css'

interface props{
    todos: Todo[];
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
    // handleAdd : (e : React.FormEvent) => void;
    completed : Todo[];
    setCompleted : React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList:React.FC<props> = ({
  todos, setTodos, completed, setCompleted}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodoList">
        {
          (provided, snapshot) => (
            <div
             className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef} {...provided.droppableProps}>
           
            <span className="todos__heading">
              Active Tasks 
            </span>
              {todos?.map((todo, index) => (

                <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setTodos}
                />
              ))}
            {provided.placeholder}

            </div>
          )
        }
      </Droppable>

        <Droppable droppableId="TodoRemove" >
        {
        (provided,snapshot) => (
          <div 
          className={`todos ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}
          ref={provided.innerRef} {...provided.droppableProps}>
          <span className="todos__heading">
            Completed Tasks 
          </span>
            {completed?.map((todo, index) => (
              <SingleTodo
              index={index}
              todo={todo}
              todos={completed}
              key={todo.id}
              setTodos={setCompleted}
              />
            ))}
            {provided.placeholder}
              </div>
        )
      }

        </Droppable>

    </div>
  )
}

export default TodoList