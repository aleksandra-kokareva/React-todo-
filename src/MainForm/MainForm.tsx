
import React, {Component} from 'react'
import '../App/App.css'

import {Todo} from '../type'
//
import AppHeader from '../AppHeader/AppHeader'
import TodoList from '../TodoList/TodoList'
import SearchPanel from '../SearchPanel/SearchPanel'
import AddForm from '../AddForm/AddForm'
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter'
import Pagination from '../Pagination/Pagination'
import ModalWindow from '../ModalWindow/ModalWindow'
import queryString from "query-string";


interface MainFormState {
    todoData: Todo[]
    currentPage: number
    todosPerPage: number
    term: string
    filter: string
    currentItem: number
    isModalOpen: boolean
  }
  
  interface MainForm {
    location?: {
      hash: string;
      pathname: string;
      search: string;
    };
  }
  
  class MainForm extends Component <MainForm, MainFormState> {
    maxId = 100
    state: MainFormState = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Have a lunch'),
        this.createTodoItem('Have a lunch1'),
        this.createTodoItem('Have a lunch2'),
        this.createTodoItem('Have a lunch3'),
        ],
      currentPage: 1,
      todosPerPage: 3,
      term: '',
      filter: 'all', //active, all ,done
      currentItem: 0,
      isModalOpen: false
    }
  
    componentDidMount(): void {
      const { location } = this.props;
  
      const search: any = location?.search;
      const parsed = queryString.parse(search);
      if (parsed.page) {
        this.setState({ currentPage: Number(parsed.page) })
      }
      console.log('parsed.page  --: ', parsed.page)
    }
  
    toggleModal = (id: number) => {
      this.setState(state => ({ isModalOpen: !state.isModalOpen, currentItem: id }))
    }
  
    createTodoItem(label: string) {
      return {
        label: label,
        important: false,
        done: false,
        id: this.maxId++
      }
    }
  
    deleteItem = (): void => {
      const { currentItem, todoData } = this.state;
  
        const newTodoList = todoData.filter( f => f.id !== currentItem )
  
        this.setState({isModalOpen: false, todoData: newTodoList})
    }
  
    addItem = (text: string) => {
      const newItem = this.createTodoItem(text)
  
      this.setState (({todoData}) => {
        const newArr = [
          ...todoData,
          newItem
        ]
        return {
          todoData: newArr
        }
      })
    }
  
    onToggleImportant = (id: number): void => {
      this.setState (({todoData}) => {
        const ind = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[ind]
        const newItem  = {...oldItem, important: !oldItem.important }
        const newArray = [
          ...todoData.slice(0, ind),
          newItem,
          ...todoData.slice(ind + 1)
        ]
        return {
          todoData: newArray
        }
      })
    }
  // 
    onToggleDone = (id: number): void => {
      this.setState (({todoData}) => {
        const ind = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[ind]
        const newItem  = {...oldItem, done: !oldItem.done } 
        const newArray = [
          ...todoData.slice(0, ind),
          newItem,
          ...todoData.slice(ind + 1)
        ]
        return {
          todoData: newArray
        }
      })
    }
  
    onSearchChange = (term: string): void => {
      this.setState({term})
    }
  
    onFilterChange = (filter: string): void => {
      this.setState({filter})
    }
    search(items: Todo[], term: string) {
      if (term.length === 0) {
        return items
      }
    return  items.filter((item) => {
        return item.label.toLowerCase()
        .indexOf(term.toLowerCase()) > -1
      })
    }
  
    filter(items: Todo[], filter: string) {
      switch(filter) {
        case 'all':
          return items
        case 'active':
          return items.filter((item) => !item.done)
        case 'done':
          return items.filter((item) => item.done)
        default:
          return items
      }
    }
  
    render(): JSX.Element {
      const {todoData, currentPage, todosPerPage, term, filter, currentItem, isModalOpen} = this.state
      const { location } = this.props;
  
      const visibleItems = this.filter(this.search(todoData, term), filter)
  
      const doneCount = todoData.filter((el) => el.done).length
      const todoCount = todoData.length - doneCount
  
  
      const indexOfLastTodo = currentPage * todosPerPage
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage
      const currentTodos = visibleItems.slice(indexOfFirstTodo, indexOfLastTodo)
  
      const paginate = (pageNum: number) => this.setState({currentPage: pageNum})
      const nextPage = () => this.setState({currentPage: currentPage + 1 })
      const prevPage = () => this.setState({currentPage: currentPage - 1 })
  
      const content = todoData.find(f => f.id === currentItem)
  
      return(

        <>
          <div className="todo-app">
          <AppHeader toDo = {todoCount} done = {doneCount} />
          <div className="top-panel d-flex">
            <SearchPanel
            onSearchChange = {this.onSearchChange}/>

              <ItemStatusFilter filter = {filter}
              onFilterChange = {this.onFilterChange}/>

          </div>
            <TodoList
            todos = {currentTodos}
            onDeleted = {this.toggleModal}
            onToggleImportant = {this.onToggleImportant}
            onToggleDone = {this.onToggleDone}/>
          <AddForm onItemAdded = {this.addItem}/>
          <div className = 'container'>

              <Pagination
              todosPerPage= {todosPerPage}
              totalTodos = {visibleItems.length}
              pageNumbers = {[]}
              paginate = {paginate}
              nextPage = {nextPage}
              prevPage = {prevPage}
              location = {location}
              currentPage = {currentPage}
              />

          </div>
          <>

              {isModalOpen &&
                  <ModalWindow
                  content = {content}
                  onClose  = {this.toggleModal}
                  deleteItem = {this.deleteItem}>
                  </ModalWindow>

              }
        </>
        </div>
      </>
    )
}
  }
  
  export default MainForm