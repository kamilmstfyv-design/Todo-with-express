const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log("Connection success");
  })
  .catch((error) => {
    console.log(error.message, "Connection failed");
  });

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    minLength: 2,
    required: true,
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

module.exports = mongoose.model("Todo", todoSchema);
