require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URI, { family: 4 })
  .then(() => {
    console.log("connected succes");
  })
  .catch((error) => {
    console.log(error, "somethink wrong");
  });

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
    minLength: 4,
  },
  important: { type: Boolean, default: false },
  isDone: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});
todoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Todo = mongoose.model("Todo", todoSchema);

const requestLogger = (req, res, next) => {
  console.log(`Path: --> ${req.path}`);
  console.log(`Method: --> ${req.method}`);
  console.log("Body -->", req.body);
  next();
};

app.use(requestLogger);

//GET
app.get("/api/todos", (req, res, next) => {
  Todo.find({})
    .then((todos) => {
      res.json(todos);
    })
    .catch((error) => {
      next(error);
    });
});

//POST
app.post("/api/todos", (req, res, next) => {
  const body = req.body;

  if (!body.todo) {
    return res.status(400).json({ error: "todo can not be empty" });
  }

  const newTodo = new Todo({
    todo: body.todo,
    important: body.important || false,
    isDone: body.isDone || false,
    date: new Date(),
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

//DELETE
// app.delete("/api/todos/:id", (req, res) => {
//   const id = req.params.id;
//   const findedItem = todos.find((todo) => todo.id === id);

//   if (!findedItem) {
//     return res.status(404).json({
//       error: "id not found",
//     });
//   }
//   todos = todos.filter((todo) => todo.id !== id);
//   res.status(204).end();
// });

// //PUT
// app.put("/api/todos/:id", (req, res) => {
//   const id = req.params.id;
//   const body = req.body;

//   if (!body.todo) {
//     return res.status(400).json({
//       error: "Todo can't be empty",
//     });
//   }

//   const findedIndex = todos.findIndex((todo) => +todo.id === +id);
//   if (findedIndex === -1) {
//     return res.status(404).json({
//       error: "Todo not found",
//     });
//   }

//   const updatedTodo = {
//     ...todos[findedIndex],
//     todo: body.todo,
//     important:
//       body.important !== undefined
//         ? body.important
//         : todos[findedIndex].important,
//     isDone: body.isDone !== undefined ? body.isDone : todos[findedIndex].isDone,
//   };

//   todos[findedIndex] = updatedTodo;
//   res.status(200).json(updatedTodo);
// });

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Port started ${PORT}`));
