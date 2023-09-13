/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.
  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup
  

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server.

users = [];

app.post("/signup", function (req, res) {
  var userExists = false;
  try {
    let id = Date.now() + Math.floor(Math.random());
    users.forEach(element => {
      if(element.username == req.body.email){
        res.status(400).send("Username already exists");
        userExists =true;
      }
    });
    if(!userExists){
      var newUser = {
        id: id,
        username: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
      users.push(newUser);
      res.status(201).send("Signup successful")
    }
  } catch (error) {
    console.log("Error in creating user!", error);
    res.status(400).send("Error in creating user!");
  }
});

app.post("/login", function (req, res) {

  var userExists = false;
  try {
    users.forEach(element => {
      if(element.username == req.body.email){
        if(element.password == req.body.password){
          userExists =true;
          res.json({
            firstName: element.firstName,
            lastName: element.lastName,
            email: element.username
        });
        }
      }
    });
    if(!userExists){
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log("Error in Loging in user!", error);
    res.status(400).send("Error in Loging user!");
  }
});

app.get("/data", function (req, res) {
  var userExists = false;
  try {
    users.forEach(element => {
      if(element.username == req.headers.email){
        if(element.password == req.headers.password){
          userExists =true;
        }
      }
    });
    if(!userExists){
      res.status(401).send("Unauthorized");
    }
    else{
      const usersList = users.map(({username,firstName,lastName}) => ({username,firstName,lastName}));
      res.json({users :usersList})
    }
  } catch (error) {
    console.log("Error in Fetching userList!", error);
    res.status(400).send("Error in Fetching user List!");
  }
});

module.exports = app;
