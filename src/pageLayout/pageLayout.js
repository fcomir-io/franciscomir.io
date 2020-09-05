// React libraries
import React, { useContext } from "react"
import { Helmet } from "react-helmet"
// Context for Dark/Light Theme
import ThemeContext from "../context/ThemeContext"
// Internal applicaiton data
import config from "../../data/siteConfig"
// Components
import Navigation from "../components/Navigation/navigation"
import Footer from "../components/Footer/footer"
// CSS
import "./pageLayout.scss"
// Images
import favicon from "../images/favicon.png"

export default function PageLayout(props) {
  const { dark } = useContext(ThemeContext)
  const { children } = props
  let themeClass = ""

  /** Get Theme from context */
  if (dark) {
    themeClass = "dark"
  }

  return (
    <>
      <Helmet
        bodyAttributes={{
          class: `${themeClass}`,
        }}
      >
        <meta name="description" content={config.siteDescription} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>
      <Navigation menuLinks={config.menuLinks} />
      <div className={dark ? "dark" : ""}>
        <main id="main-content">{children}</main>
      </div>
      <Footer />
    </>
  )
}
