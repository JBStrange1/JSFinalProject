const path = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const root = path.join(__dirname,'public')

app.use(express.json())
app.use(express.static('public'))
app.use('/api',require('./routes/public'))
app.use('/api',require('./routes/admin'))

app.get('/',(_,response)=>{
    response.sendFile('Home/home.html',{root})
})
app.get('/menu',(_,response)=>{
    response.sendFile('Menu/menu.html',{root})
})
app.get('/contact',(_,response)=>{
    response.sendFile('Contact/contact.html',{root})
})
app.get('/admin',(_,response)=>{
    response.sendFile('Admin/admin.html',{root})
})


app.get('*',(_,response)=>{
    response.sendFile('404.html',{root})
})

const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))