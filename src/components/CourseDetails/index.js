import {Component} from 'react'

import Header from '../Header'

class CourseDetails extends Component {
  state = {courseDetails: []}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const fetchData = await response.json()
    const details = {
      description: fetchData.course_details.description,
      imageUrl: fetchData.course_details.image_url,
      name: fetchData.course_details.name,
    }
    this.setState({courseDetails: details})
  }

  render() {
    const {courseDetails} = this.state
    const {imageUrl, name, description} = courseDetails
    return (
      <div>
        <Header />
        <div>
          <img src={imageUrl} alt={name} />
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}
export default CourseDetails
