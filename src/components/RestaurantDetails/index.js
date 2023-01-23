import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'
import NavBar from '../NavBar'
import FoodItem from '../FoodItem'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    restaurantList: [],
    foodItemsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantItems()
  }

  getRestaurantItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      const updatedFoodItems = data.food_items.map(eachFoodItem => ({
        cost: eachFoodItem.cost,
        foodType: eachFoodItem.food_type,
        id: eachFoodItem.id,
        imageUrl: eachFoodItem.image_url,
        name: eachFoodItem.name,
        rating: eachFoodItem.rating,
      }))

      this.setState({
        restaurantList: updatedData,
        foodItemsList: updatedFoodItems,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderRestaurantItems = () => {
    const {restaurantList, foodItemsList} = this.state
    const {
      name,
      imageUrl,
      cuisine,
      location,
      rating,
      costForTwo,
      reviewsCount,
    } = restaurantList

    return (
      <>
        <div className="restaurantsInfo_container">
          <div className="restaurants_details">
            <div>
              <img
                className="restaurants_image"
                src={imageUrl}
                alt="restaurant"
              />
            </div>
            <div className="restaurants_info">
              <h1 className="restaurants_name">{name}</h1>
              <p className="restaurants_cuisine">{cuisine}</p>
              <p className="restaurants_location">{location}</p>

              <div className="restaurants_ratingsContainer">
                <div className="restaurants_ratings">
                  <div className="restaurants_ratingsStar">
                    <FaStar className="restaurants-star" />
                    <p className="restaurants_ratingsText">{rating}</p>
                  </div>

                  <p className="restaurants_reviewsText">
                    {reviewsCount}+Ratings
                  </p>
                </div>
                <hr className="line" />
                <div>
                  <div className="food_items_cost">
                    <div className="restaurants_ratingsStar">
                      <BiRupee className="restaurants-star" />
                      <p className="restaurants_ratingsText">{costForTwo}</p>
                    </div>

                    <p className="restaurants_reviewsText">Cost for two</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food_items_list">
          {foodItemsList.map(foodItem => (
            <FoodItem key={foodItem.id} foodItems={foodItem} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  renderFailureView = () => (
    <div className="restaurant-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="restaurant-not-found-heading"> Food Not Found</h1>
      <button type="button" className="error_view_button">
        Continue Ordering
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div
      testid="restaurant-details-loader"
      className="products-details-loader-container"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRestaurantItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantItems()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <NavBar />
        {this.renderRestaurantItemDetails()}
      </>
    )
  }
}

export default RestaurantDetails
