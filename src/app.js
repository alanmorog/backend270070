import express from 'express'
import session from 'express-session'
import bcrypt from 'bcrypt'

const app = express()
const PORT = 8080
//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
