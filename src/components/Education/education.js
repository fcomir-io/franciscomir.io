import React, { Component } from "react"
// Components
import Collapsible from "../Collapsible/collapsible"
// Styles
import "./education.scss"

export default class Education extends Component {
  render() {
    const {
      title,
      university,
      location,
      date,
      finalProject,
      practicalExperience,
    } = this.props.data

    return (
      <div className="work-experience-container">
        <h1 className="workExperience-Title">{title}</h1>
        <h2>{university}</h2>
        <Collapsible title="More">
          <h2>{location}</h2>
          <h3>{date}</h3>
          <div
            className="resume-summary"
            dangerouslySetInnerHTML={{ __html: finalProject }}
          >
            
          </div>
          {practicalExperience != "" ? (
            <div
              className="resume-summary"
              dangerouslySetInnerHTML={{ __html: practicalExperience }}
            />
          ) : null}
        </Collapsible>
        <div className="resume-separator" />
      </div>
    )
  }
}
