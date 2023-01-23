import {Link} from 'react-router-dom'
import {ImStarFull} from 'react-icons/im'
import './index.css'

const RestaurantCard = props => {
  const {restaurants} = props
  const {id, name, imageUrl, cuisine, userRating, totalReviews} = restaurants

  return (
    <Link to={`/restaurant/${id}`} className="link-item">
      <li testid="restaurant-item" className="restaurant_card">
        <img src={imageUrl} alt="restaurant" className="restaurant_image" />
        <div className="restaurant_details">
          <h1 className="restaurant_name">{name}</h1>
          <p className="restaurant_cuisine">{cuisine}</p>
          <div className="restaurant_review">
            <div className="review_container">
              <ImStarFull className="restaurant-star" />
              <p className="restaurant-rating">{userRating.rating}</p>
            </div>
            <h1 className="restaurant-review">({totalReviews})</h1>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
