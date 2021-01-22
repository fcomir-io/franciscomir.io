// React libraries
import React from "react";
import { Helmet } from "react-helmet";
import SEO from "react-seo-component";
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
import { useSiteMetadata } from "../components/SEO/useSiteMetaData";
import Dump from "../components/_debug__Dump/Dump";
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
          publicURL
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
      slug
      excerpt(pruneLength: 150)
      body
    }
  }
`;

export default ({ data, pageContext }) => {
  const { frontmatter, slug, excerpt, body } = data.mdx;

  let article = data.mdx;
  console.log(article);

  let thumbnail;
  if (article.frontmatter.thumbnail) {
    thumbnail = article.frontmatter.thumbnail.childImageSharp.fixed;
  }

  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${config.siteUrl}/blog/${article.slug}?media=${thumbnail}`;

  /** Data for SEO Metadata */
  const {
    author,
    siteUrl,
    logo,
  } = useSiteMetadata().siteMetadata;
  let cover = article.frontmatter.thumbnail;

  return (
    <PageLayout>
      <SEO 
        title={frontmatter.title}
        titleTemplate={config.siteTitle}
        titleSeparator={`-`}
        description={excerpt}
        image={cover === null ? `${siteUrl}/${logo}` : `${siteUrl}${cover.publicURL}`}
        pathname={`${siteUrl}/${slug}`}
        siteLanguage={config.siteLanguage}
        siteLocale={config.siteLocale}
        author={author}
        article={true}
        publishedDate={frontmatter.date}
        modifiedDate={frontmatter.last_modified}
      />
      <Helmet title={`Blog - ${config.siteTitle}`} />
      <div className="page-container">
        <div className="post-header">
          <div className="post-header-info">
            <div className="post-title">
              <h1>{article.frontmatter.title}</h1>
            </div>
            <div className="post-meta">
              <Link to="/about">
                <img src={fran} className="avatar-small" alt="Francisco Mir" />
              </Link>
              <time className="date">{article.frontmatter.date}</time>

              <a
                className="linkedIn-link"
                //href={linkedInShare}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share on LinkedIn
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
