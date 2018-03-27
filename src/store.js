import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

const SET_USERS = 'SET_USERS'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'
const CREATE_USER = 'CREATE_USER'

const usersReducer = (state =[], action) => {
    switch(action.type){
       case SET_USERS:
            state: action.users
            break
        case UPDATE_USER:
            state: state.map( user => user.id === action.user.id ? action.user : user )
            break
        case DELETE_USER:
            state: state.filter( user => user.id !== action.user.id )
            break
        case CREATE_USER:
            state: [... state, action.user]
            break
    }
    return state
}

//my loadUsers does the ajax call - gets users and associates w/axn 'Set-users'
//then usersReducers sets state to what we got back from loadUsers
//returns state

const reducer = combineReducers({
    users: usersReducer
})

export const loadUsers = ()=> {
    return(dispatch)=> {
        return axios.get('/api/users')
            .then(result => result.data)
            .then(users => dispatch({
                type: SET_USERS,
                users
            })
        )
    }
}

export const saveUser = ()=> {
    if(user.id){
        return(dispatch)=> {
            return axios.put(`/api/users/${user.id}`, user)
                .then(result => result.data)
                .then(user => dispatch({
                    type: UPDATE_USER,
                    user
                })
            )
            .then ( ()=> {
                history.push('/users')
            })
        }
    }
}

export const deleteUser = ()=> {
    return(dispatch)=> {
        return axios.delete(`/api/users/${user.id}`, user)
            .then(user => dispatch({
                type: DELETE_USER,
                user
            })
        )
        .then ( ()=> {
            history.push('/users')
        })
    }
}



const store = createStore(reducer, applyMiddleware(thunk))

export default store



