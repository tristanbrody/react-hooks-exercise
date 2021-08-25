import react, { useState, useEffect, useRef } from "react";

function CardContainer() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [deckEmpty, setDeckEmpty] = useState(false);
  useEffect(() => {
    fetch("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(
      response =>
        response.json().then(data => {
          setDeck(data.deck_id);
        })
    );
  }, []);

  const intervalRef = useRef();

  const handleClick = () => {
    intervalRef.current = setInterval(getCard, 1000);
  };

  const getCard = async e => {
    fetch(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
      .then(response => response.json())
      .then(data => {
        if (data.remaining === 0) {
          setCards(cards => [...cards, data.cards[0].image]);
          clearInterval(intervalRef.current);
          return alert("No more cards in the deck!");
        }
        setCards(cards => [...cards, data.cards[0].image]);
      });
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>Get a card</button>
      </div>
      {cards.map(card => {
        return <img src={card} alt="random card from deck"></img>;
      })}
    </div>
  );
}

export default CardContainer;
