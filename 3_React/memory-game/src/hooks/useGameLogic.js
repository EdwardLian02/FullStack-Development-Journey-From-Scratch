import React, { useEffect, useState } from 'react'

export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [move, setMove] = useState(0);
  const [isLock, setIsLock] = useState(false);



const  shuffleArray = (array) => {
  const shuffled = [...array]; // don't modify original array

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = 
      [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}



  const initializeGame = () => {
    const finalCards = shuffleArray(cardValues).map((card, index) => {
      return {
        id: index,
        value: card,
        isFlipped: false,
        isMatched: false,
      }
    });

    setCards(finalCards);
    setIsLock(false)
    setFlippedCards([]);
    setScore(0);
    setMove(0);

  }

  useEffect(() => {
    initializeGame();
  }, [])


  function flipCard(card) {

    if (card.isFlipped || card.isMatched || isLock) return;


    console.log(flippedCards)

    const updateCards = cards.map((c) => c.id === card.id ? { ...c, isFlipped: true } : c);
    setCards(updateCards);

    //Handle with flipped cards
    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards)

    //Check if fippedCards is alredy length 2;
    if (flippedCards.length === 1) {
      setIsLock(true)
      const checkIsMatch = cards[flippedCards[0]].value === card.value

      if (checkIsMatch) {
      setTimeout(()=>{
      const updateMatchCards = updateCards.map((c) => {

          if (c.id === flippedCards[0] || c.id === card.id) {
            console.log('hi')
            return { ...c, isMatched: true, isFlipped: true }
          } else {
            return c;
          }
        });
        setScore((prev) => prev+=1 )
        setCards(updateMatchCards)
        setFlippedCards([]);
          setIsLock(false);
        }, 300)
      

      } else {


        //Flip back cards
        setTimeout(() => {
          const flippedBackCard = updateCards.map((c) => {
            return newFlippedCards.includes(c.id) ? { ...c, isFlipped: false } : c;
          });
          setCards(flippedBackCard)

          setFlippedCards([]);
          setIsLock(false);
        }, 1000);



      }
    }

    setMove((prev) => prev += 1);
  }


  return {cards, move, score, initializeGame, flipCard}

}