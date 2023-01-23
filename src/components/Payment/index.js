import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import './index.css'

const Payment = () => (
  <>
    <NavBar />
    <div className="payment_success">
      <img
        className="payment_success_image"
        src="https://res.cloudinary.com/dvwb9pmsz/image/upload/v1661241812/Vector_blmlla.png"
        alt="PaymentSuccess"
      />
      <h1 className="payment_success_header"> Payment Successful </h1>

      <p className="payment_success_description">
        Thank you for ordering <br /> Your payment is successfully completed.
      </p>

      <Link className="btn_link" to="/">
        <button className="home_btn" type="button">
          Go To Home Page
        </button>
      </Link>
    </div>
  </>
)

export default Payment
