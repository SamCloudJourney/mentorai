'use client';

import { useState } from 'react';

export default function LearnPage() {
  const topics = ['Mathematics', 'Science', 'English', 'Spanish'];
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div>
      <h1>Learn</h1>
      <p>Select a topic to start learning with interactive sessions.</p>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>
            <button onClick={() => setSelectedTopic(topic)}>{topic}</button>
          </li>
        ))}
      </ul>
      {selectedTopic && (
        <div>
          <h2>{selectedTopic}</h2>
          <p>Content for {selectedTopic} will appear here soon.</p>
        </div>
      )}
    </div>
  );
}
