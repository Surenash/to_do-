
import React, { useState, useEffect, useCallback } from 'react';
import { Todo } from './types';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Failed to load todos from local storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to local storage", error);
    }
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    if (text.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center pt-8 md:pt-16 px-4 transition-all duration-300">
      <div className="w-full max-w-2xl">
        <Header />
        <main className="mt-8">
          <TodoInput onAddTodo={addTodo} />
          <div className="mt-6 bg-slate-800 rounded-lg shadow-2xl shadow-slate-950/50">
            <TodoList 
              todos={filteredTodos} 
              onToggleTodo={toggleTodo} 
              onDeleteTodo={deleteTodo} 
            />
            <div className="p-4 flex justify-between items-center text-sm text-slate-400 border-t border-slate-700">
              <span>{activeCount} items left</span>
              <div className="hidden md:flex gap-2">
                <button onClick={() => setFilter('all')} className={`hover:text-sky-400 ${filter === 'all' ? 'text-sky-400 font-semibold' : ''}`}>All</button>
                <button onClick={() => setFilter('active')} className={`hover:text-sky-400 ${filter === 'active' ? 'text-sky-400 font-semibold' : ''}`}>Active</button>
                <button onClick={() => setFilter('completed')} className={`hover:text-sky-400 ${filter === 'completed' ? 'text-sky-400 font-semibold' : ''}`}>Completed</button>
              </div>
              <button onClick={clearCompleted} className="hover:text-sky-400">Clear Completed</button>
            </div>
          </div>
           <div className="mt-4 p-2 flex md:hidden justify-center gap-4 bg-slate-800 rounded-lg shadow-lg text-sm text-slate-400">
              <button onClick={() => setFilter('all')} className={`hover:text-sky-400 ${filter === 'all' ? 'text-sky-400 font-semibold' : ''}`}>All</button>
              <button onClick={() => setFilter('active')} className={`hover:text-sky-400 ${filter === 'active' ? 'text-sky-400 font-semibold' : ''}`}>Active</button>
              <button onClick={() => setFilter('completed')} className={`hover:text-sky-400 ${filter === 'completed' ? 'text-sky-400 font-semibold' : ''}`}>Completed</button>
            </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
