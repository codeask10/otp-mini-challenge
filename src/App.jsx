import React, { useState, useRef } from 'react';

const App = () => {
  const inputRefs = useRef([]);
  const optArray = [1, 2, 3, 4, 5, 6];
  const [otpData, setOtpData] = useState(Array(6).fill(''));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && value !== ' ') {
      const singleDigit = value.slice(0, 1);
      let duplicate = [...otpData];
      duplicate[index] = singleDigit;
      setOtpData(duplicate);

      if (index < otpData.length - 1 && singleDigit) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      let duplicate = [...otpData];
      duplicate[index] = '';
      setOtpData(duplicate);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowRight' && index < otpData.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="container">
      <div>Headers</div>
      <div className="inputs">
        {optArray.map((_, index) => (
          <input
            key={index}
            ref={(ele) => (inputRefs.current[index] = ele)}
            style={{ height: '50px', width: '50px' }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => handleChange(e, index)}
            value={otpData[index]}
            type="text"
            maxLength="1"
          />
        ))}
      </div>
    </div>
  );
};

export default App;
