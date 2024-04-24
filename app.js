const path = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const root = path.join(__dirname,'public')

app.use(express.json())
app.use('/api',require('./routes/public'))



const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))