import { SquarePen, Trash } from "lucide-react";

const TodoCard = ({
  item,
  handleIsDone,
  handleDeleteTodo,
  isEdit,
  handleEditClick,
  setIsEdit,
  changedTodoNote,
  setChangedTodoNote,
  handleSaveClick,
}) => {
  return (
    <div className="pt-8">
      <div className="flex px-4 gap-4 items-center py-4 border border-black/20 rounded-md shadow-amber-300">
        <input
          type="checkbox"
          className="w-4 h-4"
          onChange={() => handleIsDone(item.id)}
          checked={item.isDone}
        />
        {isEdit === item.id ? (
          <input
            type="text"
            className="flex-1 px-3 border border-black/40 rounded-xl"
            value={changedTodoNote}
            onChange={(e) => setChangedTodoNote(e.target.value)}
          />
        ) : (
          <p className={`flex-1 ${item.isDone && "line-through text-red-400"}`}>
            {item.todo}
          </p>
        )}
        {isEdit === item.id ? (
          <button
            onClick={() => handleSaveClick(item.id)}
            className="px-2 py-1 bg-black text-white font-bold rounded-md"
          >
            Save
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={() => handleEditClick(item.id)}>
              <SquarePen />
            </button>
            <button onClick={() => handleDeleteTodo(item.id)}>
              <Trash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
