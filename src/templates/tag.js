// React libraries
import React, { Component } from "react";
import { Helmet } from "react-helmet";
// Components from Gatsby library
import { Link, graphql } from "gatsby";
// Internal applicaiton data
import config from "../../data/siteConfig";
// Components
import PageLayout from "../pageLayout/pageLayout";
import PostListing from "../components/PostListing/postListing";
// Styles
import "../styles/templates/tag.scss";

export default class TagTemplate extends Component {
  render() {
    console.log("Props", this.props);

    const { tag } = this.props.pageContext;
    const postEdges = this.props.data.allMdx.edges;

    const counter = postEdges.length;
    let foundTextToShow = "";
    if (counter < 2) {
      foundTextToShow = "post found!";
    } else {
      foundTextToShow = "posts found!";
    }
    console.log("counter", counter);

    return (
      <PageLayout>
        <Helmet title={`Posts tagged as "${tag}" – ${config.siteTitle}`} />
        <div className="page-container">
          <h1 className="page-title">Articles</h1>
          <div className="tag-container">
            <h1>
              Posts tagged as:{" "}
              <u className="tag">
                <strong>{tag}</strong>
              </u>
            </h1>
            <h3>
              <u className="counter">{counter}</u> {foundTextToShow}
            </h3>
            <Link to="/blog" className="view-all">
              Show all
            </Link>
            <PostListing postEdges={postEdges} />
          </div>
        </div>
      </PageLayout>
    );
  }
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMdx(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
              }
            }
          }
          slug          
        }
      }
    }
  }
`;
