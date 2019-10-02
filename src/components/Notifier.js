import React, { useState, useEffect } from 'react';

const IntervalExample = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notifier">
      <h5 className="notfier_header">
        {seconds} seconds have elapsed since mounting.
      </h5>
    </div>
  );
};

export default IntervalExample;