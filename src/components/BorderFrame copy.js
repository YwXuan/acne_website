import "./BorderFrame.css";
import React, { useState, useEffect } from 'react';

const BorderFrame = () => {
  
const cardData = [
  { id: 1, content: '輸入層', pairId: 1, matched: false },
  { id: 2, content: '池化層', pairId: 2, matched: false },
  { id: 3, content: '卷積運算', pairId: 3, matched: false },
  { id: 4, content: '中值濾波器', pairId: 4, matched: false },
  { id: 5, content: 'yolov7', pairId: 5, matched: false },
  { id: 6, content: 'yooolo', pairId: 6, matched: false },
  { id: 7, content: '來自外部的資料會從_____進入神經網路', pairId: 1, matched: false },
  { id: 8, content: '_____用於減小卷積層輸出的空間尺寸，同時保留重要的特徵', pairId: 2, matched: false },
  { id: 9, content: '_____在影像處理中主要用於提取特徵', pairId: 3, matched: false },
  { id: 10, content: '_____用於去除影像中的椒鹽噪聲等雜訊有較好的效果', pairId: 4, matched: false },
  { id: 11, content: 'yolov7', pairId: 5, matched: false },
  { id: 12, content: 'yooolo', pairId: 6, matched: false },
  // ... 其他卡牌
];
const initialCards = [...cardData];
  const [cards, setCards] = useState(initialCards);
  const [selectedCards, setSelectedCards] = useState([]);
  const [shouldCheckForMatch, setShouldCheckForMatch] = useState(false);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [timerStart, setTimerStart] = useState(null);
  const [finalTime, setFinalTime] = useState(0);

  useEffect(() => {
    if (shouldCheckForMatch) {
      checkForMatch();
      setShouldCheckForMatch(false);
    }
  }, [shouldCheckForMatch]);

  const [gameCompleted, setGameCompleted] = useState(false);


  useEffect(() => {
    const allCardsMatched = cards.every(card => card.matched);

    if (allCardsMatched && !gameCompleted) {
      // Display the score and time
      console.log("All cards matched!");
      console.log("Final Score:", score);
      console.log("Total Time:", Math.round(totalTime), "seconds");
      setFinalTime(Math.round(totalTime))

      // Set the game as completed to prevent multiple displays
      setGameCompleted(true);
    }
  }, [cards, score, totalTime, gameCompleted]);


  useEffect(() => {
    // Update the elapsed time every second
    const intervalId = setInterval(() => {
      if (timerStart !== null) { // 確保 timerStart 不為 null 時才更新時間
        const elapsedTime = (Date.now() - timerStart) / 1000; // in seconds
        setTotalTime(prevTotalTime => prevTotalTime + elapsedTime);
      }
    }, 1000);
  
    // Clear the interval when the component is unmounted or the game is restarted
    return () => clearInterval(intervalId);
  }, [timerStart]);

  const handleCardClick = (id, pairId) => {
    const clickedCard = { id, pairId };

    const isCardMatched = cards.find(card => card.id === id)?.matched;
    if (isCardMatched) {
      return;
    }

    if (selectedCards.length < 2 && cards.some(card => card.id === id && !card.matched)) {
      // Start the timer when the first card is clicked
      if (selectedCards.length === 0 && !timerStart) {
        setTimerStart(Date.now());
      }

      setSelectedCards([...selectedCards, clickedCard]);
      setShouldCheckForMatch(true);
    }
  };

  const checkForMatch = () => {
    if (selectedCards.length === 2) {
      const [card1, card2] = selectedCards;

      if (
        card1 &&
        card2 &&
        card1.pairId !== undefined &&
        card2.pairId !== undefined &&
        card1.id !== card2.id &&
        !card1.matched &&
        !card2.matched
      ) {
        if (card1.pairId === card2.pairId) {
          // Calculate score based on correctness and speed
          const elapsedTime = (Date.now() - timerStart) / 1000; // in seconds
          const matchScore = calculateMatchScore(elapsedTime);
          setScore(score + matchScore);
          setTotalTime(totalTime + elapsedTime);

          setCards(cards =>
            cards.map(card =>
              card.id === card1.id || card.id === card2.id ? { ...card, matched: true } : card
            )
          );
        }
      }

      setSelectedCards([]);
    }
  };

  const calculateMatchScore = (elapsedTime) => {
    // Customize your scoring logic here
    // For example, you can give more points for faster matches
    const baseScore = 100;
    const timeBonus = Math.max(0, baseScore - Math.round(elapsedTime * 10)); // Adjust the multiplier as needed
    return timeBonus;
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="border-frame2">
      <div className="rectangle-parent2">
        <div className="frame-child2" />
        <div className="group-textarea" >
{/* 遊戲畫面 */}
<div className="matching-game-page">
      {gameCompleted ? (
        <div >
          <h4>配對成功</h4>
          <p>Score: {score} </p>
          <p>Total Time: {finalTime} seconds</p>
        </div>
      ) : (
        <div>
          {/* <div>Score: {score} Total Time: {Math.round(totalTime)} seconds</div> */}
          <div className="card-container">
            {cards.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id, card.pairId)}
                className={`card ${selectedCards.some(selectedCard => selectedCard.id === card.id) ? 'selected' : ''} ${card.matched ? 'matched' : ''}`}
              >
                {card.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
{/* 遊戲畫面 */}

        </div>
        <div className="button-frame1">
          <div className="retry-button" onClick={handleRestart}>
            <div className="back2" />
            <div className="div35">再玩一次</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorderFrame;
