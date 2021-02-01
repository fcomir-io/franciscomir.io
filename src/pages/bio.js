// React libraries
import React from "react"
import { Helmet } from "react-helmet"
// Components from Gatsby library
import { Link, graphql, useStaticQuery } from "gatsby"
// Internal application data
import config from "../../data/siteConfig"
import { me, timeline, sport, art } from "../../content/data/bio"
// Components
import PageLayout from "../pageLayout/pageLayout"
// Styles
import "../styles/pages/bio.scss"
// Images
import water_polo from "../../content/images/about-sports-01.jpg"

function MyBioPage() {
  return (
    <PageLayout>
      <Helmet title={`About me - ${config.siteTitle}`} />
      <div className="page-container">
        <div className="bio-container">
          <h1 className="page-title">My Bio</h1>
          <div className="bio-general">
            <div className="general-details">
              {timeline.map(item => {
                return (
                  <ul>
                    <TimelineBox text={item.text} />
                  </ul>
                )
              })}
            </div>
            <div className="image-box">
              <img className="general-image" src={water_polo} /> -->
            </div>
          </div>
          <h1 className="page-title">Sport</h1>
          <div className="bio-sport">
            <div className="sport-details">
              {sport.map(item => {
                return (
                  <ul>
                    <TimelineBox text={item.text} />
                  </ul>
                )
              })}
            </div>
            <div className="image-box">
              <img className="sport-image" src={water_polo} />
            </div>
          </div>
          <h1 className="page-title">Art & Music</h1>
          <div className="bio-art-music">
            <div className="art-music-details">
              {art.map(item => {
                return (
                  <ul>
                    <TimelineBox text={item.text} />{" "}
                  </ul>
                )
              })}
            </div>
            <div className="image-box">
              <img className="art-music-image" src={water_polo} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default MyBioPage

class TimelineBox extends React.Component {
  render() {
    const { text } = this.props

    return (
      <>
        <li>
          <div
            className="timline-box"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </li>
      </>
    )
  }
}
