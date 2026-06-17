import { SquarePen, Trash } from "lucide-react";

const TodoCard = ({ todo }) => {
  return (
    <div className="pt-8">
      <div className="flex px-4 gap-4 items-center py-4 border border-black/20 rounded-md shadow-amber-300">
        <input type="checkbox" className="w-4 h-4" />
        <p className="flex-1">{todo}</p>
        <div className="flex items-center gap-2">
          <button>
            <SquarePen />
          </button>
          <button>
            <Trash />
          </button>
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
