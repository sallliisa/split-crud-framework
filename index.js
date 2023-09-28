import express from 'express'
import cors from 'cors'
import routes from './src/routes/index.js'
import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', routes)

app.listen(6969, () => console.log('Started'))