const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use(morgan('dev', {
  skip: function (req, res) {
    return !new RegExp('^/api.*$').test(req.originalUrl)
  }
}))

app.use('/public', express.static(path.join(__dirname, 'public')));

var data = {
  humidity: 70,
  temperature: 32,
  moisture: 0,
  updatedAt: new Date(),
}

const router = express.Router()

router.post('/', function (req, res) {
  console.log(req.body)
  const {
    humidity,
    temperature,
    moisture,
  } = req.body
  data.humidity = humidity
  data.temperature = temperature
  data.moisture = moisture
  data.updatedAt = new Date()
  res.json(data)
})

router.get('/', function (req, res) {
  res.json(data)
})

app.use(router)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})