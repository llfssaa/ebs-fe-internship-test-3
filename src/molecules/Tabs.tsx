import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const days = ['one-day', 'shows-5-day-forecast'];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs">
      {days.map((day, index) => (
        <Link
          key={day}
          to={`${day}`}
          className={`tab ${index === activeTab ? 'active' : ''}`}
          onClick={() => handleTabClick(index)}
        >
          {day === 'one-day' ? 'For one day' : 'For five Days'}
        </Link>
      ))}
    </div>
  );
}

export default Tabs;
