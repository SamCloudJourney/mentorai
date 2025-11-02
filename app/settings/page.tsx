'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [examBoard, setExamBoard] = useState<string>('OCR');
  const [notifications, setNotifications] = useState<boolean>(true);

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <label htmlFor="examBoard">Exam Board:</label>
        <select id="examBoard" value={examBoard} onChange={(e) => setExamBoard(e.target.value)}>
          <option value="OCR">OCR</option>
          <option value="AQA">AQA</option>
          <option value="Edexcel">Edexcel</option>
        </select>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Enable notifications
        </label>
      </div>
      <p>Selected Exam Board: {examBoard}</p>
      <p>Notifications: {notifications ? 'On' : 'Off'}</p>
    </div>
  );
}
