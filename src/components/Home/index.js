import Cookies from 'js-cookie'
import './index.css'

const Logo = 'https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png'
const digitalUrl =
  'https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png'

const Home = props => {
  const logOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <div className="app-container">
      <div className="card-container">
        <div className="header-container">
          <img src={Logo} alt="website logo" className="website-logo" />
          <button type="button" className="logout-btn" onClick={logOut}>
            Logout
          </button>
        </div>

        <h1 className="title-top">Your Flexibility, Our Excellence</h1>
        <img src={digitalUrl} alt=" digital card" className="digital-card" />
      </div>
    </div>
  )
}
export default Home
