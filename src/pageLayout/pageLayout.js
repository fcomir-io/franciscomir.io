// React libraries
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
// Gabtsby Components libraries
import { Link } from "gatsby";
// Context for Dark/Light Theme
import ThemeContext from "../context/ThemeContext";
// Internal applicaiton data
import config from "../../data/siteConfig";
// Components
import Navigation from "../components/Navigation/navigation";
import Footer from "../components/Footer/footer";
// CSS
import "./pageLayout.scss";
// Images
import favicon from "../images/favicon.png";
// GDPR Management
import CookieConsent from "react-cookie-consent";

export default function PageLayout(props) {
  const { dark } = useContext(ThemeContext);
  const { children } = props;
  let themeClass = "";

  /** Get Theme from context */
  if (dark) {
    themeClass = "dark";
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
      <CookieConsent
        location="bottom"
        disableStyles={true}
        hideOnAccept={true}
        buttonText="Accept"
        cookieName="franciscomir-gdpr"
        expires={90}
        buttonClasses="gdpr-btn-class"
        contentClasses="gdpr-content-class"
        containerClasses="gdpr-container-class"
      >
        This website uses cookies to enhance the user experience.{" "}
        <br/>
        <span style={{ fontSize: "14px" }}>{" "} For more information go to {" "} <Link className="privacy-policy" to="/privacyPolicy">{" "} Privacy and Cookies Policy</Link></span>
      </CookieConsent>
    </>
  );
}
