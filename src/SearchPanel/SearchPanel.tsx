import React, { Component } from 'react'
import '../SearchPanel/SearchPanel.css'

interface SearchPanelProps {
    onSearchChange( term: string): void
}

interface SearchPanelState {
    term: string
}


class SearchPanel extends Component <SearchPanelProps, SearchPanelState> {
    state: SearchPanelState = {
        term: ''
    }
    public onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const term = event.target.value
        this.setState({term})
        this.props.onSearchChange(term)
    }
    render(): JSX.Element {
        return (
            <input type='text'
            className='form-control search-input'
            placeholder = 'search'
            value = {this.state.term}
            onChange = {this.onSearchChange}/>
        )
    }
    
}

export default SearchPanel