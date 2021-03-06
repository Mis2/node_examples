Node Modules
_________________

We have this code in simplerect.js
var rect = {
    perimeter: function (x, y) {
        return (2 * (x + y));
    },
    area: function (x, y) {
        return (x * y);
    }
};

function solveRect(l, b) {
    console.log("Solving for rectangle with l=" + l + " and b=" + b);
    if (l < 0 || b < 0) {
        console.log("Rect dimensions should be greater than 0");
    }
    else {
        console.log("Area is " + rect.area(l, b));
        console.log("Perimeter is " + rect.perimeter(l, b));
    }
}

solveRect(2, 5);
solveRect(3, 4);
solveRect(-5, 4);


We want to create own module

Create new file rectangle-1.js

exports.perimeter = function (x, y) {
    return (2 * (x + y));
};

exports.area = function (x, y) {
    return (x * y);
};

In solve-1.js:

var rect = require('./rectangle-1');

function solveRect(l, b) {
......
......
}

Node Modules: Callbacks and Error Handling
__________________________________________________


2 Features of JS
__________________

First Class Functions: A function can be treated in same way as any other var
Closures: A function defined inside another function has access to all the vars declared in
          outer function or passed in as parameters(outer scope)
          The inner function will continue to have access to the vars from outer scope even
          after the outer function has returned


Callback is the piece of code that needs to run after a long running process is completed

Rectangle Module:

module.exports = function(x, y, callback){
try{
        if(x<0||y<0){
        throw new Error("....");
        }
    }
else{
        callback(null, {
        perimeter: function(){return (2*(x+y));},
        area: function(){return (x*y);}
        });
    }
catch (error){callback(error, null);}
}

This callback function will be called upon completion of the work
By convention, 1st parameter for callback function is an error

If no error occurs 1st param of callback is null
2nd param returns value that module is expected to return. Here it is a js object

Note perimeter() and area() do not take params as those params came in when rectangle module was called
This is due to closures


How do we use this module?

Calling the function:
rect(l, b, function(err, rectangle){
if(err){
        console.log(err);
    }
else{
        ...
    }
})

More on Node Modules:
1.File based Node modules
2.Core Modules
3.External Modules

Using ext node module:

use yargs node module
it supports command line args

eg: node solve-3 --l=2 --b=4

npm install yargs --save

--save to save dependencies in package.json file

Now there is a new folder automatically added called node_modules
there is yargs folder inside node_modules


The HTTP Protocol
___________________________

It is a client-server communication protocol used to retrieve hypertext documents

Request format:
Request Line
Header Fields
Blank Line
Body(HTML,TXT,JSON,XML, encode image/video etc)

Full Request Msg eg:
GET /index.html HTTP/1.1
____________________________
host:localhost:3000
connection: keep-alive
user-agent: Mozilla/5.0
accept-encoding: gzip, deflate, sdch
_____________________________________
Blank Line
_________________________________
Empty Body
________________________________


Response Format:
Status Line
___________
Headers
___________
Blank Line
___________
Response Data
___________

HTTP Response
 Msg Eg:
HTTP/1.1 200 OK
______________________
Connection:keep-alive
Content-Type: text/html
Date: Sun, 21 Feb 2016 06:01:43 GMT
Transfer Encoding: chunked
_____________________________
Blank Line
____________________________
<html>...</html>
__________________________


Path Module:
Path module constructs path based on OS

Windows:\
OSx or Linux: /
path.resolve('./public' + fileUrl) .. Gives absolute path
path.extname(filePath)..returns extension name

fs Module:
fs.exists(filePath, function(exists){...})
2nd param is a callback function
if file exists, var exists=true, else false

fs.createReadStream(filePath).pipe(res);

Creating Simple Server

node-examples
->node-http
  ->public


Create file in node-http as server-1.js

var http = require('http');
var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function (req, res) {
    console.log(req.headers);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello World</h1>');
});

server.listen(port, hostname, function () {
    console.log("Server Running");
});


Start server

Go to localhost:3000
Hello World will be displayed there

We can use sudo curl http://localhost:3000 to access the server too
Or we can use POSTMAN too


Now we want to extend our server to return HTML files from public directory
var fs = require('fs');
var path = require('path');

If server receives GET request then a response is returned
Else it wont handle it

Read server.js and understand the code


Express js
______________________________________________

It is a fast, un-opinionated, minimalistic web framework for node

Express has lots of middlewares which provides a lot of functionalities

eg: morgan for logging info from server side
var morgan = require('morgan')
app.use(morgan('dev'))

Serving static web resources: use middleware static (included in express)

app.use(express.static(__dirname + '/public/'));

In node __filename and __dirname gives us full path to the file and directory of the current module


Create folder node-express

copy public folder from node-http folder here
create file server-1.js

in the folder node-express

run sudo npm init.. this creates package.json file

then run sudo npm install express --save

In server-1.js:
var express = require('express'), http = require('http');

var hostname = 'localhost';
var port = 8080;

var app = express();

Now use app.use() function to create a middleware

var app = express();

// CREATE MIDDLEWARE
app.use(function (req, res, next) {
    console.log(req.headers);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<html><body><h4>Hello Mini</h4></body></html>');
});

// CREATE SERVER
var server = http.createServer(app);
server.listen(port, hostname, function () {
    console.log("Server Running at http://" + hostname + ":" + port);
});

Now use POSTMAN to send GET requests to this server

Here whatever be url : say http://localhost:8080/sadada.dfgd

It returns the same response as it is coded that way only

Now we want to use morgan

In server.js

var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 8080;

var app = express();

app.use(morgan('dev'));

// SERVING STATIC FILES
app.use(express.static(__dirname + '/public/'));

app.listen(port, hostname, function () {
    console.log("Server Running at http://" + hostname + ":" + port);
});


REST
__________________________

Web Services
_________________

A system designed to support interoperability of systems connected across a n/w
Someone provides a service, somebody else consumes the service
A standardized way for exchange of information

2 approaches

1. SOAP (Simple Object Access Protocol)
   Uses WSDL (Web Services Description Language)
   Uses XML
2. REST (Representational State Transfer)
   Uses Web standards
   Uses either XML or JSON
   Simpler


REST takes a lot of stuff from HTTP
Now what made HTTP so successful was hyperlinks. u click on a link to get another resource

REST does something similar as:
1. URI (Uniform Resource Identifier) similar to URL
2. Uses HTTP Protocol
3. Make a request -> Receive response -> Display response

REST makes use of all the diff methods that HTTP provides
POST, GET, PUT, DELETE

REST Grammar
_______________________

Nouns - Resources: addressed using URI
eg: http://www.conFusion.food/dishes/123

Verbs - GET(Read), POST(Create), PUT(Update), DELETE(Delete)

Representations - XML and JSON


Express Router
____________________________

methods: app.all, app.get, app.post, app.put, app.delete

eg:
app.all('/dishes', function(req, res, next)
{
    ...
});

app.all means if u encounter any of the 4 kinds of requests for this particular URI, then apply the
particular function specified

Routes with params:

app.get('/dishes/:dishId', function(req, res, next){
    res.end("Will send u details of the dish: " + req.params.dishId);
});


Exercise
___________________

Setting up a REST API

Copy node_express/server.js into a new file server-3.js

We want to set up our express app to serve up our data in form of a REST API

When a client is communicating with server, client may send data to server in body of msg
which will be received as request msg on server side
This data is in JSON

When data gets to server side we want this data to be parsed and converted to a format which is
easier to use in js code in server side

To do this we use middleware body-parser

body-parser parses the data and converts it to js objects

var bodyParser = require('body-parser');

also install body-parser

app.use(bodyParser.json());

body-parser also parses other kinds of data for eg if we encode form data and send it, that can also be parsed

app.all('/dishes', function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
});

next()->we want to continue processing with the remaining middlewares



app.all('/dishes', function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
});
app.get('/dishes', function (req, res, next) {
    res.end("Will send all the dishes to u !!");
});
app.post('/dishes', function (req, res, next) {
    res.end("Will add the dish: " + req.body.name + " with details: " + req.body.description);
});
app.delete('/dishes', function (req, res, next) {
    res.end("Deleting all the dishes!!");
});
app.get('/dishes/:dishId', function (req, res, next) {
    res.end("Will send details of dish with id: " + req.params.dishId + " to you!!");
});
app.put('/dishes/:dishId', function (req, res, next) {
    res.write("Updating dish with id: " + req.params.dishId);
    res.end("Will update the dish: " + req.body.name + " with details: " + req.body.description);
});
app.delete('/dishes/:dishId', function (req, res, next) {
    res.end("Deleting the dish with id: " + req.params.dishId);
});


Alternative approach
______________________

create server-4.js

We saw earlier that for each get,post,put,delete we had explicitly specified the url. But the chance
of making mistakes in that case is very high

Soln: use Express Router

var dishRouter = express.router();
dishRouter.use(bodyParser('json'));

Think of this dishRouter as a mini express application

so it supports all methods like use, get, put, post etc

Also it supports another method called route

dishRouter.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end("Will send all the dishes to u!!");
    })
    .post(function (req, res, next) {
        res.end("Will add the dish: " + req.body.name + " with details: " + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end("Deleting all the dishes!!");
    });


I am supporting get, post and delete on this route

dishRouter.route('/:dishId')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end("Will send details of dish with id: " + req.params.dishId + " to you!!");
    })
    .put(function (req, res, next){
        res.write("Updating dish with id: " + req.params.dishId);
        res.end("Will update the dish: " + req.body.name + " with details: " + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end("Deleting the dish with id: " + req.params.dishId);
    });

Having coded the routes attach the dishRouter to the app

app.use('/dishes', dishRouter);


Express Generator
___________________________


Helps us to scaffold out an entire Express application

sudo npm install express-generator -g

express is now like a command available on terminal Windows

express <App name> : Generates this app

We want to use this express generator to build the REST API which we had built earlier

express node-express-gen

A new folder node-express-gen is created
Go into that folder->package.json
It shows dependencies => we need to do npm install

Go to app.js file
This looks like a typical express application which we have seen earlier

there are lots of require statements for various node modules

2 extra modules are: serve-favicon and cookie-parser

var routes = require('./routes/index');
var users = require('./routes/users');

This means we are requiring a file based node module that exists in routes folder

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

This is the view engine set up

app.use('/', routes);
app.use('/users', users);

Any request ending with '/' will be handled by routes module ie /routes/index.js file will
handle that

module.exports = app;

This module is used by /bin/www
In /bin/www we have:

var app = require('../app');
So the app in app.js module is used here

In package.json also:
"start": "node ./bin/www"

so this is the starting point

In views there exists the jade templates
Now go to routes/index.js

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

This is same router code which we did before

Go to node-express-gen folder and run sudo npm install to install dependencies

Next run npm start to start server

Use POSTMAN to send request to localhost:3000
A welcome msg Express Welcome to Express is generated
This msg is generated using index.jade file

Now we want to use this to implement dishRouter, leaderRouter and promoRouter
Copy those files into the routes folder

Also from public folder copy aboutus and index HTML files into public folder of node-express-gen

So these files will be served up by express app

Fixing app.js to use these new routers

Requiring the routers:
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

Mounting the routers:
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);


Introduction to MongoDB
_____________________________________________

MongoDB is a NoSQL Document Based Databse

Document: self-contained piece of information
eg: a JSON document: {"name":"...", "description": "......"}
Collection: Set of documents
Database: Set of collections

When u retrieve data from a Mongo Database u get back JSON document

Mongo stores data on disk in BSON (Binary JSON) format
- Supports length prefix on each value (so no need to scan entire field to know length)
- Info about type of field value
- Addnl primitive types like UTC date time, raw binary and ObjectId

ObjectId
__________
every doc in mongo must have _id field associated with it

Default ObjectId is created by MongoDB when we insert a document
eg:
{
    "_id":ObjectId("56ce76c0....."),
    "name":"...." 
}

ObjectId is a 12 byte field

TimeStamp(4)|Machine ID(3)|Proc. ID(2)|Increment(3)
Machine ID holds info regarding machine where Database is running
Process ID is mongo server's process ID
Increment - TimeStamp is at the resolution of a second. So within a second if multiple documents are stored,
Increment field tacks that information

id.getTimeStamp() returns the TimeStamp in ISO Date Format


Create folder mongodb in node-express-gen/
Create folder data in mongodb/

Open node-express-gen/mongodb/ in terminal
Run command: mongod --dbpath=data

Mongo runs on port 27017

use conFusion: creates new db conFusion

db.dishes.insert({name:"Uthapizza", description:"Awesome...!!"});

Here dishes is the Collection
db.dishes.find()
{ "_id" : ObjectId("57c2a018eb98020452a20465"), "name" : "Uthapizza", "description" : "Very nice" }
{ "_id" : ObjectId("57c3291bd5711a550dd8203f"), "name" : "Uthapizza", "description" : "Awesome...!!" }

 db.dishes.find().pretty()
{
        "_id" : ObjectId("57c2a018eb98020452a20465"),
        "name" : "Uthapizza",
        "description" : "Very nice"
}
{
        "_id" : ObjectId("57c3291bd5711a550dd8203f"),
        "name" : "Uthapizza",
        "description" : "Awesome...!!"
}

Note how _id gets inserted automatically

> var id = new ObjectId()
> id
ObjectId("57c33c7ad5711a550dd82040")
> id.getTimestamp()
ISODate("2016-08-28T19:33:14Z")

Node and Mongodb
_____________________________________

Node MongoDb Driver
-Provides high level API for Node app to interact with MongoDB Server
Also: Mongoose

npm install mongodb --save

Create new folder node-mongodb

sudo npm install mongodb --save in this folder
sudo npm install assert --save

A simple node-mongo app:
___________________________________


Create file simpleserver.js in node-mongodb

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
we are requiring MongoClient part of mongodb module

See simpleserver.js for full code

Now we want to create a separate module for db operations

Create file operations.js

var assert = require('assert');

exports.findDocuments = function (db, collection, callback) {
    // GET THE DOCUMENTS COLLECTION
    var coll = db.collection(collection);
    // FIND SOME DOCUMENTS
    coll.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    })
};

Note how db, collection and callback function are passed as params
So these functions would work for any db, any collection

exports.insertDocument = function (db, document, collection, callback) {
    // GET THE DOCUMENTS COLLECTION
    var coll = db.collection(collection);
    // INSERT SOME DOCUMENTS
    coll.insert(document, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted " + result.result.n + " documents into the documents collection " + collection);
        callback(result);
    });
};


exports.removeDocument = function (db, document, collection, callback) {
    // GET THE DOCUMENTS COLLECTION
    var coll = db.collection(collection);

    coll.deleteOne(document, function (err, result) {
        assert.equal(err, null);
        console.log("Removed The Document " + document);
        callback(result);
    });
};

removeDocument takes in document. This is not an entire document but a filter for identifying a document
coll.deleteOne(document, function (err, result) deletes first document in the collection
which matches the criteria


exports.updateDocument = function (db, document, update, collection, callback) {
    // GET THE DOCUMENTS COLLECTION
    var coll = db.collection(collection);

    coll.updateOne(document, {$set: update}, null, function(err, result){
        assert.equal(err, null);
        console.log("Updated document with " + update);
        callback(result);
    });
};

Update also takes in a filter i.e part of document

Create file server.js
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var dboper = require('./operations');

var url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function (err, db) {
    assert.equal(err, null);
    console.log("Connected correctly to server");
});


Now first we want to insert... Insert also takes in a callback function as argument
In this callback function we want to find

See server.js

Note the chaining of callback  functions

Mongoose
______________________________________________


Mongo stores data in form of documents
No structure is imposed on any doc
Any doc can be stored in any collection
Relies on developer principles to maintain structure of documents

If we want to impose structure mongoose ODM is the soln

It adds structure to MongoDB documents through schema

Schema Types: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array

Schema is used to create a Model function

Schema example:

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true}},
    {timestamps: true});

var dishes = mongoose.model('Dish', dishSchema);

In separate file:

var Dishes = require('./models/dishes')

var newDish = Dishes({name:"Uthapizza", description: "test"});
newDish.save(function(err){
    if(err) throw err;

    Dishes.find({}, function(err, dishes){
        if(err) throw err;
        console.log(dishes);
        ....
        ....
    })
})


{timestamps: true} adds 2 fields created_at and updated_at
These 2 fields stores info in form of date time
very useful for filtering and sorting

Here we specify model name: Dish and its schema as dishSchema

Mongo creates a collection.  The name of the collection will be the plural of model name
i.e dishes


Embedded Documents Schema
___________________________

Mongoose allows us to embed one or many docs inside another

These embedded docs are referred to as sub docs

var commentSchema = new Schema({
    rating: {type: Number, min:1, max:5, required:true},
    comment: {type: String, required: true},
    author: {type: String, required: true},
}, {timestamps: true});

var dishSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true}
    comments:[commentSchema] },         // ---- NOTE THIS LINE
    {timestamps: true});

var dishes = mongoose.model('Dish', dishSchema);

In mongoose when we insert a sub doc each sub doc also gets a MongoDB ID
So they can also be identified

In the earlier eg we created a doc and called save()

We can directly do create() on the model and pass the document in as a parameter

Dishes.create({
    name:"",
    description:"",
    comments: [
        {rating: 3, comment:"", author:"MINI"},
        {rating: 2, comment:"", author:"SHONA"}
    ]
}, function(err, dish){
    ...
})


Exercise Mongoose ODM
______________________________

Create folder in node-examples/ as node-mongoose

In terminal do sudo npm init

Now do npm install mongoose
npm install assert

Within folder node-mongoose create folder models
In models create file dishes-1.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// CREATE A SCHEMA

var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
},{timestamps: true});

Create the model:
var Dishes = mongoose.model('Dish', dishSchema);

Since the first parameter of model is Dish Mongoose will create a collection
having name dishes i.e the plural of that

Finally:
module.exports = Dishes;

We now need to write a node module to make use of this schema


Create file server-1.js

var mongoose = require('mongoose'), assert = require('assert');

var Dishes = require('./models/dishes-1');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected correctly to server');
});


db.once('open', function () {
    console.log('Connected correctly to server');

    // DO DB OPERATIONS HERE

    // CREATE DISH
    var newDish = Dishes({
        name: "Uthapizza",
        description: "Test"
    });

    // INSERT
    newDish.save(function (err) {
        if (err) throw err;
        console.log('Dish Created!!');

        // GET ALL DISHES
        Dishes.find({}, function (err, dishes) {
            if (err) throw err;
            console.log(dishes);

            db.collection('dishes').drop(function () {
                db.close();
            });
        });
    });
});

Create another file server.js

db.once('open', function () {
    console.log('Connected correctly to server');

    // CHANGE CODE HERE
});



db.once('open', function () {
    console.log('Connected correctly to server');
    Dishes.create({
        name: "UthaPizza",
        description: "Test"
    }, function (err, dish) {
        if (err) throw err;
        console.log(dish);
        // CAPTURE ID OF THE DISH
        var id = dish._id;
        //DELAY
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: "Updated Test"
                }
            }, {
                new: true
            })
                .exec(function (err, dish) {
                    if(err) throw err;
                    console.log("Updated Dish!!");
                    console.log(dish);

                    db.collection('dishes').drop(function () {
                        db.close();;
                    });
                });
        }, 3000);


    });

});

findByIdAndUpdate: this is method supported by mongoose

Then we introduce a delay. This is done so that there is a difference(3 secs) bw created_at
and updated_at fields

findByIdAndUpdate takes as first param the id of the dish which we have already found out

2nd param: what to update

3rd param: option specifying new:true
new: true => return the updated dish

.exec() -> executes the query

It takes callback as parameter

When we run this :
dish gets created ... 3 secs ... updated and updated dish is returned... collection is dropped


Sub Documents:
___________________

In models create dishes-2.js

We want to introduce comments as part of the dishes document

var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {timestamps: true});


We have created comment schema. We now want to add it as a sub doc in dishes schema

comments: [commentSchema]

note: [] ensures that it accepts an array of objects each of which which satisfy commentSchema


Create a new server file i.e server-3.js

copy code from server-2

require dishes-2 module
var Dishes = require('./models/dishes-2');

Dishes.create({
        name: "UthaPizza",
        description: "Test"
        ...
})

Now i would like to insert a comment here as well

comments: [
            {
                rating: 3,
                comment: "Awesome Dish !!",
                author: "Budhhu Mini"
            }
        ]

Now we want to insert a new comment into an existing dish:

We can use push() method of mongoose for this


.exec(function (err, dish) {
                    if (err) throw err;
                    console.log("Updated Dish!!");
                    console.log(dish);

                    // UPDATING COMMENTS
                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m loving It!!',
                        author: "Shona"
                    });

                    dish.save(function (err, dish) {
                        console.log("Updated Comments !!");
                        console.log(dish);

                        // SET DATABASE TO PRISTINE CONDITION
                        db.collection('dishes').drop(function () {
                            db.close();
                        });
                    })


                });

Data:

{ __v: 0,
  updatedAt: Wed Aug 31 2016 01:38:19 GMT+0530 (IST),
  createdAt: Wed Aug 31 2016 01:38:19 GMT+0530 (IST),
  name: 'UthaPizza',
  description: 'Test',
  _id: 57c5e7b31bdb82f2261c3770,
  comments:
   [ { updatedAt: Wed Aug 31 2016 01:38:19 GMT+0530 (IST),
       createdAt: Wed Aug 31 2016 01:38:19 GMT+0530 (IST),
       rating: 3,
       comment: 'Awesome Dish !!',
       author: 'Budhhu Mini',
       _id: 57c5e7b31bdb82f2261c3771 } ] }

Note how each comment also has updatedAt and createdAt fields and each comment has its own _id field



REST API WITH EXPRESS, MONGO AND MONGOOSE
_________________________________________________________

Now we have built a REST API using Express
Also we have built a MongoDB database using mongoose

We have to combine these together to build a full fledged REST API

For eg GET operation on REST API would trigger a QUERY on Database
POST operation on REST API would trigger a CREATE on Database

Thus an HTTP request has to be mapped to Database Operation

Create a new Express app
run: express rest-server

A new Express app called rest-server is now created

We have already built express REST API.. We will use that code

Go to node-express-gen/
Copy app.js
replace app.js file in rest-server/

Next: copy in the routes we developed

Copy dishRouter, leaderRouter and promoRouter

Next: Setting up the Mongoose models

Copy models/ folder from node-mongoose folder into rest-server


In app.js:

Here we want to initiate connection to mongodb server

var mongoose = require('mongoose');
var url = 'mongodb://localhost:27107/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected correctly to server');
});

Now we want to make the dishRouter work in communicating with the mongoDB Server

Open dishRouter.js

Require mongoose and dishes model

var mongoose = require('mongoose');
var Dishes = require('../models/dishes');

Now we need to configure GET, POST, PUT, DELETE methods

Remove the .all() part

.get(function (req, res, next) {
        Dishes.find({}, function (err, dish) {
            if(err) throw err;
            res.json(dish);
        });
    })


res.json() is a method on response msg that we are gonna send back. It converts js object to JSON

Note: status code 200 and content-type: application/json will be set automatically

Now we will update post() method

When we POST body of msg will contain new dish to be posted into the dishes collection
Also remember that the request's body will be converted in JSON by body-parser

Dishes.create(req.body, function (err, dish) {
            if(err) throw err;
            console.log('Dish created');
            var id = dish._id;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Added the dish with id: ', id);
        });


req.body is the dish to be added in JSON. In addition to adding the dish we are also
sending a reply back to the client

DELETE

.delete(function (req, res) {
        // res.end("Deleting all the dishes!!");
        Dishes.remove({}, function (err, resp) {
            if(err) throw err;
            res.json(resp);
        });
    })

resp -> response.. It is a js object indicating how many objects are deleted

Next we have to take care of those operations which require the parameters

We delete the all() part

.get(function (req, res, next) {
        // res.end("Sending the dish with id: " + req.params.dishId);
        Dishes.findById(req.params.dishId, function (err, dish) {
            if(err) throw err;
            res.json(dish);
        })
    })


.put(function (req, res) {
        Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {new: true}, function (err, dish) {
            if(err) throw err;
            res.json(dish);
        });
    });

.delete(function (req, res, next) {

        Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {
            if(err) throw err;
            res.json(resp);
        });
    })

Handling Comments
______________________

Handling comments is a special case as comments are embedded inside the dish documents themselves

dishRouter.route('/:dishId/comments')
    .get(function (req, res) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if(err) throw err;
            res.json(dish.comments);
        });
    })

.delete(function (req, res) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            for (var i = dish.comments.length; i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save(function (err, result) {
                if (err) throw err;
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Deleted all comments!!');
            });
        });
    })


For specific comments:

dishRouter.route('/:dishId/comments/:commentId')

get():

.get(function (req, res) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if(err) throw err;
            res.json(dish.comments.id(req.params.commentId));
        });
    })


For put() we delete the existing comment and insert updated comment as a new comment

Testing the API
___________________

Open POSTMAN

POST on http://localhost:3000/dishes/

{
    "name": "Uthapizza",
    "image": "images/uthapizza.png",
    "category": "mains",
    "label": "Hot",
    "price": "4.99",
    "description": "ok"
}
This data is sent in body of request msg

GET http://localhost:3000/dishes/
GET http://localhost:3000/dishes/57cbe3eb5aed752011b98e0e to GET dish with specific id

PUT http://localhost:3000/dishes/57cbe3eb5aed752011b98e0e
msg:
{"label": "New"}

The label will be updated

POST A COMMENT:

POST http://localhost:3000/dishes/57cbe3eb5aed752011b98e0e/comments

msg:
{
  "rating": 5,
  "comment": "Imagine all the eatables, living in conFusion!",
  "author": "John Lemon"
}

GET all comments: http://localhost:3000/dishes/57cbe3eb5aed752011b98e0e/comments

GET particular comment http://localhost:3000/dishes/[dishId]/comments/[commentId]


Updating a Specific comment:

PUT http://localhost:3000/dishes/57cbe3eb5aed752011b98e0e/comments/57cc04be76cd31d817990f0a

msg: updated comment object

{
  "rating": 5,
  "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
  "author": "Paul McVites"
}


Also note id of that comment would be changed

DELETE first comment

DELETE http://localhost:3000/dishes/57cbe3eb5aed752011b98e0e/comments/57cc048776cd31d817990f09


BASIC AUTHENTICATION
_______________________________

When a client initiates a request server may respond back with HTTP 401 i.e unauthorized user

Reply from server:
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic

WWW-Authenticate: Basic is header field. It specifies that basic access authentication is to
be performed by the client

In response to this the client will request for user to type in username and password
It will take this username and password and encode it in the next outgoing request:

GET /index.html HTTP/1.1
Authorization: Basic QWxhZGRpbjpvcGVUIHNIc2FtZQ==
Host: www.cse.ust.hk

QWxhZGRpbjpvcGVUIHNIc2FtZQ is a base64 encoded string

Authorization Header:

1. Username and password are combined into a string "username:password"
2. The resulting string literal is then encoded using base64
3. Authorization method and a space is put b4 encoded string:
Authorization: Basic QWxhZGRpbjpvcGVUIHNIc2FtZQ==

Using express we can require authentication at various levels: for entire app, for specific route or
for specific operation on a given route

Exercise
___________

Create folder basic-auth

From node-express/ copy server.js and public folder and package.json and paste into basic-auth/

do sudo npm install

Here we want to do authentication on the entire application i.e whenever u access server u need to
authenticate yourself

We are going to create a specific middleware called auth and inside this we will insert the code that
does the basic authentication

We expect username and password to be passed in as basic authentication from the client side
That will come in as request message in request authentication field

function auth(req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    if(!authHeader){
        var err = new Error('You are not authenticated!!');
        err.status = 401;
        next(err);
        return;
    }
}

status code 401 means authorization has failed

note the calling of next() with err as parameter:

this automatically raises the error
So as we go down the chain of middlewares only the function that takes the error and
then uses it will be triggered. The remaining ones will be bypassed!!

If authorization header is set we need to parse out authorization header to extract
out username and password

var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
var user = auth[0];
var pass = auth[1];
if(user == "admin" && pass == "password"){
    next();
}
else {
    var error = new Error('You are not authenticated!!');
    error.status = 401;
    next(error);
}


next() -> if authenticated correctly continue on to the next middleware

Note: next middleware is app.use(express.static(__dirname + '/public/'));

Finally this auth() function is a middleware
We need to use it

app.use(auth);


Order of middlewares:
_________________________

Middlewares are applied to any incoming requests in the order specified in the application

1. app.use(morgan('dev'));
2. app.use(auth);
3. app.use(express.static(__dirname + '/public/'));

So first it will do the logging
Then it will apply auth function
Then it will do static serving of files

We now need a middleware to handle error

app.use(function (err, req, res, next) {
    ...
});

so next(err) drops into this middleware

app.use(function (err, req, res, next) {
    res.writeHead(err.status || 500, {
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
});

'WWW-Authenticate': 'Basic',
'Content-Type': 'text/plain'

We are sending this as a response to client to remind them that basic authentication is needed

err.message will be var error = new Error('You are not authenticated!!'); i.e You are not authenticated!!

Run app..

Since we did console.log(req.headers); a bunch of info is printed into the console

GET /aboutus.html 304 1.143 ms - -
{ host: 'localhost:8080',
  connection: 'keep-alive',
  authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'accept-encoding': 'gzip, deflate, sdch',
  'accept-language': 'en-US,en;q=0.8,ru;q=0.6',
  cookie: 'csrftoken=QuMmkiwwrYQHqfCGBDqV3k54e78KwFrZ; _ga=GA1.1.417615266.1469763276',
  'if-none-match': 'W/"9b-1568a776258"',
  'if-modified-since': 'Sun, 14 Aug 2016 19:11:35 GMT' }

authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',

This is username and password encoded in base64


Cookies and Express Sessions
___________________________________________________________

Cookies: way for a server to track clients. Also client can send small pieces of info in the header
so that the server can track the clients. Cookie is included in the request header

Sessions: way of managing user sessions. HTTP is a state less protocol. So every request coming in
from the client is a new request. This is for the sake of scalability
But we need server to remember something about the client. Cookies and sessions help us here

When server wants client to set a cookie, it sends a header:
HTTP/1.1 401 Unauthorized
Set-Cookie: xxx...

Client remembers this cookie and all subsequent request from client will include a header field as:
GET /index.html HTTP/1.1
Cookie: xxx...
Host: abc.xyz

Server extracts this cookie and identifies client

Express Cookies:
____________________

Express server can send a cookie on client side by using cookie method on response msg
res.cookie(name, value, options)

Cookies are parsed using cookie-parser which is a middleware

Cookie-parser parses incoming cookies and attaches them to request msg:
req.cookies.name

Cookies can be forged from Client side. To avoid this server can set a Signed Cookie on client side
Signed cookie: cookie signed with a secret key on server side. Only server knows this

In cookie, server includes a digital signature with a key-hash msg authentication code
This sign is included in cookie and available for client
If Client or any other man-in-the-middle tries to modify cookie, when cookie is received by server
it will recognize this tamperance

In option specify sign = true
Client side:
app.use(cookieParser('secret key');
cookieParser requires secret key so that it can ensure that incoming cookie has not been tampered with

If cookie is valid, signed cookie is made available in request object on server side as:
req.signedCookie.name

Express Sessions
___________________

Cookies suitable for small info only

Express sessions is a middleware

It enables us to track user on server side using 2 pieces of info:

-Combination of cookie where session-id is set. This session-id is used
as a key to access storage on server side. This storage can track a lot more info about
the session b/w client and server. Session info is stored in memory in server side.
So if server is restarted this memory is wiped out. So info will be lost if server restarts.
If we need to access info across server restarts we need some kind of permanent storage on server side:
- use either local store or mongoose store
Also we can have multiple replicated servers. All these servers have distributed session store.
So any of them has session info. This is also supported through express sessions

Express session Middleware:

var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(session({
name: 'session-id',
secret: '12345-67890-09876-54321',
saveUninitialized: true,
resave: true,
store: new FileStore()
}));

var FileStore = require('session-file-store')(session); => We are using local file store

name, secret, etc are set of options
secret is the secret key for signing the cookie
store: what is being used to store the info permanently
default:info will be tracked in-memory in server side

When a client req comes, cookie is parsed and session info is made available as:
req.session.name

Exercise: Using cookies
_____________________________

install cookie-parser: sudo npm install cookie-parser --save

Go into server.js
var cookieParser = require('cookie-parser');

Now we need to have our express app use this
Declare this as a middleware

app.use(cookieParser('12345-67890-09876-54321')); // SECRET KEY

If a client sends back a cookie in the client request then the cookie info will be
parsed and made available as js object on my request object

From server side we need to sign the cookie and send it so that client cant modify the cookie

If client modifies the cookie that cookie will no longer be valid

12345-67890-09876-54321 is the secret signing key

When we wrote the auth() function we were checking the authHeader to check user

We expect authHeader to be included when user first signs in. At that point we include a cookie
from server side and in all subsequent requests we are going to be checking for that cookie

So basically now every time client communicates back to server request will include a cookie. This cookie
will be available as an object on the request thanks to cookie-parser

We are going to send a cookie with name "user".. We will do this later

function auth(req, res, next) {
    console.log(req.headers);

    // CHECK FOR SIGNED COOKIE
    if(!req.signedCookies.user)
    {
        var authHeader = req.headers.authorization;
        if(!authHeader){
            var err = new Error('You are not authenticated!!');
            err.status = 401;
            next(err);
            return;
        }
        var test = Buffer(authHeader.split(' ')[1], 'base64');
        console.log("Un encoded string is", test.toString());
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if(user == "admin" && pass == "password"){
            next();
        }
        else {
            var error = new Error('You are not authenticated!!');
            error.status = 401;
            next(error);
        }
    }

}


Basically here first we are checking if the cookie exists in the request msg or not

If not, that means user has not been verified yet and we expect them to type in username and password

Now where to set up the cookie? When we know user has typed in correct username and password

if (user == "admin" && pass == "password") {
    // AUTHORIZED SO SET COOKIE NOW
    res.cookie('user', 'admin', {signed: true});
    next();
}

res.cookie() takes 3 params: name of cookie, value of cookie, additional options

if signed: true, the cookie will be signed from server side using secret key supplied in cookie-parser

When this cookie is sent to client side, the client will have to send back the cookie on each subsequent
request. If cookie gets modified, signature will become invalid.

function auth(req, res, next) {
    console.log(req.headers);

    // CHECK FOR SIGNED COOKIE
    if (!req.signedCookies.user) {
        ...
        ...
    }
    else{

    }
}

The else { } part is for when the cookie is included in the header of request

else {
    if (req.signedCookies.user === 'admin') {
        console.log(req.signedCookies);
        next();
    }
    else {
        var err = new Error('You are not authenticated!!');
        err.status = 401;
        next(err);
    }
}

Start the server

Go to localhost:8080

Initially a prompt for username and password comes
Then when we type in correct username and password index.html is displayed

Look at info printed out on console in server side

Initially server sent 401 saying not authorized. so client was asked to input
username and password.
On typing  correct username and password 200 status code is generated


Note in console how cookie is being set . It looks something like this:
cookie: user=s%3Aadmin.JcV7NX1Ag7X8eh7Qf%2FeHKf78cwDGDhH%2Bh0bM2yXAIQc'

If we restart browser we need to authenticate ourselves again
This is browser session based cookie
As soon as we close our browser the cookie will be deleted

There are ways to specify cookies for a certain duration


Express Sessions Exercise
_______________________________


npm install express-session session-file-store --save

express-session and session-file-store are 2 separate modules. We are simply installing them at once

Express session by default uses in memory storage to track sessions

Create file server-2.js and copy all the code from server.js

var session = require('express-session');
var FileStore = require('session-file-store')(session);

We do not need to use cookie-parser anymore. Cookie will be set by express session

We had:
app.use(cookieParser('12345-67890-09876-54321')); // SECRET KEY

Replace to use sessions

app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));

In case incoming request has the cookie in there, this will add a session object to request object

so req.session will be available to us

We had:
if (!req.signedCookies.user)

Replace with:
if (!req.session.user)


Earlier when user was authorized we were setting cookie as follows:
if (user == "admin" && pass == "password") {
    // AUTHORIZED SO SET COOKIE NOW
    res.cookie('user', 'admin', {signed: true});
    next();
}

instead, we are now going to do:
if (user == "admin" && pass == "password") {
    req.session.user = 'admin';
    next();
}

Also:

if (req.session.user === 'admin') {
    console.log('req.session:', req.session);
    next();
}

Run this app
Open POSTMAN

test app

Token Based Authentication
____________________________

Cookie + session based auth do not scale very well

Steps:
1. User requests access with username and password
2. Server validates credentials
3. Server creates a signed token and sends it to user. Nothing is stored on server
4. All subsequent requests from client should include the token
5. Server verifies the token and responds with data if validated

There is a specific token standard: JSON Web Tokens (JWT)
-standard based: IETF RFC 7519*
-self-contained: carry all info necessary within itself
-sharable: Can share it with other apps to act on your behalf

JWT Structure:

HEADER      |       PAYLOAD     |      SIGNATURE

{
"typ":"JWT",                            HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
"alg":"HS256"
}

The header carries info about how the JWT is encoded
HS256: algorithm
 used for encryption

Payload: Carries info. We can encode and put some info into the payload.
This can be decoded on server side and this info can be used on the server side and be
used to identify some info about the client

Signature: Used to encapsulate and validate the token. Server uses secret key. This is known to server only
That secret along with additional info from other parts of JWT is taken together abd encoded and that
encoded info is put in signature

If a malicious user messes with ANY part of the JWT, the signature will no longer hold

we need to install module jsonwebtoken

sudo npm install jsonwebtoken --save

jsonwebtoken provides methods:

- sign() : takes user info and encodes that together with secret key and create the JWT. Then from server side
u will ship this to the client and subsequently client keeps sending this token with every request

- verify() : incoming token can be verified. We will verify the token and then decide if the user is
authorized or not. It will then make it available on the request property in Express


PASSPORT
_____________________


Passport is an authentication middleware for node

Strategies:
- Local Strategy: manage our own user accounts with username and password
- OpenID
- Oauth (Facebook, Twitter, Google+)

sudo npm install passport --save

passport supports a method called passport.authenticate('local')

local-> strategy used for authentication
We can apply this functionality to any route or location within our app

example 1:
app.post('/login', passport.authenticate('local'), function(req, res){
    //If this function gets called authentication was successful
    // 'req.user' contains authenticated user

    res.redirect('/users/' + req.user.username)
})

example 2:

we can also specify a custom callback function

passport has built in methods like req.login() and req.logout()

app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        if(err){ return next(err); }
        if(!user){ return res.json({...}) }

        req.login(user, function(err){
            if(err){ return next(err); }
            return res.json({...});
        });
    })(req, res, next);
});

Passport-Local:

Strategy for authenticating user locally with username and password

sudo npm install passport-local --save

passport.use(new LocalStorage(function(username, password, done)){
    User.findOne({ username: username }, function(err, user){
        if(err){ return done(err); }

        if(!user){ return done(null, false); }

        if(!user.verifyPassword(password){ return done(null, false); })

        return done(null, user);
    });
});

Passport-Local-Mongoose:

Passport Local Strategy can be used with Mongoose in an even easier manner
with help of Passport-Local-Mongoose

sudo npm install passport-local-mongoose

This makes available Mongoose schema for managing users

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

Note:
var User = new Schema({});
We dont need to specify anything within the schema. passport-local-mongoose automatically
assumes 2 fields: username: String, unique and password: String

This password is not stored directly but stored in an encrypted form using salt and hashing

Exercise
____________________

For our express app we want some routes to be authenticated and restricted only
for certain users

For eg we may allow GET request for all users but POST and DELETE should be restricted to admins only

Make a copy of rest-server/ and call it rest-server-passport

sudo npm istall

sudo npm install passport passport-local passport-local-mongoose --save

sudo npm install jsonwebtoken --save

Create a file config.js

Here we want to store some configuration information

module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl': 'mongodb://localhost:27017/conFusion'
};

Adv : Only 1 single location to update configurations

In app.js

var config = require('./config');
mongoose.connect(config.mongoUrl);

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// PASSPORT CONFIGURATION
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

These are the configurations for passport

app.use(passport.initialize()); : Used to initialize Passport

passport.use(new LocalStrategy(User.authenticate())); : User.authenticate() will be a
strategy that will be exported by User model in which we will use passport-local-mongoose plugin


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

These are 2 methods that passport-local-mongoose support

Previously we had:

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


Change to:
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

So if error occurs instead of sending HTML we are sending error as JSON
This is bcoz our clients will be angular or ionic apps
If we return HTML they wont understand

Same for production error handler

Setting up User Schema and Model:

Create file user.js in models/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);


User.plugin(passportLocalMongoose);: This is a mongoose supported plugin that we are going to use
This provides a lot of interesting features

Open routes/users.js:

We want to change this file to include code to add features like login and logout for users

var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

This verify model will be created later
It will contain everything related to managing json web tokens and verifying user identities

Register:
When we register a new user, POST operation on REST end point will be issued.
We assume username and password is available in the body of the msg

router.post('/register', function (req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
    if(err){
      return res.status(500).json({err: err});
    }

    // CROSS CHECK IF REGISTRATION WAS SUCCESSFUL
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration Successful!'});
    });
  });
});

Login:
Here also we assume username and password will be set on the body of the msg


router.post('/login', function (req, res, next) {
  // req.body will contain username and password
  passport.authenticate('local', function (err, user, info) {
    if(err){
      return next(err);
    }
    if(!user){
      // IF USER IS NOT VALID OR WRONG PASSWORD OR DUPLICATE USER ETC
      return res.status(401).json({ err: info});
    }
    // PASSPORT LOGIN METHOD
    req.logIn(user, function (err) {
      if(err){
        return res.status(500).json({ err: 'Could not log in user'});
      }

      // VALID USER
      console.log('User in users: ', user);

      // GENERATE TOKEN
      var token = Verify.getToken(user); // RETURNS A TOKEN

      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    })
  })(req, res, next);
});


Read the comments carefully

If user is authenticated server sends back a token
Now client should send back the token as part of every single request coming in

Logout:

router.get('/logout', function (req, res) {
  req.logout(); // PASSPORT METHOD

  // ALSO TOKEN WILL BE DESTROYED HERE

  res.status(200).json({ status: 'Bye!' });
});


Create a new file in routes/ called verify.js

Here we will create a functionality that allows us to supply a validated user with a JWT
and also verify the JWT

Entire JWT methods will be here

var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

// SEND TOKEN TO VALIDATED USER

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 3600});
};

Secret key is used in generating the jwt

expiresIn: 3600 : This jwt will be valid for 1 hr

// VERIFY AN ORDINARY USER


exported.verifyOrdinaryUser = function (req, res, next) {

    // CHECK HEADER OR URL PARAMS OR POST PARAMS FOR TOKENS
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // DECODE TOKEN

    if (token) {
        // VERIFY SECRET AND CHECK EXPIRY
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var error = new Error('You are not authenticated');
                error.status = 401;
                return next(error);
            }
            else {
                // IF EVERYTHING IS GOOD SAVE TO REQUEST OBJECT FOR USE IN OTHER ROUTES
                req.decoded = decoded;
                next()
            }
        });
    }
    else {
        // IF THERE IS NO TOKEN RETURN AN ERROR
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }
};

How to use this method?
Any route that we want to control, we can use verifyOrdinaryUser method to check user


Open dishRouter.js:

var Verify = require('./verify');

Now we can do verification for any route


dishRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res) {
        Dishes.find({}, function (err, dish) {
            if (err) throw err;
            res.json(dish);
        });
    })

Do same for post and delete

.get(Verify.verifyOrdinaryUser, function (req, res)


Verify.verifyOrdinaryUser middleware is applied before next middleware is applied

when GET request comes in first verification is done, thereafter rest

Start the server
Open up POSTMAN

Testing the app:

GET localhost:3000/dishes/

{
  "message": "No token provided",
  "error": {
    "status": 403
  }
}

Similarly if we want to POST or DELETE we will get the same response

Register a user:

POST on localhost:3000/users/register

Body of request:
{"username":"mini", "password":"southpointdps"}

Response:

{
  "status": "Registration Successful!"
}


If we try to register same user again:

{
  "err": {
    "name": "UserExistsError",
    "message": "A user with the given username is already registered"
  }
}

So we can use this data to notify users better

Login:

POST localhost:3000/users/login
Body of request:
{"username":"mini", "password":"southpointdps"}

Response:

{
  "status": "Login successful!",
  "success": true,
  "token": huge string...
}

say this token = token1

copy token1

GET localhost:3000/dishes/ without token

Response:

{
  "message": "No token provided",
  "error": {
    "status": 403
  }
}

Now in header set up a field called x-access-token and set its value to token1

Response:

[
  {
    "_id": "57cbe3eb5aed752011b98e0e",
    "updatedAt": "2016-09-04T11:39:44.138Z",
    "createdAt": "2016-09-04T09:05:47.832Z",
    "name": "Uthapizza",
    "image": "images/uthapizza.png",
    "category": "mains",
    "price": 499,
    "description": "ok",
    "__v": 4,
    "comments": [
      {
        "updatedAt": "2016-09-04T11:36:16.000Z",
        "createdAt": "2016-09-04T11:36:16.000Z",
        "rating": 5,
        "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        "author": "Paul McVites",
        "_id": "57cc072f12cbaf1e1a505ac5"
      }
    ],
    "label": "New"
  },
  {
    "_id": "57d52f78ec371d278bb98658",
    "updatedAt": "2016-09-11T10:18:32.307Z",
    "createdAt": "2016-09-11T10:18:32.307Z",
    "name": "Zucchipakoda",
    "image": "images/zucchipakoda.png",
    "category": "appetizer",
    "price": 199,
    "description": "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce",
    "__v": 0,
    "comments": [],
    "label": ""
  }
]

If we change or mess with token value:

{
  "message": "You are not authenticated",
  "error": {
    "status": 401
  }
}



Now we can POST and DELETE using same method also


Note:

In verify.js we had:

exports.verifyOrdinaryUser = function (req, res, next) {

// CHECK HEADER OR URL PARAMS OR POST PARAMS FOR TOKENS
var token = req.body.token || req.query.token || req.headers['x-access-token'];
....
}

So  while issuing POST req we can send token value in body also
POST localhost:3000/dishes/

{
    "token": "...."
	"name": "Vadonut",
	"image": "images/vadonut.png",
	"category": "appetizer",
	"label": "New",
	"price": "1.99",
	"description": "A quintessential ConFusion experience, is it a vada or is it a donut?"
}

Now when we issue GET request with that token value in header we get back that dish also

Assignment
________________________

Admin functionality:

If admin flag is set to true, that user will have additional privileges

Create new function within verify.js to check whether user is admin or not

Register user
In mongo repl set admin flag to true for that user

MongoDB shell version: 2.6.12
connecting to: test
> use conFusion
switched to db conFusion
> db.users.find({}).pretty()

The users will be returned

Note: The users have fields: _id, salt, hash, username, admin, __v

So the password is NOT stored directly. it is stored in salt and hash form separately
So even the db administrator cant find out the passwords!!

passport-local-mongoose takes care of all that for us


> db.users.update({username: "admin"}, {$set: {admin: true}})

Set users permission now

Now we can test for both ordinary and admin user

verifyAdmin will be an additional middleware
When we are authenticating users we will first check to make sure if user is an ordinary user
Thereafter if user needs to perform certain operations we will check for admin

GET: any verified user

POST and DELETE: verified user && admin

For ordinary user:

DELETE localhost:3000/dishes/

response:
{
    "message": "You are not authorized to perform this operation!",
    "error": {
        "status": 403
    }
}

Login as admin and u can do all these operations

DELETE localhost:3000/dishes/[id]

Query of users by Admin:

GET localhost:3000/users/

Soln:
Protected routes: accessible only to admins:

exports.verifyAdmin = function (req, res, next) {

    // CHECK HEADER OR URL PARAMS OR POST PARAMS FOR TOKENS
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // DECODE TOKEN

    if (token) {
        // VERIFY SECRET AND CHECK EXPIRY
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var error = new Error('You are not authenticated');
                error.status = 401;
                return next(error);
            }
            else {
                // IF EVERYTHING IS GOOD SAVE TO REQUEST OBJECT FOR USE IN OTHER ROUTES
                req.decoded = decoded;
                // NOW CHECK FOR ADMIN
                var isAdmin = req.decoded._doc.admin;
                if (isAdmin) {
                    next();
                }
                else {
                    var err = new Error('Not a privileged user');
                    err.status = 403;
                    return next(err);
                }
            }
        });
    }
    else {
        // IF THERE IS NO TOKEN RETURN AN ERROR
        var err = new Error('No token provided');
        err.status = 403;
        return next(err);
    }
};

verifyAdmin() is quite similar to verifyOrdinaryUser() except


req.decoded = decoded;
// NOW CHECK FOR ADMIN
var isAdmin = req.decoded._doc.admin;
if (isAdmin) {
    next();
}
else {
    var err = new Error('Not a privileged user');
    err.status = 403;
    return next(err);
}

The info about users is stored in decoded object

In dishRouter.js:

dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res) {
    console.log(req.decoded);
    Dishes.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})


First we apply verifyOrdinaryUser. If all goes well here next() will be called hence verifyAdmin()
Similarly from verifyAdmin() if prob occurs:

var err = new Error('Not a privileged user');
err.status = 403;
return next(err);

To display users list for admin on GET localhost:3000/users/:

In users.js

var mongoose = require('mongoose');

router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    // res.send('respond with a resource');
    User.find({}, function (err, users) {
        res.json(users);
    });
});


Mongoose Population
__________________________


NoSQL databases like MongoDB do not explicitly support relations like SQL databases

All documents are normally expected to be self contained

We CAN store references to other documents by using ObjectIds

Mongoose does not have joins

eg: we have a document which stores a list of posts by users
Within each post we might have reference to user document where users info is stored
This is done using ObjectIds

Prob: consider the prob of storing comments
For a comment instead of storing the author's name store a reference to users through ObjectId of user

So we have to extend our comment schema

We include a filed called postedBy

postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}

So when we are inserting a comment into the document we should also include the user's id

Population in mongoose is the feature by which we replace the reference to a collection by the document itself
from that other collection

Dishes.find({})
.populate('comments.postedBy')
.exec(function(err, dish){
    if(err) throw err;
    res.json(dish);
});

.populate('comments.postedBy') : Mongoose automatically fetches info from users document and inserts
it into the comments document before constructing overall reply and then sends the reply

This .populate() causes query to take longer time
Where possible AVOID doing the population

Exercise
___________________

Open models/user.js

We want to introduce fields: firstname and lastname

firstname: {
    type: String,
    default: ''
},
lastname: {
    type: String,
    default: ''
}


In addition we are going to introduce an instance method for this schema
Instance method is a method which we can define for an instance of the schema

User.methods.getName = function () {
    return (this.firstname + ' ' + this.lastname);
};

Go to dishes schema in models/dishes

Previously we had

var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {timestamps: true});


Replace author field by:

postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}

So now in the postedBy field we are tracking id of user also
So when user inserts a comment we will track their user Id also

Adv: If user wants to delete or modify a comment we can cross check to make sure if the user is the one who
submitted the comment

Go to dishRouter.js

we already have user info in req.decoded._doc

So while POST in comment we can add the user id

In route : dishRouter.route('/:dishId/comments')

.post(function (req, res) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;

        // REFERENCE TO USER
        req.body.postedBy = req.decoded._doc._id;

        dish.comments.push(req.body);

        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!!');
            res.json(dish);
        })
    });
})


req.body.postedBy = req.decoded._doc._id; : req.body already contains rating and comment. In addition to that
we are adding the postedBy property also

Now that we are storing the user's id while storing the comment, later when user wants to update or delete
the comment we can cross check that the user is only updating or deleting his/her own comment

In PUT in route: dishRouter.route('/:dishId/comments/:commentId')

Here previously we were deleting the previous comment and re inserting the new comment

before re inserting insert the postedBy field so that we can keep track of user

.put(function (req, res) {
//delete existing comment and insert updated comment as a new comment
Dishes.findById(req.params.dishId, function (err, dish) {
    if (err) throw err;
    console.log(dish.comments.id(req.params.commentId));
    dish.comments.id(req.params.commentId).remove();

    // REFERENCE TO USER
    req.body.postedBy = req.decoded._doc._id;
    dish.comments.push(req.body);

    dish.save(function (err, dish) {
        if (err) throw err;

        console.log('Updated Comments!!');
        res.json(dish);
    });
});

Now for DELETE: we have to check that user who inserted the comment is the one trying to delete it

.delete(function (req, res) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;

        // CHECK IF USER WHO CREATED COMMENT IS DELETING IT

        if(dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id){
            var error = new Error('You are not authorized to perform this operation!');
            error.status = 403;
            return next(error);
        }

        dish.comments.id(req.params.commentId).remove();

        dish.save(function (err, resp) {
            if (err) throw err;

            res.json(resp);
        });
    });
});


Now we want that deleting, put and post of comment can be allowed by ordinary user
But delete of all comments is to be allowed only for admins

dishRouter.route('/:dishId/comments')
    .all(Verify.verifyOrdinaryUser)

for all operations in this route only verified user will be allowed

For delete:

.delete(Verify.verifyAdmin, function (req, res) : This delete operation is to delete all the comments


Similarly for route: dishRouter.route('/:dishId/comments/:commentId')

dishRouter.route('/:dishId/comments/:commentId')
    .all(Verify.verifyOrdinaryUser)

We check for registered user

Also we have ensured that delete operation can be done by user who had
inserted the comment in the first place

When we do GET on comments we also want to populate data about users who submitted the comment
before sending the data back to the client
We can use populate() function for this.

Previously we had:
dishRouter.route('/')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res) {
    console.log(req.decoded);
    Dishes.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

now before returning the dishes we want to return the users for comments as well

dishRouter.route('/')
    .get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res) {
        console.log(req.decoded);
        Dishes.find({})
            .populate('comments.postedBy')
            .exec(function (err, dish) {
                if(err) throw err;
                res.json(dish);
            })
    })

We have to do same for individual dish request

Similarly for individual dish:

dishRouter.route('/:dishId')
    .get(Verify.verifyOrdinaryUser, function (req, res) {
        // res.end("Sending the dish with id: " + req.params.dishId);
        Dishes.findById(req.params.dishId)
            .populate('comments.postedBy')
            .exec(function (err, dish) {
                if(err) throw err;
                res.json(dish);
            })
    })

For comments of a dish

dishRouter.route('/:dishId/comments')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res) {
        Dishes.findById(req.params.dishId)
            .populate('comments.postedBy')
            .exec(function (err, dish) {
                if(err) throw err;
                res.json(dish.comments);
            });
    })

For specific comments:

dishRouter.route('/:dishId/comments/:commentId')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res) {
        Dishes.findById(req.params.dishId)
            .populate('comments.postedBy')
            .exec(function (err, dish) {
                if(err) throw err;
                res.json(dish.comments.id(req.params.commentId));
            });
    })


Now go to routes/users.js

Here we had Register Code as:

router.post('/register', function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }

        // CROSS CHECK IF REGISTRATION WAS SUCCESSFUL
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
        });
    });
});


Here we did not track remaining info about users like firstname and lastname

In the function we see that when the registration is done the registered user info comes back as user
So then we need to push in firstname and lastname info

router.post('/register', function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        if(req.body.firstname){
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname){
            user.lastname = req.body.lastname;
        }
        user.save(function (err, user) {
            // CROSS CHECK IF REGISTRATION WAS SUCCESSFUL
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
});


Start the app:

Register a couple of users: MiniNormal and MiniAdmin

Next in mongo REPL update MiniAdmin to set admin: true

Log in As MiniAdmin

Clear out all dishes by sending DELETE request to localhost:3000/dishes/

Now POST dishes

POST a couple of dishes

Now we want to comment as a Normal User
Log in as miniNormal

GET the dishes

there will be 2 dishes
Comment on first dish

57dd225d1c751b2ad26dde65: id of 1st dish

POST to localhost:3000/dishes/57dd225d1c751b2ad26dde65/comments
{
	"rating": 5,
	"comment": "Imagine all the eatables, living in conFusion!"
}

The response:

{
  "_id": "57dd225d1c751b2ad26dde65",
  "updatedAt": "2016-09-17T11:10:46.681Z",
  "createdAt": "2016-09-17T11:00:45.872Z",
  "name": "Uthapizza",
  "image": "images/uthapizza.png",
  "category": "mains",
  "price": 499,
  "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
  "__v": 1,
  "comments": [
    {
      "updatedAt": "2016-09-17T11:10:46.680Z",
      "createdAt": "2016-09-17T11:10:46.680Z",
      "rating": 5,
      "comment": "Imagine all the eatables, living in conFusion!",
      "postedBy": "57dd1fdc30a0fd284edaba37",
      "_id": "57dd24b66d9a0f2ba74afb36"
    }
  ],
  "label": "Hot"
}

Note how user info is automatically added in postedBy field

Now do GET localhost:3000/dishes/ to test populate()

The dish is returned as:

{
    "_id": "57dd225d1c751b2ad26dde65",
    "updatedAt": "2016-09-17T11:10:46.681Z",
    "createdAt": "2016-09-17T11:00:45.872Z",
    "name": "Uthapizza",
    "image": "images/uthapizza.png",
    "category": "mains",
    "price": 499,
    "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
    "__v": 1,
    "comments": [
      {
        "updatedAt": "2016-09-17T11:10:46.680Z",
        "createdAt": "2016-09-17T11:10:46.680Z",
        "rating": 5,
        "comment": "Imagine all the eatables, living in conFusion!",
        "postedBy": {
          "_id": "57dd1fdc30a0fd284edaba37",
          "username": "miniNormal",
          "__v": 0,
          "admin": false,
          "lastname": "Sen",
          "firstname": "MiniNormal"
        },
        "_id": "57dd24b66d9a0f2ba74afb36"
      }
    ],
    "label": "Hot"
  }


So postedBy is populated
"postedBy": {
             "_id": "57dd1fdc30a0fd284edaba37",
             "username": "miniNormal",
             "__v": 0,
             "admin": false,
             "lastname": "Sen",
             "firstname": "MiniNormal"
           }

Thus cross referencing across 2 documents is done: dishes and users

Also check that only the user who entered the comment can delete the comment


HTTPS And Secure Communication
_____________________________________________


We have seen that whenever we want to do user auth, username and password needs to be submitted to server
If this info is communicated over standard http protocol it is insecure
This is because all the info is transmitted in plain text format. So any intruder can catch
that information

This is where HTTPS comes in

Symmetric Encryption:

Both sender and receiver share a single secret key
Intruder does not have key so cant decrypt msg

Prob: both sides need to agree on this key

This is not possible always over the internet

Asymmetric Encryption:

2 diff keys: public and private

When someone wants to send us msg they will encrypt msg using our public key
This encrypted msg can be decrypted using private key only

Public key cryptography is expensive computation wise so we dont use it everywhere

So we use Public key cryptography between sender and receiver initially to agree on a secret key
Both sides now have shared secret key so they can now use Symmetric Encryption

SSL Protocol uses this approach

Secure Socket Layer(SSL)/Transport Layer Security(TLS):

These are cryptographic protocols that ensure secure communication of sender and receiver over
an insecure network like the internet

It uses public key + symmetric key cryptography

Privacy + Integrity is maintained

Privacy: No malicious third party can extract the msg
Integrity: Receiver will be assured that msg has not been tampered with

SSL/TSL Handshake:

1. Client indicates to server its intention to communicate
2. Server sends to client a certificate. This contains public key of server. This public key is certified
by a certification authority (CA)
3. Once this key is certified client gets assured that it is communicating with the real server
4. Client receives certificate. Extracts info and verifies authenticity and extracts public key
5. Client generates a Pre Master Secret. This is something both server and client use to generate a Session Key
Client generates a Pre Master Secret. Client encrypts the Pre Master Secret using server's public key and
then sends secret across to server. Now nobody other than server can extract encrypted  msg
6. Server extracts Pre Master Secret from encrypted msg. Both client and server have same Pre Master Secret
7.Both client and server use the same set of algorithms to generate a Session key
8. Symmetric key Encryption can now be done using the Session Key

HTTPS:

If we run HTTP on top of SSL, when client sends HTTP msg, it will be encrypted by SSL layer and on receiver side
the server will be able to decrypt msg and pass it on to HTTP layer

Node supports https as a core module

var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync(__dirname + '/private.key');
    cert: fs.readFileSync(__dirname + '/certificate.pem');
};

var secureServer = https.createServer(options, app);

Also we want to redirect incoming traffic that comes to our insecure server to our secure server


Exercise:

We want to update our REST server so that it uses HTTPS

In bin/www.js

var https = require('https');
var fs = require('fs');

Standard web servers run on port 80
HTTPS Servers run on Port 443

We are going to use port 3443 to run HTTP server

app.set('secPort', port + 443);

We want to set up our HTTPS server together with the HTTP server. We will run 2 servers
We will redirect any traffic that comes to HTTP Server to HTTPS server

// SET UP PRIVATE KEY AND CERTIFICATES

var options = {
    key: fs.readFileSync(__dirname + '/private.key'),
    cert: fs.readFileSync(__dirname + '/certificate.pem')
};


We will use our own self generated certificates and keys for testing

var secureServer = https.createServer(options, app);
secureServer.listen(app.get('secPort'), function () {
    console.log('Secure Server running on port', app.get('secPort'));
});

secureServer.on('error', onError);
secureServer.on('listening', onListening);

Now we need to modify app.js to redirect traffic from insecure server to secure server


In app.js

var app = express();


// FIRST MIDDLEWARE TO INTERCEPT INCOMING TRAFFIC

app.all('*', function (req, res, next) {
    if(req.secure){
        return next();
    }
    res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url);
});

if incoming request is coming to secure server then there will be property secure in
incoming req object

if we receive request for insecure server then we redirect

req.hostname: localhost

req.url: it gives the url


Generate self signed private key and certificate:

Go to bin/

openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem


Go to https://localhost:3443 to test this


Oauth and User Authentication
_______________________________________

Oauth Providers: Facebook, Google, Github etc
We can authorize ourselves using these

OAuth1 and OAuth2
___________________

Authorization framework based on open standards for Internet users to log into third party
websites/apps using their Social Network accounts

OAuth2 Roles:
There are 4 different roles:

1. Resource owner: The user who has a social nw account and wants to authorize another app i.e a client
app the account to get some info

2. Client Application: Application that wants to access resource server to obtain info about us. It wants access to
our info from an OAuth Service Provider like Facebook

3. Resource Server: Server hosting protected data like personal info that client app wants to access

4. Authorization Server: This is server that issues access token to client app upon authorization by
resource owner to be allowed to access resource server to retrieve profile info

Authorization server issues access token to client app which it can use to access resource server

Here our server is the client application
So a user who wants to get access to info stored in our MongoDB server will have to authorize client app to go
to the OAuth Service Provider like Facebook and retrieve information, thereby confirming identity and then allow
access to REST API

OAuth 2 Tokens:

Access token: is issued by Authorization Server. When client app approaches OAuth2 Service provider, upon the
user's authorization, the authorization server issues access token to client app. The client app can then
make use of access token to access server to retrieve info about user's profile

How does client App get access to OAuth Service Provider?

Every client App has to register themselves to OAuth Service Provider
After registering we need to obtain:
-Client App ID
-Cleent Secret
-Redirect URL : This will be the URL which will be called back when authorization server returns info after
we have been authorized by resource owner to get access to the resources

Authorization Code Grant Approach:

This is very much useful when our client app is a server
Client app approaches server and server returns long lived access token

Steps:

Resource Owner                      Authorization Server
(User)


Client App                          Resource Server
(REST API SERVER)


1. Client app sends a user auth request to auth server.
2. Say resource owner is Facebook. Facebook runs auth server and resource server. Auth server verifies
Facebook credentials and allows client apps to get Info. Resource server serves restricted profile info to
client app when resource owner authorizes it
3. When client app sends a user auth request to auth server, resource owner is redirected to Facebook and
expects resource owner to authenticate themselves and ALLOW the client app access to Authorization Server
4. Auth server returns an auth code to client app.
5. Here it sends Client app id and client secret. Client app then exchanges this auth code for
an access token from auth server.
6. Client app uses access token to access resource server to get profile info

Now we have access to access token and resource owner's id. We will use these info to create local user account
for resource owner but without password.

Client app issues a JWT to resource owner. The resource owner can use JWT to access REST API

We will use passport facebook module to implement this
This is passport strategy which uses OAuth 2.0 API

npm install passport-facebook --save

Now some of the steps described earlier will be taken care of by this module automatically

var FacebookStrategy = require('passport-facebook').Strategy;

Setting up facebook strategy:

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
},
    function(accessToken, refreshToken, profile, done){
    ...
    Check if user corresponding to profile already exists in local db
    }
))

After user is authenticated we will grant the JWT

Exercise:
_________________



Install passport-facebook module
npm install passport-facebook --save

Now we need to go to fb and register ourselves as an app

Before that we want to move all our auth part of code from app.js to authenticate.js

In app.js we had:

var LocalStrategy = require('passport-local').Strategy;

Instead
var authenticate = require('./authenticate');


In authenticate.js:
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var config = require('./config');


Now we want to move all local-strategy related code here and make the module export the local strategy


exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

In app.js:

Comment out the above code as it is already included in authenticate module

Also comment out var User = require('./models/user');

Save and test app

It runs like before

We now want to configure for fb auth

Open config.js:

module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl': 'mongodb://localhost:27017/conFusion',
    'facebook': {
        clientID: 'YOUR FACEBOOK APP ID',
        clientSecret: 'YOUR FACEBOOK SECRET',
        callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
};

Go to models/user.js:

In the User schema we want to add 2 fields:
oauthId and oauth token which will keep track of oauth id and token which we are going to
obtain when user authenticates with fb. We will save that info in our db

var User = new Schema({
    username: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});


For users that r registered as local users these 2 will be empty
but those who use oauth providers these wont be empty

Go to authenticate.js:


var FacebookStrategy = require('passport-facebook').Strategy;

Facebook auth strategy:

exports.facebook = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    // Look for the user in our local db
    User.findOne({OauthId: profile.id}, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (!err && user != null) {
            // user exists in our local db
            done(null, user);
        }
        else {
            // Create the user
            user = new User({
                username: profile.displayName
            });
            user.OauthId = profile.id;
            user.OauthToken = accessToken;
            user.save(function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Saving user...");
                    done(null, user);
                }
            })
        }
    });

}));


Now go to routes/users.js


We will set up the authentication for when user tries to use fb

/users/facebook : user redirected to fb to login and then comes back in. fb return accessID and accessToken
and profile. Then another callback function will be called /users/facebook/callback

router.get('/facebook', passport.authenticate('facebook'), function (req, res) {
    // Here user will be sent to fb for authentication
});


router.get('/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user, info) {
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(401).json({
                err: info
            });
        }
        // Log in the user
        req.logIn(user, function (err) {
            if(err){
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            // Issue own token from server side

            var token = Verify.getToken(user);

            res.status(200).json({
                status: 'Login Successful!!',
                success: true,
                token: token
            });
        });
    })(req, res, next);
});


Go to fb and setup our app:

In config.js:

module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl': 'mongodb://localhost:27017/conFusion',
    'facebook': {
        clientID: '1813756962236479',
        clientSecret: '4283077317b5808a20191d79223c4d68',
        callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
};

Test the app

Go to https://localhost:3443/users/facebook


Authenticate the app

We will get the token
















































