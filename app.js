//require modeules
const express = require('express');
const morgan = require('morgan');


//require routes
const mainRoutes = require('./routes/mainRoutes');
const tradeRoutes = require('./routes/tradeRoutes');

const method = require('method-override');

//Create application 
const app = express();

//Configure application
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//Mount middleware functions
app.use(express.static('public'));

  //Allows data to parse in request body
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(method('_method'));


app.use('/',mainRoutes);
app.use('/trades', tradeRoutes);


app.use((req, res, next) => {
  let err = new Error('The server cannot locate '+ req.url);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if(!err.status){
      err.status = 500;
      err.message = ("Internal Server Error")
  }
  res.status(err.status);
  res.render('error',{error:err});
});

// Start the server
app.listen(port, host, () => {
    console.log('Server is running at port: ', port);
});