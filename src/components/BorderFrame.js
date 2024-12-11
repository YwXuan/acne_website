import "./BorderFrame.css";
import React, { useState, useEffect } from 'react';

const BorderFrame = () => {
  const cardData = [
    { id: 1, content: '輸入層', pairId: 1, matched: false },
    { id: 2, content: '池化層', pairId: 2, matched: false },
    { id: 3, content: '卷積運算', pairId: 3, matched: false },
    { id: 4, content: '中值濾波器', pairId: 4, matched: false },
    { id: 5, content: 'YOLO', pairId: 5, matched: false },
    { id: 6, content: '測試集', pairId: 6, matched: false },
    { id: 7, content: '將資料傳遞給隱藏層', pairId: 1, matched: false },
    { id: 8, content: '對圖像進行降維，保留重要特徵', pairId: 2, matched: false },
    { id: 9, content: '主要用於提取特徵', pairId: 3, matched: false },
    { id: 10, content: '去除影像中的雜訊有較好的效果', pairId: 4, matched: false },
    { id: 11, content: '在圖像中識別和定位多個物體', pairId: 5, matched: false },
    { id: 12, content: '用來評估模型的最終效果', pairId: 6, matched: false },
  ];

  // 洗牌函數
  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const initialCards = [...shuffleCards(cardData)];

  const [cards, setCards] = useState(initialCards);
  const [selectedCards, setSelectedCards] = useState([]);
  const [shouldCheckForMatch, setShouldCheckForMatch] = useState(false);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [timerStart, setTimerStart] = useState(null);
  const [finalTime, setFinalTime] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    if (shouldCheckForMatch) {
      checkForMatch();
      setShouldCheckForMatch(false);
    }
  }, [shouldCheckForMatch]);

  useEffect(() => {
    const allCardsMatched = cards.every(card => card.matched);

    if (allCardsMatched && !gameCompleted) {
      // Display the score and time
      console.log("All cards matched!");
      console.log("Final Score:", score);
      console.log("Total Time:", Math.round(totalTime), "seconds");
      setFinalTime(Math.round(totalTime));

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

  return (
    <div className="border-frame2">
      <div className="rectangle-parent2">
        <div className="frame-child2" />
        <div className="group-textarea">
          {/* 遊戲畫面 */}
          <div className="matching-game-page">
            {gameCompleted ? (
              <div className="complete" style={{height:200,margin:30,padding:120}}>
                <h1>恭喜你完成本次配對</h1>
                <p>本次總共得分為 <h1 style={{color:"lightcoral"}}>{score}分</h1> </p>
                <p>快找朋友一起PK誰比較高分吧！！</p>
              </div>
            ) : (
              <div>
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
      </div>
    </div>
  );
}
export default BorderFrame;