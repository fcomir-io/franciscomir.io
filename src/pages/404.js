// React libraries
import React from "react"
import { Helmet } from "react-helmet"
// Gatsby libraries
import { Link } from "gatsby"
// Components
import PageLayout from "../pageLayout/pageLayout"

const NotFound = () => {
  return (
    <PageLayout>
    <Helmet title={`${config.siteTitle} – Page not found`} />
    <div className="page-container">
      <h1>Page not found</h1>
    </div>
  </PageLayout>
  )
}

export default NotFound
