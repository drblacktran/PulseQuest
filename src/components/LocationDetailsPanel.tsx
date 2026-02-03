import { Attraction } from '../data/attractions';

interface LocationDetailsPanelProps {
  attraction: Attraction;
  onClose: () => void;
}

const LocationDetailsPanel: React.FC<LocationDetailsPanelProps> = ({ attraction, onClose }) => {
  return (
    <div className="location-details-panel">
      <button onClick={onClose} className="close-btn">&times;</button>

      <h2>{attraction.name}</h2>
      <span className="attraction-type-badge">{attraction.type.replace('_', ' ')}</span>

      <p className="description">{attraction.description}</p>

      {/* Rating */}
      <div className="rating">
        <span className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} style={{ color: star <= Math.round(attraction.rating) ? '#FFD700' : '#ddd' }}>
              &#9733;
            </span>
          ))}
        </span>
        <span className="rating-number">{attraction.rating.toFixed(1)}</span>
      </div>

      {/* Opening Hours */}
      <div className="opening-hours">
        <h3>Opening Hours</h3>
        <div className={`status ${attraction.openingHours.isOpen ? 'open' : 'closed'}`}>
          {attraction.openingHours.isOpen ? 'Open Now' : 'Closed'}
        </div>
        <ul>
          {attraction.openingHours.weekdayText.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
      </div>

      {/* Reviews */}
      <div className="reviews">
        <h3>Reviews</h3>
        {attraction.reviews.length > 0 ? (
          attraction.reviews.slice(0, 3).map((review, index) => (
            <div key={index} className="review">
              <div className="review-header">
                <strong>{review.author}</strong>
                <span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} style={{ color: star <= review.rating ? '#FFD700' : '#ddd', fontSize: '14px' }}>
                      &#9733;
                    </span>
                  ))}
                </span>
              </div>
              <p>{review.text}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews yet</p>
        )}
      </div>

      {/* Photos */}
      {attraction.photos.length > 0 && (
        <div className="photos">
          {attraction.photos.slice(0, 3).map((photo, index) => (
            <img key={index} src={photo} alt={`${attraction.name} ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationDetailsPanel;
