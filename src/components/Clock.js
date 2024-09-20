import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  const formatTime = (date) => {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).toUpperCase(); 
    const year = date.getFullYear(); 

    return `${dayOfWeek} ${time} ${year}`;
  };

  return (
    <div className='clock'>
      <p>{formatTime(time)}</p>
    </div>
  );
};

export default Clock;
