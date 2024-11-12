import React from 'react';
import GujaratiCalendar from './components/GujaratiCalendar';
import festivals from './components/festivals.json';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gujarati Calendar</h1>
      <GujaratiCalendar festivals={festivals} />
    </div>
  );
}

export default App;
