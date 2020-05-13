import React, { Component } from 'react'

interface AddFormProps {
    onItemAdded(text: string): void
}

interface AddFormState {
    label: string
}

class AddForm extends Component <AddFormProps, AddFormState> {
    state: AddFormState = {
        label: ''
    }

    public onLabelChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            label: event.target.value
        })
    }

   
    public onSubmit = (event: React.SyntheticEvent)=> {
        event.preventDefault()
        this.props.onItemAdded(this.state.label)
        this.setState({
            label: ''
        })
    }
    render(): JSX.Element {
        return (
            <form className = "item-add-form d-flex"
                  onSubmit = {this.onSubmit}  >
                <input type = 'text' 
                       className = 'form-control'
                       onChange = {this.onLabelChange}
                       placeholder = "What needs to be done"
                       value = {this.state.label}/>
                <button 
                 className = 'btn btn-outline-secondary'>
                 Add 
                </button>
            </form> 
        )
    }
    
}

export default AddForm