// React libraries
import React from "react"
// Components from Gatsby library
import { Link } from "gatsby"
// Styles
import "./experienceBox.scss"

class ExperienceBox extends React.Component {
  render() {
    const { id, title, image, summary, description } = this.props

    return (
      <div className="experience-box">
        <Link to={"/experience"} state={this.props}>
          <div className="topic">            
            <img src={image} className="experience-icon" alt={title} />
            <h1>{title}</h1>
          </div>
        </Link>
      </div>
    )
  }
}

export default ExperienceBox