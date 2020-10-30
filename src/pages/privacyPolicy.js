// React libraries
import React from "react";
import { Helmet } from "react-helmet";
// Components from Gatsby library
import { Link, graphql, useStaticQuery } from "gatsby";
// Internal application data
import config from "../../data/siteConfig";
import { privacy_policy } from "../../content/data/privacyPolicy";
// Components
import PageLayout from "../pageLayout/pageLayout";
// Styles
import "../styles/pages/resume.scss";

function PrivacyPolicy() {
  return (
    <PageLayout>
      <Helmet title={`About me - ${config.siteTitle}`} />
      <div className="page-container">
        <h1 className="page-title">Privacy and Cookies Policy</h1>
        <div className="resume-container">
          <div
            className="resume-summary"
            dangerouslySetInnerHTML={{ __html: privacy_policy }}
          />
        </div>
      </div>
    </PageLayout>
  );
}

export default PrivacyPolicy;
