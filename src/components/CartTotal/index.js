import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaRupeeSign} from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import './index.css'

class CartTotal extends Component {
  onClickPlaceOrder = () => {
    const {history} = this.props
    history.replace('/paymentSuccess')
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          let total = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.cost * eachCartItem.quantity
          })

          return (
            <>
              <div className="order_summary">
                <h1 className="order_text"> Order Total: </h1>

                <div className="order_price">
                  <div className="order_price_container">
                    <FaRupeeSign color="#3e4c59" size={16} />
                    <p testid="total-price" className="order_total">
                      {total}.00
                    </p>
                  </div>

                  <Link to="/payment">
                    <button
                      className="place_order_button"
                      type="button"
                      onClick={this.onClickPlaceOrder}
                    >
                      Place Order
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartTotal
