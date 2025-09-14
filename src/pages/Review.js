import React, { useState } from 'react';
import { words } from '../data/words';

const Review = () => {
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState('');

  const shuffled = (arr) => arr.slice().sort(() => Math.random() - 0.5);

  const options = React.useMemo(() => {
    const base = shuffled(words).slice(0, 3);
    if (!base.find(b => b.id === words[current].id)) base.pop();
    base.push(words[current]);
    return shuffled(base);
  }, [current]);

  const checkAnswer = (ans) => {
    if (ans === words[current].en) {
      setFeedback('✅ Correct!');
      setCurrent((c) => (c + 1 < words.length ? c + 1 : 0));
    } else {
      setFeedback('❌ Try again');
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">Review Words</h2>
      <p className="text-3xl mb-6">{words[current].jp}</p>
      <div className="grid grid-cols-2 gap-4">
        {options.map((o, i) => (
          <button
            key={i}
            onClick={() => checkAnswer(o.en)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            {o.en}
          </button>
        ))}
      </div>
      <p className="mt-4">{feedback}</p>
    </div>
  );
};

export default Review;
