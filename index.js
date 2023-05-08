const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors');

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1 style="color:#333;text-align:center;font-size:20px;margin:10px 0;">Coffee Store Server Is Running !!!</h1>')
})

app.listen(port, () => {
  console.log(`The Server Is Running On Port: ${port}`)
})