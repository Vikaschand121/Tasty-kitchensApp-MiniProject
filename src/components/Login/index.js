import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <div className="input_label_container">
        <label className="label" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input"
          id="username"
          type="text"
          value={username}
          onChange={this.onChangeUserName}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="input_label_container">
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="input"
          id="password"
          type="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          className="mobile_view_image"
          src="https://res.cloudinary.com/dvwb9pmsz/image/upload/v1661262731/Rectangle_1457_mugzk1.png"
          alt="website login"
        />
        <div className="login_container">
          <form className="form" onSubmit={this.onSubmitForm}>
            <img
              className="login_logo"
              src="https://res.cloudinary.com/dvwb9pmsz/image/upload/v1660886037/Group_7420_nbh8fg.png"
              alt="website logo"
            />
            <h1 className="login_title"> Tasty Kitchens </h1>
            <h1 className="login_text"> Login </h1>
            {this.renderUserName()}
            {this.renderPassword()}
            <button type="submit" className="login_button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>

        <img
          className="web_view_image"
          src="https://res.cloudinary.com/dvwb9pmsz/image/upload/v1660929987/Rectangle_1456_ue8fyj.png"
          alt="website logo"
        />
      </div>
    )
  }
}

export default Login
