if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: __dirname+'/.env'});
}


const express = require('express')
const mongoose = require('mongoose')
const path = require('path');


const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// reqistering routes
// app.use('/api/workouts', workoutRoutes)
// app.use('/api/user', userRoutes)

app.use('/api/workouts', require(path.join(__dirname, 'routes', 'workouts.js')));
app.use('/api/user', require(path.join(__dirname, 'routes', 'user.js')));


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT || 4000, () => {
      console.log('listening for requests on port')
    })
  })
  .catch((err) => {
    console.log(err)
  }) 

// static files (build of your frontend)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
  })
}