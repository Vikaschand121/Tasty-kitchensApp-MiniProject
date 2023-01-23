import CartContext from '../../context/CartContext'
import NavBar from '../NavBar'
import CartListView from '../CartListView'
import CartTotal from '../CartTotal'
import EmptyCart from '../EmptyCart'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const showEmptyView = cartList.length === 0
      return (
        <>
          <NavBar />
          <div className="cart">
            {showEmptyView ? (
              <EmptyCart />
            ) : (
              <div testid="cartItem" className="cart_container">
                <ul className="cart_list_table">
                  <li className="cart_headers">
                    <p className="cart_header_text"> Item </p>
                    <p className="cart_header_text"> Quantity </p>
                    <p className="cart_header_text"> Price</p>
                  </li>
                  <CartListView />
                  <hr className="cart_line" />
                  <CartTotal />
                </ul>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
