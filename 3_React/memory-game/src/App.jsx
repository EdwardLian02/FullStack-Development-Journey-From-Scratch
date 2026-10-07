import React, { useEffect, useState } from 'react'
import GameHeader from './components/GameHeader'
import Card from './components/Card'
import WinMessage from './components/WinMessage'
import { useGameLogic } from './hooks/useGameLogic';

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];



function App() {
  const { cards, score, move, flipCard, initializeGame } = useGameLogic(cardValues)


  return (
    <>
      <div className='app'>
        <GameHeader move={move} score={score} onReset={initializeGame} />
        {
          score === 8 ?
            <WinMessage move={move} /> : null
        }
        <div className='cards-grid'>
          {
            cards.map((card) => (
              <Card card={card} onFliped={flipCard} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App