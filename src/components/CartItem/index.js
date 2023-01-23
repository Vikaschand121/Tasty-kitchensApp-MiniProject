import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {cartItemDetails} = props
      const {imageUrl, cost, name, quantity, id} = cartItemDetails

      const onClickIncrease = () => {
        incrementCartItemQuantity(id)
      }

      const onClickDecrement = () => {
        decrementCartItemQuantity(id)
      }

      return (
        <li testid="cartItem" className="cart_item">
          <div testid="cartItem" className="cart_item_title">
            <img className="cart_item_image" src={imageUrl} alt={name} />
            <h1 className="cart_item_name">{name}</h1>
          </div>

          <div testid="cartItem" className="cart_qty_price">
            <h1 className="cart_item_mobile_name">{name}</h1>

            <div className="cart_buttons_container">
              <button
                testid="decrement-quantity"
                className="cart_item_button"
                type="button"
                onClick={onClickDecrement}
              >
                <BsDashSquare color="#52606D" size={16} />
              </button>

              <p testid="item-quantity" className="cart_item_quantity">
                {quantity}
              </p>

              <button
                testid="increment-quantity"
                className="cart_item_button"
                type="button"
                onClick={onClickIncrease}
              >
                <BsPlusSquare color="#52606D" size={16} />
              </button>
            </div>

            <div className="cart_item_price">
              <FaRupeeSign color="#ffa412" size={16} />
              <p className="cart_item_cost">{cost}.00</p>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
