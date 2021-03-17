// React libraries
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
// Components from Gatsby library
import { Link, graphql, useStaticQuery } from "gatsby";
// Internal applicaiton data
import config from "../../data/siteConfig";
// Components
import PageLayout from "../pageLayout/pageLayout";
import PostListing from "../components/PostListing/postListing";
// CSS
import "../styles/pages/blog.scss";

function BlogPage(props) {
  console.log("Props", props);
  /** Query to get list of available posts */
  const allPostEdges_Query = useStaticQuery(graphql`
    query {
      allMdx(
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
              tags
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
  
  console.log("allPostEdges_Query", allPostEdges_Query)

  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState(allPostEdges_Query.allMdx.edges);
  const [filteredPosts, setFilteredPosts] = useState(allPostEdges_Query.allMdx.edges);
  const filterCount = filteredPosts.length;
  const allPostTags = preparePostTags();

  console.log("posts", posts);

  function handleChange(event) {
    const { name, value } = event.target;
    // Update search term
    setSearchTerm(value);
    // Filter posts accordingly
    filterPosts();

    // Check if search is empty
    if (value === "") {
      setFilteredPosts(posts);
    }

    console.log("name", name)
    console.log("value", value)
  }

  function filterPosts() {
    const result = posts.filter((post) =>
      post.node.frontmatter.title
        .toLowerCase()
        .includes(searchTerm)
    );

    console.log("result", result)

    // Update posts to list
    setFilteredPosts(result);
  }

  function preparePostTags() {
    let allTags = [];
    posts.map((edge) => {
      const postTags = edge.node.frontmatter.tags;
      postTags.forEach((tag) => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });

    return allTags;
  }

  return (
    <PageLayout>
      <Helmet title={`Articles - ${config.siteTitle}`} />
      <div className="page-container">
        <h1 className="page-title">Blog</h1>
        <div className="articles-header">
          <p>Articles, guides, experiences, and more..</p>
          <div className="category-container">
            {allPostTags.map((tag) => {
              return (
                <Link
                  to={`/tags/${tag}`}
                  className="category-filter"
                  key={tag}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
          <div className="search-container">
            <input
              className="search"
              type="text"
              name="searchTerm"
              value={searchTerm}
              placeholder="Search all posts..."
              onChange={handleChange}
              autocomplete="off"
            />
          </div>
        </div>
        {filteredPosts.length === 0 ? (
          <div className="nothing-found">Sorry... No results found!!! </div>
        ) : (
          <PostListing postEdges={filteredPosts} />
        )}
      </div>
    </PageLayout>
  );
}

export default BlogPage;

/**
 
query {
      posts: allMarkdownRemark(
        sort: {
          order: [DESC, DESC]
          fields: [frontmatter___last_modified, frontmatter___date]
        }
      ) {
        edges {
          node {
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
                  original {
                    src
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
      }
    }
  
 */
