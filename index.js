require('dotenv').config(); //making the .env file readable
const express = require("express");
const app = express();
const logger = require("morgan");
const needle = require("needle");
const jquery = require("jquery");

const { request, response } = require('express');
const { get } = require('needle');
const { API_KEY } = process.env;
app.use(express.static("public"));

app.use(logger("dev")); //create the status logger

app.set("view engine", "ejs"); //setting the view to be loaded
let baseURL = `https://api.giphy.com/v1/gifs/`
let api_key = `api_key=${API_KEY}`
let limit = `&limit=25`;
let count = 0;


app.get("/", (req, res) => {
    let trending = `trending?${api_key}${limit}`
    needle.get(`${baseURL}${trending}`, (error, response, body) => {
        let data = body.data;
        res.render("home", { data });
    })
    
})

app.get("/search", (req, res) => {
    count = 25;
    let { search } = req.query;
    app.locals.search = req.query;
    let query = `&q=${search}`
    let routeURL = `${baseURL}search?${api_key}${limit}${query}`;
     needle.get(routeURL, (error, response, body) => {
         let data = body.data;
         res.render("home", { data });
     })
})

// function loadMore() {
//     console.log(app.locals.search);
//     let query = `&q=${app.locals.search}`
//     let routeURL = `${baseURL}search?${api_key}${limit}${query}&offset=${count}`;
//     console.log(routeURL);
//     count += 25;
    // needle.get(routeURL, (error, response, body) => {
    //     let moreData = body.data;
    //     moreData.forEach(el => {
    //         jquery.
    //     })
    //     document.append()
    // })
        
//}
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));

//for the load more use an array that starts from the position of the last item. We are using increments of 25 so use 24 as the last index then add 25 and get the range for that. Ex 24-49, etc.
//Also have a counter tied to the load more button that increments in 25 that goes back to the fetch call
