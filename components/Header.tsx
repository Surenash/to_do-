
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-widest uppercase text-sky-400/90">
        To-Do List
      </h1>
      <p className="text-slate-400 mt-2">Powered by Gemini</p>
    </header>
  );
};

export default Header;
