import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

// routers
import inventoryRouter from './routes/inventory.routes'
import orderRouter from './routes/order.routes'

const app = express()

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  dbName: process.env.MONGO_DBNAME,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

mongoose.connection.on('error', err => {
  console.log(err)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use('/inventories', inventoryRouter)
app.use('/orders', orderRouter)
app.get('/styles.css', (req, res) => res.sendFile(`${__dirname}/styles.css`))
app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))
