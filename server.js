/* importing core modules */
var express = require('express');
var http = require('http');
var fs = require('file-system');
var baseToImage = require('base64-to-image');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false})
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/* parser all form data */
app.use(bodyParser.urlencoded({extended: true}));

/* format date */
var dateFormat = require('dateformat');
var now = new Date();

/* view engines */
app.set('view engine', 'ejs');

/* Import all related JS and CSS files */
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

/* Database Connection */
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs',
});

/* Global variable */
const siteTitle = 'Node app';
const baseURL = 'http://localhost:3000/';

/*===================================================== index ========================================================*/
/*Get Events*/
app.get('/', function (req, res) {

    con.query('SELECT * FROM `events` ORDER BY start_date DESC', function (error, result) {
        console.log(result);
        console.log(error);

        res.render('pages/index', {
            siteTitle: siteTitle,
            pageTitle: 'List Events',
            events: result,
        });
    });
});
/*===================================================== index ========================================================*/

/*===================================================== events ========================================================*/
/*Get Events*/
app.get('/events', function (req, res) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );

    con.query('SELECT * FROM `events` ORDER BY start_date DESC', function (error, result) {
        //var results = {event: result}
        console.log(result);
        console.log(error);

        res.send(result);
    });
});
/*===================================================== events ========================================================*/

/*===================================================== Add ==========================================================*/
/* Get Add Event */
app.get('/event/add', function (req, res) {
    res.render('pages/event/add', {
        siteTitle: siteTitle,
        pageTitle: 'Add New Event',
    });
});

/* Post Add Event */
app.post('/event/add', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );

    var query = "INSERT INTO `events`(`title`, `description`, `location`, `start_date`, `end_date`, `status`) VALUES (";
    query += " '" + req.body.title + "' ,";
    query += " '" + req.body.description + "' ,";
    query += " '" + req.body.location + "' ,";
    query += " '" + dateFormat(req.body.start_date, "yyyy-mm-dd") + "' ,";
    query += " '" + dateFormat(req.body.end_date, "yyyy-mm-dd") + "' ,";
    query += " '1' )";

    console.log(query);

    con.query(query, function (error, result) {
        console.log(result);
        console.log(error);

        //res.send(result);
        res.redirect(baseURL);
    });
});
/*===================================================== Add ==========================================================*/

/*===================================================== Edit =========================================================*/
/* Get Edit Event */
app.get('/event/edit/:id', function (req, res) {
    con.query("SELECT * FROM `events` WHERE id= '" + req.params.id + "'", function (error, result) {
        console.log(result);
        console.log(error);

        result[0].start_date = dateFormat(result[0].start_date, "yyyy-mm-dd");
        result[0].end_date = dateFormat(result[0].end_date, "yyyy-mm-dd");

        res.render('pages/event/edit', {
            siteTitle: siteTitle,
            pageTitle: 'Add New Event',
            event: result,
        });
    });
});

/* Post Edit Event */
app.post('/event/edit/:id', function (req, res) {
    var query = "UPDATE `events` SET";
    query += " `title`= '" + req.body.title + "' ,";
    query += "`description`= '" + req.body.description + "' ,";
    query += "`location`= '" + req.body.location + "' ,";
    query += "`start_date`='" + dateFormat(req.body.start_date, "yyyy-mm-dd") + "',";
    query += "`end_date`= '" + dateFormat(req.body.end_date, "yyyy-mm-dd") + "' ";
    query += "WHERE `events`.`id` = " + req.params.id + "";

    console.log(query);

    con.query(query, function (error, result) {
        console.log(result);
        console.log(error);

        if (result.affectedRows) {
            res.redirect(baseURL);
        }
    });
});

/*===================================================== Edit =========================================================*/

/*===================================================== Delete =======================================================*/
app.get('/event/delete/:id', function (req, res) {
    con.query("DELETE FROM `events` WHERE id= '" + req.params.id + "'", function (error, result) {
        console.log(result);
        console.log(error);

        if (result.affectedRows) {
            res.redirect(baseURL);
        }
    });
});
/*===================================================== Delete =======================================================*/

/* Starting the server */
var server = app.listen(3000, function () {
    console.log('server starts at port 3000');
})