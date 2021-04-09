/*jshint esversion: 6 */


// Requiring Modules
const hbs = require("hbs");
const path = require("path");
const express = require("express");
const app = express();


// Setting Port
const DomainPORT = process.env.PORT || 8000;

// Setting View Engine to HBS ( Handle Bars )
app.set('view engine', hbs);

// Setting Static Path ( Public Folder )
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Setting views Path
const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);

// Setting Partials Path
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

// Request and Response Handling ( Routing )
app.get('/', (req, res) => {
   res.render('index.hbs');
});
app.get('/about', (req, res) => {
   res.render('about.hbs');
});
app.get('/temp', (req, res) => {
   res.render('temp.hbs');
});
app.get("*", (req, res) => {
   res.render('err.hbs');
});


// Listening to the Port to Go Live on the Internet (:-)
app.listen(DomainPORT, () => {
   console.log(`Listening to the Port at ${DomainPORT}`);
});
