// React libraries
import React from "react"
import { Helmet } from "react-helmet"
// Components from Gatsby library
import { Link, graphql, useStaticQuery } from "gatsby"
// 3rd party libraries
import StarRatingComponent from "react-star-rating-component"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
// Internal application data
import config from "../../data/siteConfig"
import {
  about_summary,
  technical_topics_list,
  skills_list,
  languages_list,
} from "../../content/data/page_content"
// Components
import PageLayout from "../pageLayout/pageLayout"
import Collapsible from "../components/Collapsible/collapsible"
import ExperienceBlock from "../components/ExperienceBlock/experienceBlock"
import ExperienceBox from "../components/ExperienceBox/experienceBox"
// Styles
import "../styles/pages/about.scss"

function AboutPage(props) {
  /** Query to get list of available images */
  const contentImages_Query = useStaticQuery(graphql`
    query {
      allFile(filter: { extension: { eq: "png" } }) {
        edges {
          node {
            name
            childImageSharp {
              original {
                src
              }
            }
          }
        }
      }
    }
  `)
  const availableImagesArray = contentImages_Query.allFile.edges

  return (
    <PageLayout>
      <Helmet title={`About me - ${config.siteTitle}`} />
      <div className="page-container">
        <h1 className="page-title">About</h1>
        <div className="about-container">
          <div
            className="short-bio"
            dangerouslySetInnerHTML={{ __html: about_summary }}
          />
          <Collapsible title="Areas of Expertise" open={false}>
            <ExperienceBlock />
          </Collapsible>
          <span className="empty-space"></span>
          <Collapsible title="Abilities">
            <div className="abilities">
              <h2 className="ability-caption">Skills</h2>
              <div className="ability-box" style={{ maxHeight: "150px" }}>
                {skills_list.map(skill => {
                  return <h2>{skill}</h2>
                })}
              </div>

              <h2 className="ability-caption">Technical Knowledge</h2>
              <div className="ability-box" style={{ maxHeight: "350px" }}>
                {technical_topics_list.map(skill => {
                  return <h2>{skill}</h2>
                })}
              </div>

              <h2 className="ability-caption">Languages</h2>
              <div className="ability-box" style={{ maxHeight: "75px" }}>
                {languages_list.map(language => {
                  return <h2>{language}</h2>
                })}
              </div>
            </div>
          </Collapsible>
          <span className="empty-space"></span>
          <div className="extra-info">
            <Link to={"/resume"}>My Resume</Link>
            <Link to={"/bio"}>My Bio</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default AboutPage

/*
class RatingBox extends React.Component {
  render() {
    const { caption, value } = this.props

    return (
      <>
        <div className="rating-box">
          <h2>{caption}</h2>
        </div>
      </>
    )
  }
}

<RatingBox caption={skill.caption} value={skill.value} />
<StarRatingComponent
            name={caption}
            editing={false}
            starCount={5}
            value={value}
            renderStarIcon={() => <FaStar size={18} />}
            renderStarIconHalf={() => (
              <FaStarHalfAlt
                size={18}
                color={value <= 0.5 ? "#e4eed2" : "#4a5e26"}
              />
            )}
            starColor={`#4a5e26`}
            emptyStarColor={`#e4eed2`}
          />
          */
