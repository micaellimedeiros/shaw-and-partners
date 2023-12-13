import { useAppContext } from "../../context/AppContext";

import { CardContainer, CardItem } from "./styles";

const CardDisplay = () => {
  const { cards } = useAppContext();

  return (
    <CardContainer>
      {cards.length > 0 ? (
        cards.map((card, index) => (
          <CardItem key={index}>
            <p>Name: {card.name}</p>
            <p>City: {card.city}</p>
            <p>Country: {card.country}</p>
            <p>Favorite Sport: {card.favorite_sport}</p>
          </CardItem>
        ))
      ) : (
        <p>No matching results found.</p>
      )}
    </CardContainer>
  );
};

export default CardDisplay;
