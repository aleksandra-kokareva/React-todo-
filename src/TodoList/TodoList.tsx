import React from 'react'
import {Todo} from '../type'
import ListItem from '../ListItem/ListItem'
import '../TodoList/TodoList.css'

interface TodoListProps {
    todos: Todo[]
    onDeleted (id: number): void
    onToggleImportant(id: number): void
    onToggleDone(id: number): void
}

const TodoList: React.FC <TodoListProps> = ({todos, onDeleted, onToggleImportant, onToggleDone}) => {

    const elements = todos.map((item)=>{
        
        return (
            <li key={item.id} className = "list-group-item">
                <ListItem 
                todo = {item}
                onDeleted = {() => onDeleted(item.id)}
                onToggleImportant  = { () => onToggleImportant(item.id)}
                onToggleDone  = { () => onToggleDone(item.id)}
                />
            </li>    
        )})

    return (
            <ul className="list-group todo-list">
                {elements}
            </ul>
        
    )    
}        

export default TodoList




