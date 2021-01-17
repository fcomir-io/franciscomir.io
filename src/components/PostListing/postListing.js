// React libraries
import React from "react"
// Components from Gatsby library
import { Link } from "gatsby"
import Img from "gatsby-image"
// Other libraries
import moment from "moment"
// CSS
import "./postListing.scss"

export default class PostListing extends React.Component {
  getPostList() {
    const { postEdges } = this.props
    //console.log("postEdges", postEdges)
    const postList = postEdges.map(edge => {
      return {
        path: `/blog/${edge.node.slug}`,
        title: edge.node.frontmatter.title,
        date: edge.node.frontmatter.date,
        last_modified: edge.node.frontmatter.last_modified,
        thumbnail: edge.node.frontmatter.thumbnail,
      }
    })

    return postList
  }

  render() {
    const postList = this.getPostList()

    return (
      <div className="posts">
        {postList.map(post => {
          let thumbnail
          if (post.thumbnail) {
            thumbnail = post.thumbnail.childImageSharp.fixed
            //thumbnail = post.thumbnail.childImageSharp.original
          }

          const newest = moment(post.date) > moment().subtract(1, 'months')
          const modified = moment(post.last_modified) > moment().subtract(2, 'weeks')

          return (
            <Link key={post.title} to={post.path}>
              <div className="each-post">
                <div className="icon-and-title">
                  <div className="post-icon">
                    {thumbnail ? <Img fixed={thumbnail} /> : <div />}
                  </div>
                  <h2>{post.title}</h2>
                </div>
                <div className="post-flags">
                  {newest && <div className="new">New!</div>}
                  {!newest && modified && <div className="modified">Updated!</div>}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}
