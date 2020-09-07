// React libraries
import React from "react"
import { Helmet } from "react-helmet"
// Components from Gatsby library
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
// Internal application data
import config from "../../data/siteConfig"
// Components
import PageLayout from "../pageLayout/pageLayout"
import PostTags from "../components/PostTags/postTags"
import UserInfo from '../components/UserInfo/userInfo'
// Styles
import "../styles/templates/post.scss"
// Images
import fran from "../../content/images/fran_2019_crop.jpg"

export const article_Query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "DD-MMMM-YYYY")
        last_modified(formatString: "DD-MMMM-YYYY")
        tags
        category
        thumbnail {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      fields {
        slug
      }
      timeToRead
      excerpt
      html
    }
  }
`
const Post = props => {
  let article = props.data.markdownRemark
  //console.log(article)
  let thumbnail
  if (article.frontmatter.thumbnail) {
    thumbnail = article.frontmatter.thumbnail.childImageSharp.fixed
  }

  const twitterShare = `http://twitter.com/share?text=${props.data.markdownRemark.frontmatter.title}&url=${config.siteUrl}/${props.data.markdownRemark.fields.slug}/&via=fco.mirv`

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

        <div
          className="post"
          dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
        />
      </div>

      <UserInfo config={config} />
    </PageLayout>
  )
}

export default Post
