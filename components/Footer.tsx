
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center text-slate-500 text-sm py-8 mt-auto">
      <p>A simple yet powerful To-Do app.</p>
      <p className="mt-1">&copy; {new Date().getFullYear()} World-Class Senior Frontend React Engineer.</p>
    </footer>
  );
};

export default Footer;
