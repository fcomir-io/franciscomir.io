import React, { Component } from "react"
//import kebabCase from 'lodash.kebabcase'
// Components from Gatsby library
import { Link } from "gatsby"
// Styles
import "./postTags.scss"

export default class PostTags extends Component {
  render() {
    const { tags, size } = this.props
    
    return (
      <div className="tag-container">
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              style={{ textDecoration: "none" }}
              to={`/tags/${tag}`}
            >
              <span>{tag}</span>
            </Link>
          ))}
      </div>
    )
  }
}
