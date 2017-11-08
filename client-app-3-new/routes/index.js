var express = require('express');
var router = express.Router();
var passport = require('passport');
var Admin = require('../models/prof');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');


router.use(bodyParser.json());

function inArray(array, value) {
    for (var i = 0; i < array.length; ++i) {
        if (array[i] == value) {
            return i;
        }
    }
    return -1;
}


router.get("/", function (req, res) {

    if (req.user) {

        // We need to pass the data of reviews to the view

        var dept=req.user.department;
        console.log(dept);
         request('http://localhost:3000/reviews/target/' + dept, function (error, response, body) {
            if(error){
                console.log(error)
            } else {
                console.log(response.body);

                var forms = JSON.parse(body);
                console.log('awwwwwww');


                
                // filter forms based on filled_forms data
                
              /*  var filledFormIds = req.user.filled_forms;

                for(var i=0; i<filledFormIds.length; ++i){
                    for(var j=0; j<forms.length; ++j){
                        if(forms[j]._id == filledFormIds[i]){
                        
                            // console.log("Matched form is:" + forms[j]._id)
                            forms.splice(j, 1);
                        }
                        
                    }
                }*/

                // GET responses data in order to find number of users filled form and ave time

                request('http://localhost:3000/responses_new/', function (error, response, body) {

                    var responses = JSON.parse(body);

                    forms.forEach(function (form) {
                        var formId = form._id;
                        form.noOfUsers = 0;
                        var noOfQuestions = form.mcq.length;
                        form.estimatedTime = 0;
                        responses.forEach(function (response) {
                            if(response.reviewId == formId){
                                console.log(formId);
                                form.noOfUsers += 1;

                                response.mcqResponse.forEach(function(singleResponse){
                                    form.estimatedTime += singleResponse.timeSpent;
                                })
                            }
                        });
                        form.estimatedTime = (form.estimatedTime/form.noOfUsers)/1000;
                    });

                    console.log("Forms:", forms);
                    res.render("landing", {forms: forms});
                });
            }
        })
    }
    else {
        res.render("landing", {forms: null});
    }

});

// TEST ROUTES

router.get("/success", function (req, res) {
    res.send("Success!!");
});

router.get("/failed", function (req, res) {
    res.send("Failure!!");
});


router.post("/register", function (req, res) {
    var newAdmin = new Admin(
        {
            username: req.body.username,
            department: req.body.department,
            email: req.body.email,
            full_name: req.body.full_name,
            profId:req.body.profId
        }
    );
    Admin.register(newAdmin, req.body.password, function (err, admin) {
        // admin is newly created admin
        if (err) {
            console.log(err);
            return res.render("landing");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
        });
    });
});

// handle login logic

// the middleware uses authenticate method which authenticates user..if it works it redirects somewhere else somewhere else

router.post("/login", passport.authenticate("local",
    {successRedirect: "/", failureRedirect: "/failed"}), function (req, res) {
});

// logout

router.get("/logout", function (req, res) {
    req.logout();
    // flash message

    // req.flash("success", "Logout successful");
    res.redirect("/");
});


router.get("/admins", function (req, res) {
    Admin.find({}, function (err, foundAdmins) {
        if (err) {
            console.log(err);
        } else {
            res.json(foundAdmins);
        }
    })
});

router.put("/admins/:adminId/created_forms", function (req, res) {
    console.log("From PUT route", req.body);
    Admin.findById(req.params.adminId, function (err, admin) {
        if (err) {
            console.log(err);
        }

        // check if review_id already exists

        var toAdd = true;

        for (var i = 0; i < admin.created_forms.length; ++i) {
            if (admin.created_forms[i] == req.body.review_id) {
                toAdd = false;
            }
        }
        if (toAdd == true) {
            admin.created_forms.push(req.body.review_id);
        }
        admin.save(function (err, admin) {
            if (err) throw err;
            else{
                res.json({message: "ok"});  
            }
        });
    });
});

router.get("/details", function (req, res) {
    res.render("view-stats");
});


router.get("/details/:reviewId", function (req, res) {
    var reviewId = req.params.reviewId;
    res.render("view-stats", {reviewId: reviewId});
});


router.get("/create_review", function (req, res) {
    res.render("create-form");
});

module.exports = router;