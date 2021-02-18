// React libraries
import React from "react";
// Components from Gatsby library
import { Link } from "gatsby";
// Context for Dark/Light Theme
import ThemeContext from "../../context/ThemeContext";
// CSS
import styles_variables from "./navigation.scss";
// Images
import banner from "../../images/banner.jpg";
import favicon from "../../images/favicon.png";
import sun from "../../images/sun.svg";
import moon from "../../images/moon.svg";

class Navigation extends React.Component {
  static contextType = ThemeContext;

  state = {
    scrolled: false,
    lastScrollPos: 0,
    scrollDirection: "up",
  };

  componentDidMount() {
    window.addEventListener("scroll", this.navOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.navOnScroll);
  }

  navOnScroll = () => {
    const scrollDirection = this.state.scrollDirection;

    /** For DEBUG purposes
    console.log(
      "Direction: ",
      scrollDirection,
      " - ScrollY: ",
      window.scrollY,
      " - Last: ",
      this.state.lastScrollPos
    )
    */

    // Check scroll direction
    if (window.scrollY > this.state.lastScrollPos) {
      this.setState({ scrollDirection: "up" });
    } else {
      this.setState({ scrollDirection: "down" });
    }

    // Scrolling up ==> scrolled is true when image disappears
    if (scrollDirection === "up") {
      if (window.scrollY > styles_variables.scrollThreshold_Up) {
        this.setState({ scrolled: true });
      } else {
        this.setState({ scrolled: false });
      }
    }
    // Scrolling down ==> scrolled is false when image appears completely
    else if (scrollDirection === "down") {
      if (window.scrollY < styles_variables.scrollThreshold_Down) {
        this.setState({ scrolled: false });
      } else {
        this.setState({ scrolled: true });
      }
    }

    // Update last position of scroll Y
    this.setState({ lastScrollPos: window.scrollY });
  };

  render() {
    const { scrolled } = this.state;
    const { menuLinks } = this.props;
    const theme = this.context;

    return (
      <>
        <div className={theme.dark ? "dark" : ""}>
          <div className={scrolled ? "nav scroll" : "nav"}>
            <div className="nav-container">
              <div className="presentation-card">
                <Link to="/">
                  <img
                    src={favicon}
                    className="favicon"
                    alt="I don't know what"
                  />
                </Link>
                <Link to="/">
                  <div className="brand">
                    <span className="text">Francisco Mir</span>
                    
                  <p className="motto">LET'S BUILD SOMETHING TOGETHER...</p>
                  </div>
                </Link>
              </div>
              <div className="menu-links">
                {menuLinks.map((link) => (
                  <Link key={link.name} to={link.link} activeClassName="active">
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="theme-switcher">
                <button
                  className="dark-switcher"
                  onClick={theme.toggleDark}
                  aria-label="Toggle Dark Mode."
                  title="Toggle Dark Mode"
                >
                  {theme.dark ? (
                    <img src={sun} className="theme-icon" alt="Light Mode" />
                  ) : (
                    <img src={moon} className="theme-icon" alt="Dark Mode" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="banner">
            <img src={banner} alt="Areas of Expertise" />
          </div>
        </div>
      </>
    );
  }
}

export default Navigation;
