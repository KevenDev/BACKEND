const express = require('express');
const  userRoutes  = require('./src/routes/userRouter')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(userRoutes)
app.use(cors())

const PORT = process.env.URL || 3000

app.listen(PORT,()=>{
  console.log(`Rodando na porta ${PORT}`);
})