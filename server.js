require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  info: {
    title: 'Basic Nodejs-ExpressJs-CRUD-REST-API operations',
    version: '1.0.0',
    description: 'A basic node js project to perform CURD operations.',
  },
  host: `localhost:3000`,
  basePath: '/',
};

const swaggerOptions = {
  swaggerDefinition: swaggerDefinition, 
  apis: [
    './routes/*.js'
  ], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/users', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port = process.env.PORT||3000;

//Routes
/**
 * @swagger
 * /subscriber:
 * get:
 * description: Get all users
 * responses:
 * '200':
 * description:Success response
 */

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>(console.log('connected to database')))

app.use(express.json())

const subscriberRouter = require('./routes/subscriber')
app.use('/subscriber',subscriberRouter)

app.listen(port,()=>{
  console.log('server started on port:',port)
})