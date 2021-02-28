const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const axios = require('axios')

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3001
const url = 'https://bad-api-assignment.reaktor.com/'
app.use(express.static('build'))

app.get('/api/product/:category', async (req, res) => {
  const request = await axios.get(`${url}v2/products/${req.params.category}`)
  res.send(request.data)
})
app.get('/api/manu/:manufacturer', async (req, res) => {
  const request = await axios.get(`${url}v2/availability/${req.params.manufacturer}`)
  res.send(request.data)
})

app.use('*', express.static(path.join(__dirname, 'build')))

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`)
})