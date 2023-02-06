import {Link} from 'react-router-dom'

const Courses = props => {
  const {details} = props
  const {id, logoUrl, name} = details

  return (
    <Link to={`/courses/${id}`}>
      <li>
        <img src={logoUrl} alt={name} />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default Courses
