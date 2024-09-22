import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faEmptyStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="star-rating">
            {Array(fullStars)
                .fill(0)
                .map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
                ))}
            {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
            {Array(emptyStars)
                .fill(0)
                .map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faEmptyStar} className="text-yellow-500" />
                ))}
        </div>
    );
};

export default StarRating;
