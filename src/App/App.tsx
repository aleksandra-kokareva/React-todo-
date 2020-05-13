import React from 'react'
import MainForm from '../MainForm/MainForm'
import { Switch, Route} from 'react-router-dom'

const App: React.FC<{}> = () => (
    <Switch>
      <Route path="/" component = {MainForm} />
      <Route path="/" component = {MainForm} />
      <Route path="/active" component = {MainForm} />
      <Route path="/done" component = {MainForm} />
    </Switch> 
)


export default App


