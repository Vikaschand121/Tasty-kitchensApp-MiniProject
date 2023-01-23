import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer">
    <div className="logo_container">
      <img
        src="https://res.cloudinary.com/dvwb9pmsz/image/upload/v1661028456/Frame_275_whygnm.png"
        alt="website-footer-logo"
      />
      <h1 className="heading_text">Tasty Kitchens</h1>
    </div>
    <p className="quote">
      The only thing we are serious about is food. <br /> Contact us on
    </p>

    <div className="social_media_container">
      <a
        testid="pintrest-social-icon"
        href="https://in.pinterest.com/"
        target="_blank"
        rel="noreferrer"
      >
        <FaPinterestSquare className="footer-icon" />
      </a>
      <a
        testid="instagram-social-icon"
        href="https://instagram.com/"
        target="_blank"
        rel="noreferrer"
      >
        <FaInstagram className="footer-icon" />
      </a>
      <a
        testid="twitter-social-icon"
        href="https://twitter.com/"
        target="_blank"
        rel="noreferrer"
      >
        <FaTwitter className="footer-icon" />
      </a>
      <a
        testid="facebook-social-icon"
        href="https://facebook.com/"
        target="_blank"
        rel="noreferrer"
      >
        <FaFacebookSquare className="footer-icon" />
      </a>
    </div>
  </div>
)

export default Footer
