import React from 'react'
import '../AppHeader/AppHeader.css'

interface AppHeaderProps {
    toDo: number,
    done: number
}
const AppHeader: React.FC<AppHeaderProps> = ({toDo, done}) => {
    return (
        <div className="app-header d-flex">
            <h1> Todo list </h1>
            <h2> {toDo} more to do, {done} done</h2>
        </div>
        
    )
}


export default AppHeader