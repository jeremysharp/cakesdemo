const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const moment = require('moment');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

morgan.token('timestamp', (req, res, param) => moment().format('HH:mm:ss.S'));
morgan.token('symbol', (req, res, param) => (req.error ? '❌' : '✅'));
morgan.token('error', (req, res, param) => req.error || '');

app.use(morgan(':timestamp :symbol :method :status :url :error'));
app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use(express.static('client/build'));
const swaggerOptions = require('../swagger.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ limits: { fileSize: 20 * 1024 * 1024 } }));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    req.error = err;
    const status = err.status || 500;
    res.status(err.status || 500).send(status + ' API error. Please refer to logs');
});

module.exports = app;
