const express = require('express')
const app = express()
const path = require('path')


app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.get('/', (req, res, next)=> {
    res.sendFile(path.join(__dirname, 'index.html'))
})


app.use(require('body-parser').json())

//ROUTES
app.get('/api/users', (req, res, next)=> {
    User.findAll()
        .then(user => res.send(user))
        .catch(next)
})

app.post('/api/users', (req, res, next) => {
    User.create(req.body)
        .then(user => res.send(user))
        .catch(next)
})

app.put('/api/users/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            Object.assign(user, req.body)
            return user.save()
        })
        .then(user => res.send(user))
        .catch(next)
})

app.delete('/api/users/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then( user => {
            return user.destroy()
        })
        .then( () => res.sendStatus(204))
        .catch(next)
})

//you are sending just the one user? why don't I have to find them all?

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`listening on port ${port}`))


//SEQUELIZE
const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/simple_react_redux_app')

//DATABASE
const User = conn.define('user', {
    name: Sequelize.STRING
})

const sync = ()=> {
    return conn.sync({ force: true })
}

const seed = ()=> {
    return (
        Promise.all([
            User.create ({ name: 'moe'}),
            User.create ({ name: 'larry'}),
            User.create ({ name: 'curly'}),
        ])
    )
}

sync()
    .then(()=> seed())
