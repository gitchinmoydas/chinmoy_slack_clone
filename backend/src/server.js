import express from 'express'
const app = express();
import {ENV} from './config/env.js'
import { connectDB } from './config/db.js';
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(ENV.PORT, () => {
  console.log('Server is running on port ' + ENV.PORT)
  connectDB()
})
