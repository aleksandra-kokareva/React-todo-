import React,{Component} from 'react'
import '../ItemStatusFilter/ItemStatusFilter.css'
import {Link} from 'react-router-dom'

interface ItemStatusFilterProps {
    filter: string
    onFilterChange(filter: string): void
}

class ItemStatusFilter extends Component<ItemStatusFilterProps> {

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'},
    ]

    render(): JSX.Element {
        const {filter, onFilterChange} = this.props
        const buttons = this.buttons.map (({name, label}) => {
            const isActive = filter === name
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
            return (

                <Link to={`/${name}`} key={label}>
                 <button type="button"
                        className = {`btn ${clazz}`}
                        key = {name}
                       onClick = {() => onFilterChange(name)}
                        >
                    {label}
                </button>
                </Link>

            )
        })
        return (
            <div className="btn-group">
                {buttons}
            </div>
            )
      }
    }

export default ItemStatusFilter