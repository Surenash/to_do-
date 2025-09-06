
import React from 'react';
import { Todo } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { CheckIcon } from './icons/CheckIcon';
import { CircleIcon } from './icons/CircleIcon';


interface TodoItemProps {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleTodo, onDeleteTodo }) => {
  return (
    <li className="group flex items-center justify-between p-4 transition-colors duration-300 hover:bg-slate-700/50">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggleTodo(todo.id)}
          className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            todo.completed
              ? 'border-sky-500 bg-sky-500'
              : 'border-slate-500 group-hover:border-sky-400'
          }`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed ? <CheckIcon /> : <CircleIcon />}
        </button>
        <span
          className={`cursor-pointer transition-all duration-300 ${
            todo.completed ? 'line-through text-slate-500' : 'text-slate-100'
          }`}
          onClick={() => onToggleTodo(todo.id)}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDeleteTodo(todo.id)}
        className="text-slate-500 hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Delete todo"
      >
        <TrashIcon />
      </button>
    </li>
  );
};

export default TodoItem;
