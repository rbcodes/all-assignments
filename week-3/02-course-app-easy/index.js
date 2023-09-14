const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  // Description: Creates a new admin account.
  // Input: { username: 'admin', password: 'pass' }
  // Output: { message: 'Admin created successfully' }
  var userN = req.body.username;
  var userP = req.body.password;
  var userExists = false;
  ADMINS.forEach(element => {
      if(element.username == userN){
        userExists = true;
        res.status(400).send("Admin already Registered");
      }
  });
  if(!userExists){
    var user = {
      username : userN,
      password : userP
    }
    ADMINS.push(user);
    res.send("Admin created successfully");
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  var userExists = false;
      ADMINS.forEach(element => {
        if(element.username == req.body.username && element.password == req.body.password ){
          userExists = true;
          res.send("Logged in successfully");
        }
    });
    if(!userExists){
      res.status(404).send("Error Logging in!");
    }
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
