/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

 // Site Data
const config = require("./data/siteConfig");
// Ressources
const urljoin = require("url-join");

const siteMetadata = {
  title: config.siteTitle,
  description: config.siteDescription,
  author: "Francisco Mir",  
  siteUrl: urljoin(config.siteUrl, config.pathPrefix),    
  feedUrl: "https://www.franciscomir.io/rss.xml",
  logo: "https://www.franciscomir.io/logo.png",
  rssMetadata: {
    site_url: urljoin(config.siteUrl, config.pathPrefix),
    feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
    title: config.siteTitle,
    description: config.siteDescription,
    image_url: `${urljoin(
      config.siteUrl,
      config.pathPrefix
    )}/logos/logo-48.png`,
  },
}

module.exports = {

  pathPrefix: config.pathPrefix === "" ? "/" : config.pathPrefix,
  siteMetadata: siteMetadata,

  /* Your site config here */
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    /** Provides drop-in support for SASS/SCSS stylesheets */
    `gatsby-plugin-sass`,

    /** Plugin for utilizing the Typography library with minimal configuration
     *  https://kyleamathews.github.io/typography.js/
     */
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },

    /** Plugin to load content from filesystem
     *  - images in /content
     *  https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "images",
        path: `${__dirname}/content/images`,
      },
    },

    /** Plugin to load content from filesystem
     *  - images in /content
     *  https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "assets",
        path: `${__dirname}/content/assets`,
      },
    },

    /** Plugin to load content from filesystem
     *  - posts in /content
     *  https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "posts",
        path: `${__dirname}/content/posts`,
      },
    },

    /** Image processing functions built on the Sharp image processing library */
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },

    /** A Gatsby plugin for styled-components with built-in server-side rendering support.
     * https://www.gatsbyjs.com/plugins/gatsby-plugin-styled-components/?=styled
     */
    `gatsby-plugin-styled-components`,

    /** Exposes several image processing functions built on the Sharp image processing library
     * https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/?= */
    "gatsby-plugin-sharp",

    /** Creates ImageSharp nodes from image types that are supported by the Sharp image processing library
     * https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/?= */
    `gatsby-transformer-sharp`,

    /** Plugin to parse Markdown files
     * https://www.gatsbyjs.org/packages/gatsby-transformer-remark/?=remark
     */
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          /** Plugin to convert image src(s) in markdown to be relative to their node’s parent directory
           * https://www.gatsbyjs.org/packages/gatsby-remark-relative-images/?=gatsby-remark-relative-images
           */
          "gatsby-remark-relative-images",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    /** Plugin to embed a Youtube Video in your Markdown
     * https://www.gatsbyjs.org/packages/gatsby-remark-embed-video/?=gatsby-remark-embed-video
     */
    {
      resolve: "gatsby-remark-embed-video",
      options: {
        width: 800,
        ratio: 1.77,
        height: 400,
        related: false,
        noIframeBorder: true,
      },
    },
    "gatsby-remark-responsive-iframe",

    /** Plugin to  subscribe new email addresses to a Mailchimp email list.
     * https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/
     */
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.GATSBY_MAILCHIMP_URL,
      },
    },
    /** Plugin to manage RSS feed.
     * https://www.gatsbyjs.org/docs/adding-an-rss-feed/
     */

    {
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref) {
          const ret = ref.query.site.siteMetadata.rssMetadata;
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = "Francisco Mir";
          return ret;
        },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const { rssMetadata } = ctx.query.site.siteMetadata;
              return ctx.query.allMdx.edges.map((edge) => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.date,
                last_modified: edge.node.frontmatter.last_modified,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                url: rssMetadata.site_url + edge.node.slug,
                guid: rssMetadata.site_url + edge.node.slug,
                custom_elements: [
                  { "content:encoded": edge.node.html },
                  { author: config.userEmail },
                ],
              }));
            },
            query: `
            {
              allMdx(
                limit: 1000,
                sort: {
                  order: [DESC, DESC]
                  fields: [frontmatter___last_modified, frontmatter___date]
                }                
              ) {
                edges {
                  node {
                    excerpt(pruneLength: 180)
                    html
                    timeToRead
                    slug
                    frontmatter {
                      title
                      date(formatString: "DD-MMMM-YYYY")
                      last_modified(formatString: "DD-MMMM-YYYY")
                      tags
                      category                      
                    }
                  }
                }
              }
            }
          `,
            output: config.siteRss,
            title: "Francisco Mir - RSS Feed",
          },
        ],
      },
    },

    /** Plugin to integrate Markdown with JSX
     * https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=mdx
     */
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 1035,
            sizeByPixelDensity: true,
            showCaptions: true,
            linkImagesToOriginal: false,
          },
        },
      ],
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 540,
          },
        },
      ],
    },
    /** Gatsby plugin to add google analytics, google tag manager and facebook pixel in a GDPR form to your site.
     *  https://www.gatsbyjs.com/plugins/gatsby-plugin-gdpr-cookies/ */
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: "", // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-analytics", // here can you change the cookie name
          anonymize: true, // default
        },
        googleTagManager: {
          trackingId: "", // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-tagmanager", // // here can you change the cookie name
          dataLayerName: "dataLayer", // default
        },
        facebookPixel: {
          pixelId: "", // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-facebook-pixel", // // here can you change the cookie name
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
      },
    },
  ],
};
