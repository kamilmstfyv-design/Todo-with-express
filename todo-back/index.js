const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const requestLogger = (req, res, next) => {
  console.log(`Path: --> ${req.path}`);
  console.log(`Method: --> ${req.method}`);
  console.log("Body -->", req.body);
  next();
};

app.use(requestLogger);

let todos = [
  {
    id: String(Math.floor(Math.random() * 1000)),
    todo: "Go to market",
    important: true,
    isDone: true,
    date: new Date(),
  },
];

//GET
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

//POST
app.post("/api/todos", (req, res) => {
  const body = req.body;
  if (!body.todo) {
    return res.status(400).json({
      error: "Todo can't be empty",
    });
  }

  const newTodo = {
    id: String(Math.floor(Math.random() * 1000)),
    todo: body.todo || false,
    important: body.important || false,
    isDone: body.isDone || false,
    date: body.date || new Date(),
  };

  todos = todos.concat(newTodo);
  res.status(201).json(newTodo);
});

//DELETE
app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const findedItem = todos.find((todo) => todo.id === id);

  if (!findedItem) {
    return res.status(404).json({
      error: "id not found",
    });
  }
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).end();
});

//PUT
app.put("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (!body.todo) {
    return res.status(400).json({
      error: "Todo can't be empty",
    });
  }

  const findedIndex = todos.findIndex((todo) => +todo.id === +id);
  if (findedIndex === -1) {
    return res.status(404).json({
      error: "Todo not found",
    });
  }

  const updatedTodo = {
    ...todos[findedIndex],
    todo: body.todo,
    important:
      body.important !== undefined
        ? body.important
        : todos[findedIndex].important,
    isDone: body.isDone !== undefined ? body.isDone : todos[findedIndex].isDone,
  };

  todos[findedIndex] = updatedTodo;
  res.status(200).json(updatedTodo);
});

//unknownEndpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return res.status(400).json({
      error: "malformatted id",
    });
  }
  next(error);
};

app.use(errorHandler);

const PORT = 3001;

app.listen(PORT, () => console.log(`Port started ${PORT}`));
