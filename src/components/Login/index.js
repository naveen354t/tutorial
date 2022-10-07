import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const loginHomeImg =
  'https://assets.ccbp.in/frontend/react-js/ebank-login-img.png'

class LoginForm extends Component {
  state = {userId: '', pin: '', showSubmitError: false, errorMsg: ''}

  onChangeUserID = event => {
    this.setState({userId: event.target.value})
  }

  onChangeUserPIN = event => {
    this.setState({pin: event.target.value})
  }

  renderUserIdFields = () => {
    const {userId} = this.state
    return (
      <>
        <label className="label" htmlFor="userid">
          User ID
        </label>
        <input
          id="userid"
          value={userId}
          type="text"
          placeholder="Enter User ID"
          onChange={this.onChangeUserID}
          className="input"
        />
      </>
    )
  }

  renderUserPinFields = () => {
    const {pin} = this.state
    return (
      <>
        <label htmlFor="pin" className="label">
          PIN
        </label>
        <input
          id="pin"
          value={pin}
          type="password"
          placeholder="Enter PIN"
          onChange={this.onChangeUserPIN}
          className="input"
        />
      </>
    )
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const loginUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="loginForm-container">
          <img src={loginHomeImg} alt="website login" className="login-image" />
          <div className="input-container">
            <h1 className="welcome-title">Welcome Back!</h1>
            <form onSubmit={this.onSubmitForm}>
              <div className="inputFields-container">
                {this.renderUserIdFields()}
              </div>
              <div className="inputFields-container">
                {this.renderUserPinFields()}
              </div>
              <button type="submit" className="form-btn">
                Login
              </button>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm
