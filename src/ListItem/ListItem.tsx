import React from 'react'
import {Todo} from '../type'
import '../ListItem/ListItem.css'


interface ListItemProps {
  todo: Todo
  onDeleted(): void
  onToggleImportant(): void
  onToggleDone(): void
}


const TodoList: React.FC<ListItemProps> = ({todo, onDeleted, onToggleDone, onToggleImportant}) => {

  let classNames = ["todo-list-item"]
    if (todo.done) {
      classNames.push(' done')
    }

    if (todo.important) {
      classNames.push(' important')
    }

    return (
      <span className={classNames.join('')}>
      <span
        className="todo-list-item-label"
        onClick = {onToggleDone}>
        {todo.label}
      </span>

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick = {onToggleImportant}>
        <i className="fa fa-exclamation" />
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick = {onDeleted} >
        <i className="fa fa-trash-o" />
      </button>
    </span>
  )
   
 }


 
  
 


export default TodoList