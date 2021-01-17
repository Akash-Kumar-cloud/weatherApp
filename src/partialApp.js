const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');



app.set('view engine', 'hbs');

app.set('views', viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Akash Kumar',
  });
});

app.get('/inquiry', (req, res) => {
  res.render('Inquiry', {
    title: 'Inquiry',
    name: 'Akash Kumar',
  });
});

//Task query string video number 54
// app.get('/weather', (req,res)=>{
//   if(!req.query.address){
//    return res.send({
//       error:'You must provide address term'
//     })
//   }
//   res.send({
//     forcast:'It is snowing',
//     location:'Philadelphia',
//     address:req.query.address
//   })
// })


//Task video number 55
app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'you must provide address term'
    })
  }
  geocode(req.query.address,(error , {latitude,longitude,location}= {})=>{
    if(error){
      return res.send({error })
    }
    forecast(latitude,longitude,(error,forecastData)=>{
      if(error){
        return res.send({error})
      }
      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    })
  })
})

//404
//* if not match after inquiry

app.get('/inquiry/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Inquiry Page Not Found',
    name: 'Akash kumar sah',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page Not Found',
    name: 'Akash sah',
  });
});

app.listen(3000, () => {});
