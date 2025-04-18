import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data && data.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    if (!byDateDesc) return; // Ajout d'une vérification
    const timeout = setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
    return () => clearTimeout(timeout);
  };
  useEffect(() => {
    if (byDateDesc) { // Ajout d'une vérification
      nextCard();
    }
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc && byDateDesc.map((event, idx) => (
        <div key={event.id ? event.id : `event-${idx}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          {index === idx && (
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc && byDateDesc.map((_, radioIdx) => (
                  <input
                    key={`radio-${radioIdx}`}  // Utiliser radioIdx comme clé unique
                    type="radio"
                    name="radio-button"
                    checked={idx === radioIdx}
                    onChange={() => setIndex(radioIdx)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
