import React from 'react'

import { loadUsers } from './store'
import { connect } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import Users from './Users'
import User from './User'

class App extends React.Component{
    componentDidMount(){
        this.props.loadUsers()
    }
    render(){
        return(
            <Router>
            <div>
                <Nav />
                <Route path='/' exact component = { Home } />
                <Route path='/users' exact component = { Users } />
                <Route path='/users/:id' exact render = {({ match })=><User id= { match.params.id*1 }/>} />
            </div>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: ()=> dispatch(loadUsers())
    }
}

export default connect(null, mapDispatchToProps)(App)