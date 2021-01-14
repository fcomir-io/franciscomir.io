// React libraries
import React from "react";
import { Helmet } from "react-helmet";
// Components from Gatsby library
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
// Internal application data
import config from "../../data/siteConfig";
// Components
import PageLayout from "../pageLayout/pageLayout";
import PostTags from "../components/PostTags/postTags";
import UserInfo from "../components/UserInfo/userInfo";
// Styles
import styled from "styled-components";
import "../styles/templates/post.scss";
// Images
import fran from "../../content/images/fran_2019_crop.jpg";

const Image = styled(Img)`
  border-radius: 5px;
  max-width: 300px;  
`;

export const article_Query = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      frontmatter {
        title
        date(formatString: "DD-MMMM-YYYY")
        last_modified(formatString: "DD-MMMM-YYYY")
        tags
        category
        thumbnail {
          childImageSharp {
            fixed(width: 175, height: 175) {
              ...GatsbyImageSharpFixed
            }
            sizes(maxWidth: 2000, traceSVG: { color: "#639" }) {
              ...GatsbyImageSharpSizes_tracedSVG
            }
          }
        }
      }
      body
    }
  }
`;

export default ({ data, pageContext }) => {
  const { frontmatter, body } = data.mdx;

  let article = data.mdx;
  console.log(article);
  let thumbnail;
  if (article.frontmatter.thumbnail) {
    thumbnail = article.frontmatter.thumbnail.childImageSharp.fixed;
  }

  const twitterShare = `http://twitter.com/share?text=${article.frontmatter.title}&url=${config.siteUrl}/${article.slug}/&via=fco.mirv`;

  return (
    <PageLayout>
      <Helmet title={`Blog - ${config.siteTitle}`} />
      <div className="page-container">
        <div className="post-header">
          <div className="post-header-info">
            <div className="post-title">
              <h1>{article.frontmatter.title}</h1>
            </div>
            <div className="post-meta">
              <Link to="/me">
                <img src={fran} className="avatar-small" alt="Francisco Mir" />
              </Link>
              <time className="date">{article.frontmatter.date}</time>/
              <a
                className="twitter-link"
                href={twitterShare}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share
              </a>
            </div>

            <PostTags tags={article.frontmatter.tags} />
          </div>
          <div className={`${thumbnail ? "with-thumbnail" : ""}`}>
            {thumbnail && <Img fixed={thumbnail} />}
          </div>
        </div>

        <MDXRenderer>{body}</MDXRenderer>
      </div>

      <UserInfo config={config} />
    </PageLayout>
  );
};
