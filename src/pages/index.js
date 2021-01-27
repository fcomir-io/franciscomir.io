// React libraries
import React from "react";
import { Helmet } from "react-helmet";
import GitHubButton from "react-github-btn";
import SEO from "react-seo-component";
// Components from Gatsby library
import { Link, graphql, useStaticQuery } from "gatsby";
// 3rd party libraries
import { FaRegNewspaper } from "react-icons/fa";
// Internal applicaiton data
import config from "../../data/siteConfig";
import { index_pitch } from "../../content/data/page_content";
// Components
import PageLayout from "../pageLayout/pageLayout";
import ExperienceBlock from "../components/ExperienceBlock/experienceBlock";
import PostListing from "../components/PostListing/postListing";
import { useSiteMetadata } from "../components/SEO/useSiteMetaData";
import Dump from "../components/_debug__Dump/Dump";
// Styles
import "../styles/pages/index.scss";
// Images
import fran from "../../content/images/fran_2019_crop.jpg";
import linkedin from "../images/linkedin.png";

export default function Home() {
  /** Query to get list of available posts */
  const allPostEdges_Query = useStaticQuery(graphql`
    query {
      posts: allMdx(
        sort: {
          order: [DESC]
          fields: [frontmatter___date]
        }
        limit: 10
      ) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "DD-MMMM-YYYY")
              last_modified(formatString: "DD-MMMM-YYYY")
              thumbnail {
                childImageSharp {
                  fixed(width: 150, height: 150) {
                    ...GatsbyImageSharpFixed
                  }
                  original {
                    src
                  }
                }
              }
            }
            slug
          }
        }
      }
    }
  `);
  const posts = allPostEdges_Query.posts.edges;

  /** Data for SEO Metadata */
  const {
    title,
    description,
    author,
    siteUrl,
    logo,
  } = useSiteMetadata().siteMetadata;

  return (
    <PageLayout>
      <Helmet title={`${config.siteTitle} – ${config.siteSlogan}`} />
      <SEO
        title={title}
        description={description || "nothing’"}
        image={logo}
        pathname={siteUrl}
        siteLanguage={config.siteLanguage}
        siteLocale={config.siteLocale}
      />
      <div className="page-container">
        <div className="summary">
          <div className="elevator-pitch">
            <div
              className="index-pitch"
              dangerouslySetInnerHTML={{ __html: index_pitch }}
            />
            <div className="direct-contact-section">
              <div className="contact-icons">
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
                <div className="github-button">
                  <GitHubButton
                    href="https://github.com/fcomir-io"
                    data-size="large"
                    data-show-count="false"
                  >
                    Follow @fcomir-io
                  </GitHubButton>
                </div>
              </div>
              <div className="subscribe-button">
                <Link to="/subscribe" activeClassName="active">
                  <FaRegNewspaper size={22} className="react-icons" /> Join the
                  Newsletter
                </Link>
              </div>
            </div>
          </div>
          <div className="home-image">
            <img src={fran} alt="Francisco" />
          </div>
        </div>
        <div className="experience">
          <h2> Experience </h2>
          <ExperienceBlock />
        </div>
        <div className="articles">
          <section className="section">
            <h2>
              Latest Posts
              <Link to="/blog" className="view-all">
                View all
              </Link>
            </h2>
            <PostListing postEdges={posts} />
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
