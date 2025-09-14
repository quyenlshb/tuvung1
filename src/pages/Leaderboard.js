import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebaseClient';

const Leaderboard = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(10));
    getDocs(q).then(snap => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setList(arr);
    }).catch(e => console.error(e));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <div className="space-y-2">
        {list.map((u, i) => (
          <div key={u.id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>{i+1}. {u.displayName || u.id}</div>
            <div>{u.xp || 0} xp</div>
          </div>
        ))}
        {list.length === 0 && <p>No data yet</p>}
      </div>
    </div>
  );
};

export default Leaderboard;
