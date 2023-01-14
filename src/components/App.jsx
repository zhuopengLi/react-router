import React, { useState, useEffect } from 'react'
import Card from './reactComponents/Card'

export default function App() {

  const cardImgs = [
    { "src": "/img/helmet-1.png", "matched": false },
    { "src": "/img/potion-1.png", "matched": false },
    { "src": "/img/ring-1.png", "matched": false },
    { "src": "/img/scroll-1.png", "matched": false },
    { "src": "/img/shield-1.png", "matched": false },
    { "src": "/img/sword-1.png", "matched": false },
  ]

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [cardOne, setCardOne] = useState('')
  const [cardTwo, setCardTwo] = useState('')
  const [disabled, setDisabled] = useState(false)
  // Shuffle cards
  const shuffleCards = () => {
    const shuffled = [...cardImgs, ...cardImgs]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() * 10 }))

    setCardOne('')
    setCardTwo('')
    setCards(shuffled)
    setTurns(0)
  }

  // Handle a pick
  const handlePick = card => {
    !cardOne ? setCardOne(card) : setCardTwo(card)
  }

  // Compare the picks
  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true)
      if (cardOne.src === cardTwo.src) {
        setCards(prev => prev.map(card => {
          return card.src === cardOne.src ? { ...card, matched: true } : card
        }))
        resetTurn()
      } else {

        setTimeout(() => resetTurn(), 1000);
      }

    }
  }, [cardOne, cardTwo])

  // Reset card
  const resetTurn = () => {
    setCardOne('')
    setCardTwo('')
    setTurns(prev => prev + 1)
    setDisabled(false)
  }

  // Start game on loading
  useEffect(() => {
    shuffleCards()
  }, [])

  // useEffect(() => {
  //   if (cards.length !== 0) { console.log(cards.filter(card => card.matched === true)) }
  // }, [cards])

  return (
    <div className="App">

      <div className="magic-game-wrapper">
        <div className="magic-game-container">
          <h1>Magic Match</h1>
          <button onClick={shuffleCards}>New Game</button>

          <div className="cards">
            {cards.map(card => <Card
              key={card.id}
              card={card}
              handlePick={handlePick}
              flipped={card === cardOne || card === cardTwo || card.matched}
              disabled={disabled}
            />)}
          </div>

          <p>Turns: {turns}</p>
        </div>
      </div>


    </div>
  )
}