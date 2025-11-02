'use client';

import { useState } from 'react';

export default function ReviewPage() {
  const [weakTopics] = useState<string[]>([
    'Trigonometry',
    'Organic Chemistry',
    'French grammar'
  ]);

  return (
    <div>
      <h1>Review</h1>
      <p>These are topics you need to review:</p>
      <ul>
        {weakTopics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </div>
  );
}
