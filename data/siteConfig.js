const config = {
  siteTitle: "Francisco Mir",
  siteSlogan: "Let's build something together...",
  siteTitleShort: "FM",
  siteUrl: "https://www.franciscomir.io",
  siteLogo: '/logo.png',
  pathPrefix: '',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'Do MMMM, YYYY',

  siteDescription: siteSlogan,
  siteAuthor: "Francisco Mir",
  publishedDate: 05/02/2021,
  siteRss: '/rss.xml',

  siteLanguage: `en-GB`,
  siteLocale: `en_gb`,
  
  userEmail: 'contact@franciscomir.io',
  
  menuLinks: [
    {
      name: "About",
      link: "/about/",
    },
    {
      name: "Blog",
      link: "/blog/",
    },
    {
      name: "Contact",
      link: "/contact/",
    },
  ],
}

module.exports = config
