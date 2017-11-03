const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
//Midleware
app.use((req,res,next) => {
  var now = new Date().toString();
  var log =`${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n' , (error) =>{
    if(error){
      console.log('error while logging');
    }
  })
  next();
});

app.use( (req,res,next) => {
//  res.render('maintenance.hbs');
next();
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
})

//Handler
app.get('/', (req,res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({name:'Bharath',
  // age:23,
  // likes:[
  //   'Biking',
  //   'Travel'
  // ]})

  res.render('home.hbs',{
    pageTitle:'Home',
    welcomeMessage:'Welcome to home'
  });

});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

// /bad
app.get('/bad', (req,res) => {
  res.send({
    errorMessage:'Unable handle the request',
    code :'PAGE_NOT_FOUND'
  });
});

//Bind {second paramter is optional}
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
