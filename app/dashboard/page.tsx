'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [xp, setXp] = useState(0);
  const recommendations = ['Algebra', 'Chemistry', 'Spanish vocabulary'];

  useEffect(() => {
    setXp(120);
  }, []);

  const progress = 0.5;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the MentorAI dashboard. This page will show your study progress, XP, and recommendations.</p>
      <div>
        <h2>Your XP: {xp}</h2>
        <p>Progress: {progress * 100}%</p>
      </div>
      <div>
        <h3>Recommended topics:</h3>
        <ul>
          {recommendations.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
