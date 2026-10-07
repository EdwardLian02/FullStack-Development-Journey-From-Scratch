import React from 'react'

function Card({card,onFliped}) {
   return (
    <div
      className={`card ${card.isFlipped? 'flipped': ''} ${card.isMatched? 'matched': ''}`}
      onClick={() => onFliped(card)}
    >
      <div className="card-front">?</div>
      <div className="card-back">{card.value}</div>
    </div>
  );
}

export default Card