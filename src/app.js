const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Path for  Express Config
const publicDirectoryPath =path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//  Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//  Setup static directory
app.use(express.static(publicDirectoryPath))


// The GET functions to print on screen.
app.get('',(req, res) => {
    res.render('index', {
        title:'Weather App',
        name:'Naveen'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title:'About Page',
        name:'Naveen'
    })
}) 

app.get('/help',(req, res) => {
    res.render('help', {
        helpText:'This is help page',
        title:'Help Page',
        name:'Naveen'
    })
})


app.get('/weather',(req, res) => {

    if (!req.query.address){
        return res.send({
            error:" Must provide a address "
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error) {
            return res.send({ error: error})
        }

        forecast(latitude, longitude, (error, forecastData)=> {
                if (error){
                    return res.send({error:error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
        })
    })




    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address

    // })
})

app.get('/products',(req,res) => {
    if (!req.query.search){
        return res.send({
            error:" Must provide a search"
        })
    }
    req.query

    res.send({
        products: []
    })
})


//  for 'help 404'
app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'naveen',
        errorMessage: 'Help page not found'
    })
})

// For 404 Error
app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'naveen',
        errorMessage: 'Page not found'
    })

    
})

//comments added

app.listen(port, () => {
    console.log('server is up on port 3000')
})