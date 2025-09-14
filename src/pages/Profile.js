import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseClient';

const Profile = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    getDoc(ref).then(snap => {
      if (snap.exists()) setData(snap.data());
    });
  }, [user]);

  if (!user) return <p className="p-6">Login to see profile</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {data ? (
        <div className="bg-white p-4 rounded shadow w-full max-w-md">
          <p><strong>XP:</strong> {data.xp || 0}</p>
          <p><strong>Streak:</strong> {data.streak || 0}</p>
          <p><strong>Learned words:</strong> {(data.learnedWords||[]).length}</p>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
};

export default Profile;
