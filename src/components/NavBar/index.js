import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './index.css'

class NavBar extends Component {
  state = {
    showHamburger: false,
    closeMenuOptions: false,
  }

  onClickClose = () => {
    this.setState(prevState => ({
      closeMenuOptions: !prevState.closeMenuOptions,
    }))
  }

  onShowNavMenu = () => {
    this.setState(prevState => ({showHamburger: !prevState.showHamburger}))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  getColor = current => {
    const {history} = this.props
    if (history.location.pathname === current) {
      // console.log(history.location.pathname)
      return '#f7931e'
    }
    return '#334155'
  }

  render() {
    const {showHamburger, closeMenuOptions} = this.state
    const closeMenu = closeMenuOptions ? 'closeMenu' : ''
    return (
      <>
        <div className="navbar">
          <div className="nav_container">
            <Link to="/" className="nav-link">
              <div className="logo_container">
                <img
                  className="logo"
                  src="https://res.cloudinary.com/dvwb9pmsz/image/upload/v1660886037/Group_7420_nbh8fg.png"
                  alt="website logo"
                />
                <h1 className="title"> Tasty Kitchen</h1>
              </div>
            </Link>

            <GiHamburgerMenu
              className="hamburgerMenu"
              size={25}
              onClick={this.onShowNavMenu}
            />

            <ul className="nav_options">
              <Link className="nav-link" to="/">
                <li className="nav_option" style={{color: this.getColor('/')}}>
                  Home
                </li>
              </Link>

              <Link className="nav-link" to="/cart">
                <li
                  className="nav_option"
                  style={{color: this.getColor('/cart')}}
                >
                  Cart
                </li>
              </Link>
            </ul>
          </div>
          <button className="button" type="button" onClick={this.onClickLogout}>
            Logout
          </button>
        </div>

        {showHamburger && (
          <div className={` mobile_nav_container ${closeMenu}`}>
            <ul className="mobile_nav_options">
              <Link className="nav-link" to="/">
                <li className="nav_option" style={{color: this.getColor('/')}}>
                  Home
                </li>
              </Link>

              <Link className="nav-link" to="/cart">
                <li
                  className="nav_option"
                  style={{color: this.getColor('/cart')}}
                >
                  Cart
                </li>
              </Link>

              <button
                className="mobile_button"
                type="button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </ul>

            <button
              className="nav-close-button"
              type="button"
              onClick={this.onClickClose}
            >
              <AiFillCloseCircle color=" #334155" size={25} />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(NavBar)
