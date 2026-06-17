import { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { getData, postData } from "./services/request";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoNote, setTodoNote] = useState("");
  console.log(todoNote);

  useEffect(() => {
    getData()
      .then((data) => {
        setTodos(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = () => {
    if (!todoNote.trim()) {
      return alert("Input can not be empty");
    }
    const newTodo = {
      todo: todoNote,
      important: false,
      isDone: false,
      date: new Date(),
    };
    postData(newTodo).then((newData) => {
      setTodos((prev) => prev.concat(newData));
      setTodoNote("");
    });
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto px-5">
        <Header />
        <Form
          todoNote={todoNote}
          setTodoNote={setTodoNote}
          handleClick={handleClick}
        />
        <TodoList todos={todos} />
      </div>
    </div>
  );
};

export default App;
