// React libraries
import React from "react"
import { Helmet } from "react-helmet"
// Components from Gatsby library
import { Link, graphql, useStaticQuery } from "gatsby"
// Internal application data
import config from "../../data/siteConfig"
import { resume_summary } from "../../content/data/page_content"
// Components
import PageLayout from "../pageLayout/pageLayout"
// Styles
import "../styles/pages/resume.scss"
// Images
import linkedin from "../images/linkedin.png"

function ResumePage() {
  const myCV_Query = useStaticQuery(graphql`
    query {
      allFile(filter: { extension: { eq: "pdf" } }) {
        edges {
          node {
            publicURL
            name
          }
        }
      }
    }
  `)
  const pdfFiles = myCV_Query.allFile.edges
  //console.log("myCV:", pdfFiles)
  let myCV_URL = ""
  pdfFiles.forEach(file => {
    if (file.node.name == "cv") {
      myCV_URL = file.node.publicURL
    }
  })
  //console.log("myCV:", myCV_URL)

  return (
    <PageLayout>
      <Helmet title={`About me - ${config.siteTitle}`} />
      <div className="page-container">
        <h1 className="page-title">Summary</h1>
        <div className="resume-container">
          <div
            className="resume-summary"
            dangerouslySetInnerHTML={{ __html: resume_summary }}
          />

          <div className="resume-extra-info">
            <div className="linkedin-button">
              <a
                href="https://www.linkedin.com/in/franciscomir/"
                title="Go to my LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={linkedin}
                  rel="noopener noreferrer"
                  className="icon-img"
                  alt="LinkedIn"
                />
              </a>
            </div>
            <a className="cv-link" href={myCV_URL} download>
              Download CV as pdf
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default ResumePage
