import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dvwb9pmsz/image/upload/v1661413122/erroring_1_rbotoj.png"
      alt="not found"
      className="not-found-img"
    />

    <h1 className="not_found_heading">Page Not Found</h1>
    <p className="not_found_description">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>

    <Link to="/" className="btn_link">
      <button type="button" className="not_found_home_button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
