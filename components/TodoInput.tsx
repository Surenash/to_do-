
import React, { useState } from 'react';
import { PlusIcon } from './icons/PlusIcon';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg shadow-lg">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Create a new todo..."
        className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 border-none px-2 text-lg"
      />
      <button
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 text-white font-bold p-3 rounded-full transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
        aria-label="Add new todo"
        disabled={!text.trim()}
      >
        <PlusIcon />
      </button>
    </form>
  );
};

export default TodoInput;
