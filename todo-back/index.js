require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Todo = require("./models/todo");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/api/todos", (req, res, next) => {
  Todo.find({})
    .then((todos) => {
      res.json(todos);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/todos/:id", (req, res, next) => {
  Todo.findById(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: "no todo " });
      }
      res.json(todo);
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/todos", (req, res, next) => {
  const body = req.body;
  if (!body.todo) {
    return res.status(400).json({
      error: "Todo Can not be empty",
    });
  }
  const newTodo = new Todo({
    todo: body.todo,
    isDone: body.isDone || false,
    important: body.important || false,
  });
  newTodo
    .save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/todos/:id", (req, res, next) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({
          error: "Content already deleted from database",
        });
      }
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/todos/:id", (req, res, next) => {
  const body = req.body;

  if (!body.todo) {
    return res.status(400).json({
      error: "todo cannot be empty",
    });
  }

  const updatedTodo = {
    todo: body.todo,
    isDone: body.isDone,
    important: body.important,
  };
  Todo.findByIdAndUpdate(req.params.id, updatedTodo, {
    new: true,
    runValidators: true,
  })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({
          error: " TODO NOT FOUND",
        });
      }
      res.status(200).json(updatedTodo);
    })
    .catch((error) => {
      next(error);
    });
});

const unknownEndpoint = (req, res) => {
  res.status(404).json({
    error: "unknown enpoint",
  });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({
    error: "Internal Server Error",
    message: error.message,
  });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Port:${PORT}`);
});
