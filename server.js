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

app.get('/salescrm', (req,res) => {
  res.send({
	"error" : {},
	"message" : "",
  "statusCode" : 2002,
	"result" : [
		{
			"location_id" : 23,
			"location_name" : "SP Road",
			"location_abs" : {
				"calls" : 10,
				"tdrives" : 12,
				"visits" : 3,
				"post_bookings" : 8,
				"deliveries" : 5,
				"uncalled_tasks" : 2
			},
			"team_leaders" : [
				{
					"info" : {
						"id" : 25,
						"name" : "Harry Potter",
						"dp_url" : "http://www.example.com/harry37409.jpg",
						"abs" : {
							"calls" : 10,
							"tdrives" : 12,
							"visits" : 3,
							"post_bookings" : 8,
							"deliveries" : 5,
							"uncalled_tasks" : 2
						}
					},
					"sales_consultants" : [
						{
							"info" : {
								"id" : 45,
								"name" : "Hermione Granger",
								"dp_url" : "http://www.example.com/hermione37409.jpg",
								"abs" : {
									"calls" : 10,
									"tdrives" : 12,
									"visits" : 3,
									"post_bookings" : 8,
									"deliveries" : 5,
									"uncalled_tasks" : 2
								}
							}
						}
					]
				}
			]
		}
	]
});
});


//Bind {second paramter is optional}
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
