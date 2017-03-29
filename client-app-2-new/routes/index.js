var express = require('express');
var router = express.Router();
var passport = require('passport');
var Admin = require('../models/admin');
var bodyParser = require('body-parser');
var request = require('request');
var mongoose = require('mongoose');


router.use(bodyParser.json());

router.get("/", function (req, res) {

    if (req.user) {

        // We need to pass the data of reviews to the view

        var createdForms = req.user.created_forms;

        var renderData = [];

        console.log("im here");

        // TODO: handle case where createdForms is not consistent with REST API

        // for each created form get the form data, store it in a new array
        // render the view with that array
        if(createdForms.length == 0){
            res.render("landing", {forms: null});
        } else {
            createdForms.forEach(function (formId, index) {
                console.log("Inside for each function");
                request('http://localhost:3000/reviews/' + formId, function (error, response, body) {
                    if (error) {
                        console.log(error);
                    } else {
                        renderData.push(JSON.parse(response.body));
                        if (index == createdForms.length - 1) {
                            // last form has been pushed
                            // data is ready to be rendered
                            res.render("landing",   {forms: renderData})
                        }
                    }
                })
            });
        }
        

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
            full_name: req.body.full_name
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
        });
    });
});

router.get("/details", function (req, res) {
    res.render("view-stats");
});

router.get("/create_review", function (req, res) {
    res.render("create-form");
});

module.exports = router;