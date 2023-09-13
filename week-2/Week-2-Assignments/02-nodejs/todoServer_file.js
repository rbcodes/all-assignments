/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const app = express();
app.use(bodyParser.json());

// app.listen(3000, function () {
//   console.log("Listening on Port 3000");
// });

async function getTodo() {
  var filePath = "./files/todoList.txt";
  try {
    const file = await fs.readFile(filePath, "utf8");
    if(file && file.length > 0){
      return JSON.parse(file);
    }
    else{
      return JSON.parse("[]");
    }
  } catch (e) {
    console.log("Error Reading File!", e);
    return false;
  }
}
async function writeTodo(todoList) {
  var filePath = "./files/todoList.txt";
  try {
    const file =  await fs.writeFile(filePath, JSON.stringify(todoList), 'utf8');
    console.log("The file was saved!");
    return true;
  } catch (e) {
    console.log("Error Writing File!", e);
    return false;
  }
}

app.get("/todos", async function (req, res) {
  var todoList = await getTodo();
  if(todoList){
    res.status(200).send(todoList);
  }
  else{
    res.status(400).send("Error!");
  }
});

app.get("/todos/:id", async function (req, res) {
  var id = req.params.id;
  var idFound = false;
  var todoList = await getTodo();
  todoList.forEach(element => {
      if(element.id == id){
        idFound = true;
        res.send(element);
      }
  });
  if(!idFound){
    res.status(404).send("No todo found..");
  }
});

app.post("/todos", async function (req, res) {
  var todoList = await getTodo();
  var id = todoList.length + 1;
  console.log(todoList);
  var toDo = {
    "id" : id,
    "title": req.body.title,
    "completed": req.body.completed ?  req.body.completed : false,
    "description" : req.body.description
  }
  todoList.push(toDo);
  console.log(todoList);
  const wfile = await writeTodo(todoList);
  res.status(201).send({ "id" :  id});
});

app.put("/todos/:id", async function (req, res) {
  var id = req.params.id;
  var idFound = false;
  var todoList = await getTodo();
  for (let [index, element] of todoList.entries()) {
    if(element.id == id){
      idFound = true;
      var updatedTodo = {
        "id" : id,
        "title": req.body.title,
        "completed": req.body.completed,
        "description" : req.body.description
      }
      todoList[index] = updatedTodo;
      await writeTodo(todoList);
      res.status(200).send({ "id" :  id});
    }
  }
  if(!idFound){
    res.status(404).send("No todo found..");
  }
});

app.delete("/todos/:id", async function (req, res) {
  var id = req.params.id;
  var idFound = false;
  var todoList = await getTodo();
  for (let [index, element] of todoList.entries()) {
    if(element.id == id){
      idFound = true;
      todoList.splice(index, 1);
      await writeTodo(todoList);
      res.status(200).send("item deleted");
    }
  }
  if(!idFound){
    res.status(404).send("No todo found..");
  }
});

module.exports = app;
