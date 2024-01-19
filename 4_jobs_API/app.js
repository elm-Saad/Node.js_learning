require('dotenv').config();
require('express-async-errors');

//security packages
const helmet = require('helmet') // 
const cors = require('cors') // ensure that our APi is accessible from other domain (cross origin resources sharing)
const xss = require('xss-clean') // xros site scripting handle
const rateLimiter = require('express-rate-limit') // amount of request user can make

// swagger docs
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')


const express = require('express');
const app = express()

const connectDB = require('./db/connect');
const authUser  = require('./middleware/authentication')
// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(express.json());
//
/**Enable if you behind a reverse proxy (Heroku, ..... )  view npm package for more details */
app.set('trust proxy',1)
app.use(rateLimiter({
  windowMs: 15*60*1000,// 15 min
  max:100,//limit each IP to 100 request per windowMs
}))
app.use(helmet())
app.use(cors())
app.use(xss())
//


// 
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument))
app.get('/', (req, res) => {
  res.send('<h1>Jobs APIs and more stuff</h1><a href="/api-docs">docs</a>');
});

// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authUser,jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();   


// api docs add 
/**
 *   "swagger-ui-express": "^4.1.6",//
    "yamljs": "^0.3.0"//
    create api in postman => https://app.apimatic.io/ => get yaml 3
 */