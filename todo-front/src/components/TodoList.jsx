import TodoCard from "./TodoCard";

const TodoList = ({ todos }) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoCard todo={todo.todo} key={todo.id} />
      ))}
    </>
  );
};

export default TodoList;
