import './index.css'

const NotFoundUrl =
  'https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png'

const NotFound = () => (
  <div className="notFound-container">
    <img src={NotFoundUrl} alt="not found" className="not-foundImg" />
    <h1 className="title">Page Not Found</h1>
    <p className="description">
      We are sorry,the page you requested could not be found
    </p>
  </div>
)

export default NotFound
