import React, { useState } from 'react';
import { words } from '../data/words';

const Typing = () => {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState('');

  const check = () => {
    if (input.trim().toLowerCase() === words[index].en.toLowerCase()) {
      setMsg('✅ Correct!');
      setInput('');
      setIndex((i) => (i + 1 < words.length ? i + 1 : 0));
    } else {
      setMsg('❌ Wrong, try again');
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">Typing Test</h2>
      <p className="text-3xl mb-6">{words[index].jp}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded-lg mb-4"
        placeholder="Type meaning in English"
      />
      <button
        onClick={check}
        className="px-6 py-2 bg-green-500 text-white rounded-lg"
      >
        Check
      </button>
      <p className="mt-4">{msg}</p>
    </div>
  );
};

export default Typing;
