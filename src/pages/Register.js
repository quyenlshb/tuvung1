import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseClient';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseClient';

const Register = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const doRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pw);
      // create user doc
      await setDoc(doc(db, 'users', userCred.user.uid), {
        xp: 0,
        streak: 0,
        lastActive: null,
        learnedWords: []
      });
      nav('/');
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="border p-2 mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2 mb-2" placeholder="Password" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
      <button onClick={doRegister} className="px-4 py-2 bg-green-600 text-white rounded">Register</button>
      <p className="text-red-600 mt-2">{err}</p>
    </div>
  );
};

export default Register;
