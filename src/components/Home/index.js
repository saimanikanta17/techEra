import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Courses from '../Courses'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourses()
  }

  clickRetry = () => {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const fetchData = await response.json()
      const convertData = fetchData.courses.map(data => ({
        id: data.id,
        logoUrl: data.logo_url,
        name: data.name,
      }))
      this.setState({
        coursesList: convertData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderHomeRouteLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTechEraView = () => {
    const {coursesList} = this.state
    return (
      <div>
        <h1>Courses</h1>
        <ul>
          {coursesList.map(details => (
            <Courses details={details} key={details.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.clickRetry}>
        Retry
      </button>
    </div>
  )

  renderTechEra = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderHomeRouteLoader()
      case apiStatusConstants.success:
        return this.renderTechEraView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderTechEra()}
      </div>
    )
  }
}

export default Home
