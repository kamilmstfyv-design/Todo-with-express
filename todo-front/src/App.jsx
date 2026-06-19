import { useEffect } from "react";
import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { deleteData, getData, postData, putData } from "./services/request";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoNote, setTodoNote] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [changedTodoNote, setChangedTodoNote] = useState("");

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

  const handleIsDone = (id) => {
    const findedTodoIndex = todos.findIndex((todo) => todo.id === id);
    if (findedTodoIndex === -1) {
      return;
    }
    const newTodo = {
      ...todos[findedTodoIndex],
      isDone: !todos[findedTodoIndex].isDone,
    };
    console.log(newTodo);

    putData(id, newTodo)
      .then((updatedData) => {
        setTodos((prevTodos) =>
          prevTodos.map((prevTodo) =>
            prevTodo.id === id ? updatedData : prevTodo,
          ),
        );
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteTodo = (id) => {
    const question = confirm("Do you want delete todo?");
    if (!question) return;
    deleteData(id)
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.filter((prevTodo) => prevTodo.id !== id),
        );
      })
      .catch((error) => console.log(error));
  };

  const handleEditClick = (id) => {
    setIsEdit(id);
    const fiterTodo = todos.find((todo) => todo.id === id);
    setChangedTodoNote(fiterTodo.todo);
  };

  const handleSaveClick = (id) => {
    if (!changedTodoNote.trim()) {
      return alert("Todo can not be empty");
    }
    const findedIndex = todos.findIndex((todo) => todo.id === id);
    if (findedIndex === -1) return;

    const editedTodo = {
      ...todos[findedIndex],
      todo: changedTodoNote,
    };

    putData(id, editedTodo)
      .then((updatedTodo) => {
        setTodos((prevTodos) =>
          prevTodos.map((prevtodo) =>
            prevtodo.id === id ? updatedTodo : prevtodo,
          ),
        );
        setIsEdit(null);
      })
      .catch((error) => console.log(error));
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
        <TodoList
          todos={todos}
          handleIsDone={handleIsDone}
          handleDeleteTodo={handleDeleteTodo}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          handleEditClick={handleEditClick}
          changedTodoNote={changedTodoNote}
          setChangedTodoNote={setChangedTodoNote}
          handleSaveClick={handleSaveClick}
        />
      </div>
    </div>
  );
};

export default App;
