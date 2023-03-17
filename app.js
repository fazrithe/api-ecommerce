var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import merchantRouter from './routes/merchant'
import productRouter from './routes/product'
import customerRouter from './routes/customer'
import orderRouter from './routes/order'
import transactionRoute from './routes/transaction'
import mongoose from "mongoose";
import cors from "cors";

mongoose.connect("mongodb://localhost:27017/e-commerce",{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));
 
dotenv.config({ path: './.env' });
var app = express();

process.env.REFRESH_TOKEN_SECRET;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({ credentials:true, origin:'http://localhost:5000' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/merchants', merchantRouter);
app.use('/products', productRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRouter);
app.use('/transactions', transactionRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
