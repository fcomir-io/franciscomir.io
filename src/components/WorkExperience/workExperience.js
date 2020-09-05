import React, { Component } from "react"
// Components
import Collapsible from "../Collapsible/collapsible"
// Styles
import "./workExperience.scss"

export default class WorkExperience extends Component {
  render() {
    const {
      title,
      location,
      date,
      description,
      mainResponsibilities,
    } = this.props.data

    return (
      <div className="work-experience-container">
        <h1 className="workExperience-Title">{title}</h1>
        <h2>{location}</h2>
        <h3>{date}</h3>
        <div
          className="resume-summary"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Collapsible title="Main Responsibilities">
          <div
            className="resume-summary"
            dangerouslySetInnerHTML={{ __html: mainResponsibilities }}
          />
        </Collapsible>
        <div className="resume-separator"/>        
      </div>
    )
  }
}
