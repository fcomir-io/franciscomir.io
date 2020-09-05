// React libraries
import React, { Component } from "react"
// Components from Gatsby library
import { Link } from "gatsby"
// 3rd party libraries
import { FaRegNewspaper } from "react-icons/fa"
// Styles
import "./userInfo.scss"
// Images
import fran from "../../../content/images/fran_2019_crop.jpg"

export default class UserInfo extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="card-container">
          <div className="info-avatar">
            <img className="avatar" src={fran} alt="Francisco Mir" />
          </div>
          <div className="info-body">
            <p>
              Hi, I’m Francisco Mir, an electronic engineer focused on software
              development and IoT Systems. I write about what I know, about my experiences 
              and what I am interested in, just to help viewers like you.
            </p>
            <p>
              My site has <strong> no ads nor sponsors </strong> and it is just
              meant to be a channel to tell you more about me and my experience.
            </p>
            <p>
              If you find my content useful, please consider subscribing to it.
              I never send spam and it is easy to unsubscribe anytime.
            </p>

            <div className="subscribe-button-container">
              <div className="subscribe-button">
                <Link to="/subscribe" activeClassName="active">
                  <FaRegNewspaper size={22} className="react-icons" /> Join the
                  Newsletter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
