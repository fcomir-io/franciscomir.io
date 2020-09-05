// React libraries
import React, { Component } from "react"
// Components from Gatsby library
import { Link, graphql, useStaticQuery } from "gatsby"
// Components
import ExperienceBox from "../ExperienceBox/experienceBox"
// Internal application data
import { experience_blocks } from "../../../content/data/page_content"
// Styles
import "./experienceBlock.scss"

export default function ExperienceBanner() {
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
    <div className="experience-block">
      {experience_blocks.map(block => {
        let imageSrc = ""
        availableImagesArray.forEach(edge => {
          if (edge.node.name == block.id) {
            imageSrc = edge.node.childImageSharp.original.src
          }
        })

        return (
          <ExperienceBox
            id={block.id}
            title={block.title}
            image={imageSrc}
            summary={block.summary}
            description={block.description}
          />
        )
      })}
    </div>
  )
}
