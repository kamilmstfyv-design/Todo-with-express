import React, { useState } from "react";

const Form = ({ todoNote, setTodoNote, handleClick }) => {
  return (
    <div>
      <div className="flex gap-4 pt-10">
        <input
          type="text"
          className="flex-1 px-3 border border-black/40 rounded-xl placeholder:text-black/60"
          placeholder="What needs to be done?"
          value={todoNote}
          onChange={(e) => setTodoNote(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="px-3 py-2 bg-black text-white font-bold rounded-md"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Form;
