import React, { useEffect, useState } from 'react';

export default function RatingState() {
  useEffect(() => {
    getAdvice()
  }, []); // Call the useEffect callback (an empty array) only when the component mounts

  const [isLoaded, setIsLoaded] = useState(false);
  const [advice, setAdvice] = useState({});

  const getAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(result => {
      setIsLoaded(true);
      setAdvice(result.slip);
    });
  }

  const adviceSubmit = () => {
    setIsLoaded(false);
    setTimeout(() => {
      getAdvice();
    },1000);
  }

  return (
    <>
      <div className="advice-generator">
        <div className="advice-generator-container">
          <div className="advice-generator-id">ADVICE # {advice.id}</div>
          <div className="advice-generator-content">"{advice.advice}"</div>
          <div className="advice-generator-divider">
            <img src="./images/pattern-divider-desktop.svg" alt="" />
          </div>
          <button className={`advice-generator-button ${!isLoaded ? 'loading' : ''}`} onClick={adviceSubmit}>
            <img src="./images/icon-dice.svg" alt="submit" />
          </button>
        </div>
      </div>
    </>
  );
};