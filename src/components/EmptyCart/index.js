import {Link} from 'react-router-dom'
import './index.css'

const EmptyCart = () => (
  <div className="emptyCart">
    <img
      src="https://res.cloudinary.com/dvwb9pmsz/image/upload/v1660885540/OBJECTS_gtfy5v.png"
      alt="empty cart"
    />
    <h1 className="emptyCart_heading"> No Order Yet! </h1>
    <p className="emptyCart_description">
      Your cart is empty. <br /> Add something from the menu.
    </p>

    <Link to="/" className="button_link">
      <button type="button" className="emptyCart_button">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCart
