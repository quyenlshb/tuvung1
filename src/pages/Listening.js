import React, { useState } from 'react';
import { words } from '../data/words';

const Listening = () => {
  const [index, setIndex] = useState(0);
  const [msg, setMsg] = useState('');

  const playAudio = () => {
    const audio = new Audio(words[index].audio);
    audio.play().catch(() => setMsg('Audio not found (add public/audio/*.mp3)'));
  };

  const check = (ans) => {
    if (ans === words[index].jp) {
      setMsg('✅ Correct!');
      setIndex((i) => (i + 1 < words.length ? i + 1 : 0));
    } else setMsg('❌ Wrong');
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">Listening Test</h2>
      <button
        onClick={playAudio}
        className="mb-6 px-6 py-2 bg-purple-500 text-white rounded-lg"
      >
        🔊 Play Audio
      </button>
      <div className="grid grid-cols-2 gap-4">
        {words.map((w) => (
          <button
            key={w.id}
            onClick={() => check(w.jp)}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            {w.jp}
          </button>
        ))}
      </div>
      <p className="mt-4">{msg}</p>
    </div>
  );
};

export default Listening;
