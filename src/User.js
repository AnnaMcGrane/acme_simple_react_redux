import React from 'react'
import { connect } from 'react-redux'
import { saveUser, deleteUser } from './store'

class User extends React.Component {
    constructor(props){
        super()
        this.state = {
            name: this.props.user ? this.props.user.name : ''
        }
        this.onChangeName = this.onChangeName.bind(this)
        this.onSave = this.onSave.bind(this)
    }
    onSave(ev){
        ev.preventDefault()
        const user = { id: this.props.id, name: this.state.name }
        this.props.saveUser(user)
    }
    onChangeName(ev){
        this.setState({ name: ev.target.value })
    }
    componentWillReceiveProps(nextProps){
        this.setState({ name: nextProps.user ? nextProps.user.name : ''})
    }
    render(){
        if(!user){
            return null
        }
        return (
            <div>
            <h1> { user.name } </h1>
            <form onSubmit = { this.onSave }>
                <input value = { name } onChange = { this.onChangeName } />
                <button>Update</button>
            </form>
                <button onClick = { this.deleteUser } >Delete</button>
            </div>
        )
    }
}

const mapStateToProps = ({ users }, { id })=> {
   const user = users.find (user => user.id === id)
   return {
       user
   }
}   

const mapDispatchToProps = (disppath, {id}) => {
    return {
        saveUser: (user) => dispatch(saveUser(user, history)),
        deleteUser: (user) => dispatch(deleteUser(user, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)