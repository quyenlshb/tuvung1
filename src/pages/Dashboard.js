import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const modes = [
    { name: "Learn New Words", path: "/learn", color: "bg-blue-500" },
    { name: "Review Words", path: "/review", color: "bg-yellow-500" },
    { name: "Listening Test", path: "/listening", color: "bg-purple-500" },
    { name: "Typing Test", path: "/typing", color: "bg-green-500" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Japanese Learning</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {modes.map((mode) => (
          <Link
            key={mode.path}
            to={mode.path}
            className={`${mode.color} text-white p-6 rounded-2xl text-center shadow-md hover:opacity-90`}
          >
            {mode.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
