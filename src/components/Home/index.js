import {Component} from 'react'

import Courses from '../Courses'
import Header from '../Header'

class Home extends Component {
  state = {coursesList: []}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const fetchData = await response.json()
    const convertData = fetchData.courses.map(data => ({
      id: data.id,
      logoUrl: data.logo_url,
      name: data.name,
    }))
    this.setState({coursesList: convertData})
  }

  render() {
    const {coursesList} = this.state
    return (
      <div>
        <Header />
        <div>
          <h1>Courses</h1>
          <ul>
            {coursesList.map(details => (
              <Courses details={details} key={details.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
