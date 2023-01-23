import {Component} from 'react'
import {ImStarFull} from 'react-icons/im'
import {BiRupee} from 'react-icons/bi'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import CartContext from '../../context/CartContext'
import './index.css'

class FoodItem extends Component {
  state = {
    quantity: 0,
  }

  renderAddToCartItems = () => (
    <CartContext.Consumer>
      {value => {
        const {foodItems} = this.props
        const {id, cost, imageUrl, name, rating} = foodItems
        const {quantity} = this.state
        const {
          addCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const onClickAddToCart = () => {
          this.setState(
            prevState => ({
              quantity: prevState.quantity + 1,
            }),
            addCartItem({...foodItems, quantity: quantity + 1}),
          )
        }

        const onClickIncrease = () => {
          this.setState(prevState => ({quantity: prevState.quantity + 1}))
          incrementCartItemQuantity(id)
        }

        const onClickDecrement = () => {
          this.setState(prevState => ({quantity: prevState.quantity - 1}))
          decrementCartItemQuantity(id)
        }

        return (
          <>
            <li testid="foodItem" className="food_card">
              <img src={imageUrl} alt={name} className="food_image" />
              <div className="food_details">
                <h1 className="food_name">{name}</h1>
                <div className="price_container">
                  <BiRupee className="rupee-icon" />
                  <p className="food_price"> {cost}</p>
                </div>
                <div className="food_container">
                  <ImStarFull className="food-star" />
                  <p className="food-rating">{rating}</p>
                </div>

                {quantity === 0 ? (
                  <button
                    className="food_add_button"
                    type="button"
                    onClick={onClickAddToCart}
                  >
                    Add
                  </button>
                ) : (
                  <div className="quantity_buttons_container">
                    <button
                      testid="decrement-count"
                      className="quantity_button"
                      type="button"
                      onClick={onClickDecrement}
                    >
                      <BsDashSquare color="#52606D" size={16} />
                    </button>
                    <p testid="active-count" className="quantity_no">
                      {quantity}
                    </p>
                    <button
                      testid="increment-count"
                      className="quantity_button"
                      type="button"
                      onClick={onClickIncrease}
                    >
                      <BsPlusSquare color="#52606D" size={16} />
                    </button>
                  </div>
                )}
              </div>
            </li>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <>{this.renderAddToCartItems()}</>
  }
}

export default FoodItem
