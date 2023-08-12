import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import usersRouter from './routes/users.js'
import tasksRouter from './routes/tasks.js'
import helmet from "helmet"
import rateLimit from 'express-rate-limit'

dotenv.config()
const app = express()
mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(process.env.PORT || 5000, () => console.log(`server running on port ${process.env.PORT}`) ))
.catch((err) => console.log(err))


app.use(helmet());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 150, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))

if(process.env.PRODUCTION === 'true'){
    console.log('Running in producion')
    app.use(cors({
      origin: ['https://rocket-tasks.222solutions.pl', 'https://stackoverflow.com/']
    }), (req, res, next) => {
      if(req.headers.origin === 'https://rocket-tasks.222solutions.pl', 'https://stackoverflow.com/'){
          next()
      }else{
          res.status(401)
      }
    })
  }else{
    console.log('Running in development')
    app.use(cors())
  }
  
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)


