import TodoCard from "./TodoCard";

const TodoList = ({
  todos,
  handleIsDone,
  handleDeleteTodo,
  isEdit,
  handleEditClick,
  setIsEdit,
  handleSaveClick,
  changedTodoNote,
  setChangedTodoNote,
}) => {
  return (
    <>
      {todos.map((item) => (
        <TodoCard
          item={item}
          key={item.id}
          handleIsDone={handleIsDone}
          handleDeleteTodo={handleDeleteTodo}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          handleEditClick={handleEditClick}
          changedTodoNote={changedTodoNote}
          setChangedTodoNote={setChangedTodoNote}
          handleSaveClick={handleSaveClick}
        />
      ))}
    </>
  );
};

export default TodoList;
