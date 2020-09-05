// React libraries
import React, { useState } from "react"
import { Helmet } from "react-helmet"
// 3rd party libraries
import moment from "moment"
import addToMailchimp from "gatsby-plugin-mailchimp"
/** http://fraina.github.io/react-popupbox/ */
import { PopupboxManager, PopupboxContainer } from "react-popupbox"
// Internal application data
import config from "../../data/siteConfig"
// Components
import PageLayout from "../pageLayout/pageLayout"
import Collapsible from "../components/Collapsible/collapsible"
// Styles
import "../styles/pages/subscribe.scss"

function SubscribePage() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [birthMonth, setBirthMonth] = useState()
  const [birthDay, setBirthDay] = useState()

  /** Handle click on button component */
  function handleOnSubmitClick(event) {
    event.preventDefault()

    /** Prepare optional data */
    let listFields = {}
    console.log("listFields", listFields)

    /** Check fields */

    // First Name
    if (typeof firstName != "undefined") {
      listFields = {
        ...listFields,
        FNAME: firstName,
      }
    }

    // Last Name
    if (typeof lastName != "undefined") {
      listFields = {
        ...listFields,
        LNAME: lastName,
      }
    }

    // Birthday
    const dateToCheck = moment(`${birthMonth}-${birthDay}`)
    console.log("birthMonth", birthMonth)
    console.log("birthDay", birthDay)
    console.log("DateToCheck", dateToCheck)
    if (
      typeof birthMonth != "undefined" &&
      typeof birthDay != "undefined" &&
      birthMonth != " " &&
      birthDay != " " &&
      birthMonth != "" &&
      birthDay != ""
    ) {
      /** There is date to check */
      if (dateToCheck.isValid()) {
        /** Birthday is valid, proceed... */
        listFields = {
          ...listFields,
          /** Mailchimp expects the data MM/DD - Warum auch immer! */
          BIRTHDAY: `${birthMonth}/${birthDay}`,
        }
      } else {
        /** Birthday is incorrect */
        openPopupbox(`
          <p>Ups... Birthday appears to be invalid</p>
          <p>Could you please check it? </p>
        `)
        return false
      }
    }
    console.log("listFields", listFields)

    /** Use mailchimp plugin */
    addToMailchimp(email, listFields) // listFields are optional if you are only capturing the email address.
      .then(data => {
        // I recommend setting data to React state
        // but you can do whatever you want (including ignoring this `then()` altogether)
        console.log("Message from Mailchimp: ", data)
        console.log("Message from Mailchimp: ", data.msg)
        /** Pop up window to show message */

        if (data.result == "success") {
          /** Subscription was successful */
          openPopupbox(
            "<p>" +
              data.msg +
              "</p>" +
              "<p>You will be redirected to my home page :-)</p>"
          )
          /** After 2 seconds redirect to home */
          setTimeout(() => {
            window.location = "/"
          }, 3000)
        } else {
          /** Display error message from mailchimp */
          openPopupbox(data.msg)
        }
      })
      .catch(e => {
        // unnecessary because Mailchimp only ever
        // returns a 200 status code
        // see below for how to handle errors
      })
  }

  /** Handle show/hide Popup window */
  function openPopupbox(message) {
    const content = (
      <div
        className="popup-message"
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>
    )
    PopupboxManager.open({
      content,
      config: {
        titleBar: {
          enable: true,
          text: "Subscription Form",
        },
        fadeIn: true,
        fadeInSpeed: 100,
      },
    })
  }

  return (
    <PageLayout>
      <Helmet title={`Subscribe me - ${config.siteTitle}`} />
      <div className="page-container">
        <h1 className="page-title">Welcome to my newsletter list!</h1>
        <div className="subscribe-form">          
          <form onSubmit={handleOnSubmitClick} method="POST" target="_blank">
            <div className="top-level-fields">
              <div className="required-fields">
                <div class="contact-form-input">
                  <h3>
                    Email<strong className="required-mark">*</strong>
                  </h3>
                  <input
                    className="only-lower-case"
                    type="email"
                    name="form_Email"
                    placeholder="Your Email address"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value)
                    }}
                    autoCapitalize="off"
                    autoCorrect="off"
                    required
                  />
                </div>
                <button className="submit-button" type="submit">
                  Subscribe
                </button>
              </div>
              <div className="optional-fields">
                <Collapsible title="Optional Information">
                  <div className="contact-form-input">
                    <h3> First Name </h3>
                    <input
                      type="text"
                      name="form_First_Name"
                      placeholder="First Name"
                      value={firstName}
                      onChange={e => {
                        setFirstName(e.target.value)
                      }}
                    />
                  </div>
                  <div className="contact-form-input">
                    <h3> Last Name </h3>
                    <input
                      type="text"
                      name="form_Last_Name"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={e => {
                        setLastName(e.target.value)
                      }}
                    />
                  </div>
                  <div class="contact-form-input">
                    <h3> Birthday </h3>
                    <div class="birthday-input-form">
                      <input
                        type="text"
                        pattern="[0-9]*"
                        value={birthDay}
                        placeholder="DD"
                        size="3"
                        maxlength="2"
                        onChange={e => {
                          setBirthDay(e.target.value)
                        }}
                      />
                      <span> / </span>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        value={birthMonth}
                        placeholder="MM"
                        size="3"
                        maxlength="2"
                        onChange={e => {
                          setBirthMonth(e.target.value)
                        }}
                      />
                      <span>[ dd / mm ]</span>
                    </div>
                  </div>
                </Collapsible>
              </div>
              <div class="indicates-required">
                <strong className="required-mark">*</strong> indicates required
              </div>
            </div>
          </form>
          <PopupboxContainer />
        </div>
      </div>
    </PageLayout>
  )
}

export default SubscribePage
