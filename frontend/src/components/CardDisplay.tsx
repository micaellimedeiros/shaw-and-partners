import { useAppContext } from "../context/AppContext";

const CardDisplay = () => {
  const { cards } = useAppContext();

  return (
    <div>
      {cards.length > 0 ? (
        cards.map((card, index) => (
          <div key={index}>
            <p>Name: {card.name}</p>
            <p>City: {card.city}</p>
            <p>Country: {card.country}</p>
            <p>Favorite Sport: {card.favorite_sport}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No matching results found.</p>
      )}
    </div>
  );
};

export default CardDisplay;
