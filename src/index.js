const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  request.user = user;

  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.some((user) => user.username === username);

  if (userAlreadyExists) {
    return response.status(400).json({ error: "User already exists!" });
  }

  users.push({
    id: uuidv4(),
    name,
    username,
    todos: [],
  });

  newUser = users.find((user) => user.username === username);

  return response.status(201).json(newUser);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const todoAlreadyExists = user.todos.some((todo) => todo.title === title);

  if (todoAlreadyExists) {
    return response.status(400).json({ error: "Todo already exists!" });
  }

  const todoOperation = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(todoOperation);

  newTodo = user.todos.find((todo) => todo.title === title);

  return response.status(201).json(newTodo);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { title, deadline } = request.body;
  const { user } = request;

  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "todo not found" });
  }

  const todoTitleAlreadyExists = user.todos.some((todo) => todo.title === title);

  if (todoTitleAlreadyExists) {
    return response.status(400).json({ error: "Todo already exists!" });
  }

  users.todos = user.todos.map((todo) => {
    if (todo.id === id) {
      (todo.title = title), (todo.deadline = new Date(deadline));
    }
  });

  updatedTodo = user.todos.find((todo) => todo.id === id);

  return response.status(201).json(updatedTodo);
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "todo not found" });
  }

  const alreadyDone = user.todos.some(
    (todo) => todo.id === id && todo.done === true
  );

  if (alreadyDone) {
    return response.status(400).json({ error: "Todo already done!" });
  }

  user.todos.push(
    user.todos.map((todo) => {
      if (todo.id === id) {
        todo.done = true;
      }
    })
  );

  updatedTodo = user.todos.find((todo) => todo.id === id);

  return response.status(200).json(updatedTodo);
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "todo not found" });
  }

  const todoToDelete = user.todos.find((todo) => todo.id === id);

  user.todos.splice(todoToDelete, 1);

  return response.status(204).send();
});

module.exports = app;
