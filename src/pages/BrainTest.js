import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BrainTest = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  
  const levels = [
    {
      id: 1,
      pattern: '숨겨진 삼각형',
      image: '/images/level1.jpg',
      answer: { x: 150, y: 200, radius: 30 }
    },
    {
      id: 2,
      pattern: '숨겨진 원',
      image: '/images/level2.jpg',
      answer: { x: 300, y: 250, radius: 30 }
    },
    {
      id: 3,
      pattern: '숨겨진 사각형',
      image: '/images/level3.jpg',
      answer: { x: 400, y: 300, radius: 30 }
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleClick = (e) => {
    if (gameOver) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const currentAnswer = levels[currentLevel - 1].answer;
    
    const distance = Math.sqrt(
      Math.pow(clickX - currentAnswer.x, 2) + 
      Math.pow(clickY - currentAnswer.y, 2)
    );
    
    if (distance <= currentAnswer.radius) {
      setScore(score + 100);
      if (currentLevel < levels.length) {
        setCurrentLevel(currentLevel + 1);
      } else {
        setGameOver(true);
      }
    }
  };

  const handleRestart = () => {
    setCurrentLevel(1);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
  };

  return (
    <Container>
      <Header>
        <Score>점수: {score}</Score>
        <Timer>남은 시간: {timeLeft}초</Timer>
      </Header>
      
      {gameOver ? (
        <GameOver>
          <h2>게임 종료!</h2>
          <p>최종 점수: {score}점</p>
          <RestartButton onClick={handleRestart}>다시 시작</RestartButton>
        </GameOver>
      ) : (
        <>
          <GameArea onClick={handleClick}>
            <img src={levels[currentLevel - 1].image} alt="테스트 이미지" />
          </GameArea>
          <Instructions>
            {levels[currentLevel - 1].pattern}을 찾아보세요!
          </Instructions>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Score = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Timer = styled.div`
  font-size: 24px;
  color: #f44336;
`;

const GameArea = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border: 2px solid #ccc;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Instructions = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
`;

const GameOver = styled.div`
  text-align: center;
  padding: 40px;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 20px 0;
`;

const RestartButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049;
  }
`;

export default BrainTest; 