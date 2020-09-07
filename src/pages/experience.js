// React libraries
import React from "react"
import { Helmet } from "react-helmet"
import GitHubButton from "react-github-btn"
// Components from Gatsby library
import { Link, graphql, useStaticQuery } from "gatsby"
// Internal application data
import config from "../../data/siteConfig"
import { experience_blocks } from "../../content/data/page_content"
// Components
import PageLayout from "../pageLayout/pageLayout"
// Styles
import "../styles/pages/experience.scss"

function ExperiencePage(props) {
  /** Query to get list of available images */
  let contentImages_Query = ""
  async function loadImages() {
    contentImages_Query = useStaticQuery(graphql`
      query {
        allFile(filter: { extension: { eq: "png" } }) {
          edges {
            node {
              name
              childImageSharp {
                fixed {
                  ...GatsbyImageSharpFixed
                }
                original {
                  src
                }
              }
            }
          }
        }
      }
    `)
  }

  let availableImagesArray = ""
  const temp = loadImages().then(
    (availableImagesArray = contentImages_Query.allFile.edges)
  )

  //("availableImagesArray: ", availableImagesArray)

  // By default <== DO NOT LIKE THIS SOLUTION... It should go to 404
  let id = ""
  let title = ""
  let image = ""
  let summary = ""
  let description = ""

  /** Check if the prop 'open' is defined */
  if (props.location.state != null) {
    /** The ( ) around the assignment statement is required syntax when using the object literal destructuring assignment
     *  without a declaration. This is because the {} on the left hand side is considered a block and not an object litera
     *  https://www.freecodecamp.org/news/array-and-object-destructuring-in-javascript/ */
    ;({ id, title, image, summary, description } = props.location.state)
  }

  return (
    <PageLayout>
      <Helmet title={`About me - ${config.siteTitle}`} />
      <div className="page-container">
        <div className="experience-container">
          <div className="experience-header">
            <h1>{title}</h1>
          </div>
          <div className="experience-body">
            <img src={image} className="experience-icon" alt={title} />
            <div
              className="experience-summary"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          </div>
          <div
            className="experience-description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {id == "software-engineer" || id == "IoT-enabler" ? (
            <div className="github-button">
              <GitHubButton
                href="https://github.com/fcomir-io"
                data-size="large"
                data-show-count="false"
              >
                Check out my projects on @fcomir-io
              </GitHubButton>
            </div>
          ) : (
            ""
          )}
          <div className="experience-footer">
            {experience_blocks.map(block => {
              let imageSrc = ""
              availableImagesArray.forEach(edge => {
                if (edge.node.name == block.id) {
                  //imageSrc = edge.node.childImageSharp.fixed.src
                  imageSrc = edge.node.childImageSharp.original.src
                }
              })

              const objectProps = {
                id: block.id,
                title: block.title,
                image: imageSrc,
                summary: block.summary,
                description: block.description,
              }

              if (block.id !== id) {
                return (
                  <Link to={"/experience"} state={objectProps}>
                    <h1>{block.title}</h1>
                  </Link>
                )
              }
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default ExperiencePage
