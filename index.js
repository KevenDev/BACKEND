const express = require('express');
const  userRoutes  = require('./src/routes/userRouter')
const app = express()
app.use(express.json())
app.use(userRoutes)
const PORT = process.env.URL || 3000

app.listen(PORT,()=>{
  console.log(`Rodando na porta ${PORT}`);
})