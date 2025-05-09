import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc = "",
  imageAlt = "image",
  date = new Date(),
  title = "",
  label = "",
  small = false,
  ...props
}) => {
  if (!imageSrc || !title || !label) {
    console.warn("EventCard: Missing required props");
    return null;
  }

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img 
          data-testid="card-image-testid" 
          src={imageSrc} 
          alt={imageAlt} 
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Event+Image";
          }}
        />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default EventCard;
