const path = require("path");

/** Creating a slug for each markdown file and adding it into the node */
module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  /** We will work only with our markdown files */
  if (node.internal.type === "MarkdownRemark") {
    /** Extract file name, without extension ==> slug */
    const slug = path.basename(node.fileAbsolutePath, ".mdx");

    //console.log("Slug: ", slug)

    /** Add slug as key-value element of the node */
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

/** Creating a new page for every markdown document */
module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  /**  Get path to template post.js */
  const postTemplate = path.resolve("./src/templates/post.js");
  /**  Get path to template tag.js */
  const tagPage = path.resolve("./src/templates/tag.js");

  /** Get markdown data */
  // Query to get slugs and tags ==> Returns a promise
  const queryResult = await graphql(`
    query {
      allMdx {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              tags
            }
            slug
          }
        }
      }
    }
  `);

  /** graphql returns a promise
   *  After result is available we can process it */

  // Set for all available TAGs
  const tagSet = new Set();

  // Going through the posts
  queryResult.data.allMdx.edges.forEach((edge) => {
    // Update TAGs Set
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    // Create blog pages
    createPage({
      component: postTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        // Information to pass down to the template
        slug: edge.node.slug,
      },
    });
  });

  // Create tag pages
  const tagList = Array.from(tagSet);
  tagList.forEach((tag) => {
    createPage({
      path: `/tags/${tag}/`,
      component: tagPage,
      context: {
        // Information to pass down to the template
        tag: tag,
      },
    });
  });
};
