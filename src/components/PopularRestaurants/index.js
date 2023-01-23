import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'
import RestaurantFilters from '../RestaurantFilters'
import RestaurantCard from '../RestaurantCard'

import './index.css'

const sortByOptions = [
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularRestaurants extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    restaurantsList: [],
    activeOptionValue: sortByOptions[1].value,
    activePage: 1,
    totalPages: 0,
    // searchInput: '',
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeOptionValue, activePage} = this.state
    console.log(activeOptionValue)
    const token = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const totalRestaurants = data.total
      const totalPages = Math.ceil(totalRestaurants / limit)
      const UpdatedData = data.restaurants.map(restaurant => ({
        costForTwo: restaurant.cost_for_two,
        cuisine: restaurant.cuisine,
        groupByTime: restaurant.group_by_time,
        hasOnlineDelivery: restaurant.has_online_delivery,
        hasTableBooking: restaurant.has_table_booking,
        id: restaurant.id,
        imageUrl: restaurant.image_url,
        isDeliveringNow: restaurant.is_delivering_now,
        location: restaurant.location,
        menuType: restaurant.menu_type,
        name: restaurant.name,
        opensAt: restaurant.opens_at,
        userRating: restaurant.user_rating,
        totalReviews: restaurant.user_rating.total_reviews,
      }))
      this.setState({
        restaurantsList: UpdatedData,
        apiStatus: apiStatusConstants.success,
        totalPages,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickLeftArrow = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurants,
      )
    }
  }

  onClickRightArrow = () => {
    const {activePage} = this.state
    if (activePage <= 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurants,
      )
    }
  }

  changeSortBy = activeOptionValue => {
    this.setState({activeOptionValue}, this.getRestaurants)
  }

  renderRestaurant = () => {
    const {
      restaurantsList,
      activeOptionValue,
      activePage,
      totalPages,
    } = this.state
    const shouldShowRestaurantList = restaurantsList.length > 0

    return shouldShowRestaurantList ? (
      <div className="restaurants_container">
        <RestaurantFilters
          activeOptionValue={activeOptionValue}
          sortByOptions={sortByOptions}
          changeSortBy={this.changeSortBy}
        />
        <ul className="restaurant_list">
          {restaurantsList.map(restaurants => (
            <RestaurantCard key={restaurants.id} restaurants={restaurants} />
          ))}
        </ul>

        <div testid="active-page-number" className="pagination_container">
          <button
            testid="pagination-left-button"
            type="button"
            className="pagination-button"
            onClick={this.onClickLeftArrow}
          >
            <RiArrowDropLeftLine className="pagination-arrow-icon" />
          </button>

          <p testid="active-page-number" className="page_numbers">
            <span
              testid="active-page-number"
              className="page_numbers"
              style={{marginLeft: '5px', marginRight: '5px'}}
            >
              {activePage}
            </span>
            of {totalPages}
          </p>

          <button
            testid="pagination-right-button"
            type="button"
            className="pagination-button"
            onClick={this.onClickRightArrow}
          >
            <RiArrowDropRightLine className="pagination-arrow-icon" />
          </button>
        </div>
      </div>
    ) : (
      <div className="no-restaurant-view">
        <h1 className="no-restaurants-heading">No Restaurants Found</h1>
        <p className="no-restaurants-description">
          We could not find any Restaurants. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="restaurant-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="restaurant-failure-img"
      />
      <h1 className="restaurant-failure-heading">Oops! Something Went Wrong</h1>
      <p className="restaurant-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderLoader = () => (
    <div testid="restaurants-list-loader" className="carousel-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderRestaurantDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurant()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderRestaurantDetails()}</>
  }
}

export default PopularRestaurants
