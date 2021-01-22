// React libraries
import React from "react";
// Gabtsby Components libraries
import { Link } from "gatsby";
// Context for Dark/Light Theme
import ThemeContext from "../../context/ThemeContext";
// CSS
import "./footer.scss";
// Images
import linkedin from "../../images/linkedin.png";
import netlify from "../../images/netlify.png";
import gatsby from "../../images/gatsby.png";
import github from "../../images/github.png";

export default class Footer extends React.Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    return (
      <>
        <div className={theme.dark ? "dark" : ""}>
          <footer className="footer-container">
            <div className="footer">
              <div className="main-block">
                <div className="footer-links">
                  <Link to="/contact">Contact</Link>
                  <Link to="/subscribe">Subscribe</Link>
                  <a
                    href="https://franciscomir.io/rss.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    RSS
                  </a>
                </div>
                <div className="footer-icons">
                  <a
                    href="https://www.linkedin.com/in/franciscomir/"
                    title="Go to my LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={linkedin}
                      rel="noopener noreferrer"
                      className="footer-img"
                      alt="LinkedIn"
                    />
                  </a>
                  <a
                    href="https://github.com/fcomir-io"
                    title="Open-source on GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={github}
                      rel="noopener noreferrer"
                      className="footer-img"
                      alt="GitHub"
                    />
                  </a>
                  <a
                    href="https://www.netlify.com/"
                    title="Hosted by Netlify"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={netlify}
                      rel="noopener noreferrer"
                      className="footer-img"
                      alt="Netlify"
                    />
                  </a>
                  <a
                    href="https://www.gatsbyjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Built with Gatsby"
                  >
                    <img
                      src={gatsby}
                      rel="noopener noreferrer"
                      className="footer-img"
                      alt="Gatsby"
                    />
                  </a>
                </div>
              </div>
              <div className="aux-block">
                © 2021 Francisco Mir           
                <Link className="privacy-policy" to="/privacyPolicy">Privacy and Cookies Policy</Link>
              </div>
            </div>
          </footer>
        </div>
      </>
    );
  }
}
