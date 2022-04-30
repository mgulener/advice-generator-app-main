import React, { useEffect, useState } from 'react';

export default function RatingState() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFirstAdvice, setIsFirstAdvice] = useState(false);
  const [advice, setAdvice] = useState({});

  useEffect(() => {
    if (!isFirstAdvice) {
      getAdvice();
    }
  });

  const adviceSubmit = () => {
    setIsLoaded(false);
    setTimeout(() => {
      getAdvice();
    },1000);
  }

  const getAdvice = () => {
    fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(result => {
      setIsLoaded(true);
      setIsFirstAdvice(true);
      setAdvice(result.slip);
    });
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