import React, { useEffect, useState } from 'react';
import { words } from '../data/words';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../auth/AuthContext';
import { doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseClient';
import { motion } from 'framer-motion';

const Learn = () => {
  const [index, setIndex] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setShowCorrect(false);
  }, [index]);

  const next = async (gain = 10) => {
    setShowCorrect(true);
    if (user) {
      const ref = doc(db, 'users', user.uid);
      try {
        // ensure doc exists
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await setDoc(ref, { xp: 0, streak: 0, lastActive: null, learnedWords: [] });
        }
        await updateDoc(ref, { xp: increment(gain) });
      } catch (e) {
        console.error('firestore error', e);
      }
    }
    setTimeout(() => {
      setIndex((i) => (i + 1 < words.length ? i + 1 : 0));
      setShowCorrect(false);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">Learn New Words</h2>
      <ProgressBar progress={((index + 1) / words.length) * 100} />
      <div className="bg-white shadow-md p-6 rounded-2xl mt-6 w-80 text-center">
        <p className="text-3xl mb-2">{words[index].jp}</p>
        <p className="text-gray-600">{words[index].romaji}</p>
        <p className="text-blue-600">{words[index].en}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button onClick={() => next(5)} className="px-6 py-2 bg-blue-500 text-white rounded-lg">I know this</button>
        <button onClick={() => next(10)} className="px-6 py-2 bg-gray-200 rounded-lg">Next</button>
      </div>

      {showCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: -10, scale: 1.05 }}
          transition={{ duration: 0.45 }}
          className="mt-4 p-3 bg-green-100 rounded-lg text-green-700"
        >
          ✅ +XP
        </motion.div>
      )}
    </div>
  );
};

export default Learn;
