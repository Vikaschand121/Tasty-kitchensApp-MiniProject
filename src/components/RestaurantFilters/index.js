import {BsFilterLeft} from 'react-icons/bs'
import './index.css'

const RestaurantFilters = props => {
  const {activeOptionValue, sortByOptions, changeSortBy} = props

  const OnChangeFilter = event => {
    changeSortBy(event.target.value)
  }

  return (
    <div className="restaurant_filters">
      <h1 className="header"> Popular Restaurants </h1>
      <div className="filter_container">
        <p className="description">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>

        <div className="filter">
          <BsFilterLeft fontSize="large" />
          <p className="filter_text"> Sort by </p>

          <select
            className="filter_options"
            value={activeOptionValue}
            onChange={OnChangeFilter}
          >
            {sortByOptions.map(eachOption => (
              <option
                className="options"
                key={eachOption.id}
                value={eachOption.value}
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default RestaurantFilters
