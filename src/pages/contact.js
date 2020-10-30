// React libraries
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
// Gabtsby Components libraries
import { Link } from "gatsby";
// 3rd party components
import emailjs from "emailjs-com";
import { PopupboxManager, PopupboxContainer } from "react-popupbox";
// Internal application data
import config from "../../data/siteConfig";
// Components
import PageLayout from "../pageLayout/pageLayout";
// Styles
import "../styles/pages/contact.scss";
import "../styles/pages/popup.scss";

function ContactPage() {
  /** Contact Form */
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const [checkBox, setCheckBox] = useState(false);

  /** Manage focus on components */
  const emailInput = useRef(null);
  useEffect(() => {
    // current property is refered to input element
    emailInput.current.focus();
  }, []);

  /** Handle change on Email input component */
  function handleOnEmailChange(event) {
    setEmail(event.target.value);
  }

  /** Handle change on Name input component */
  function handleOnNameChange(event) {
    setName(event.target.value);
  }

  /** Handle change on Subject input component */
  function handleOnSubjectChange(event) {
    setSubject(event.target.value);
  }

  /** Handle change on Message text component */
  function handleOnMessageChange(event) {
    setMessage(event.target.value);
  }

  /** Handle change on Checkbox component for Privacy Policy */
  function handleOnCheckBoxChange(event) {
    setCheckBox(!checkBox);
  }

  /** Handle click on button component
   *  - async function to wait for emailjs.send() to continue
   */
  async function handleOnSubmitClick(event) {
    event.preventDefault();

    /** Check if Cehckbox was checked */
    if (!checkBox) {
      // Popup
      /** Message was properly sent */
      openPopupbox(`
        <p>Please confirm that you read the Privacy and Cookies Policy!</p>
      `);
    }
    else {

      // Privacy Policy was checked 

      /** The mandatory inputs (Email and Message)  are controlled by the component itself
       *  since the property 'required' was added */
  
      /** Check if email is correct */
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        /** Email is correct ==> Proceed with sending the email */
        const result = await sendContactInformation(
          email,
          name,
          subject,
          message
        );
  
        /** Once result is available, we proceed... */
  
        if (result) {
          /** Message was properly sent */
          resetSubmitForm();
          openPopupbox(`
            <p>Message Sent!</p>
            <p>I'll come to you as soon as possible</p>
            <p>You will be redirected to my home page :-)</p>
          `);
  
          /** After 2 seconds redirect to home */
          setTimeout(() => {
            window.location = "/";
          }, 2000);
          return true;
        } else {
          /** Contact message could not be sent  */
          openPopupbox(`
            <p>Ups... Message failed to be sent !</p>
            <p>Could you please try it again? </p>
          `);
          return false;
        }
      } else {
        openPopupbox(`
          <p>You have entered an invalid email address!</p>
          <p>Please check it and try again...</p>
          `);
        return false;
      }
    }
  }

  /** Send email with contact information */
  async function sendContactInformation(email, name, subject, message) {
    const template_params = {
      email: email,
      name: name,
      subject: subject,
      message: message,
    };
    const service_id = process.env.GATSBY_EMAILJS_SERVICE_ID;
    const template_id = process.env.GATSBY_EMAILJS_TEMPLATE_ID;

    return emailjs
      .send(
        service_id,
        template_id,
        template_params,
        process.env.GATSBY_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          //console.log("OK")
          return true;
        },
        (error) => {
          //console.log(error.text)
          return false;
        }
      );
  }

  /** Clear form inputs */
  function resetSubmitForm() {
    setEmail("");
    setName("");
    setSubject("");
    setMessage("");
    setCheckBox(false);

    /** After OK de la alerta, redirigir a Home */
  }

  /** Handle show/hide Popup window */
  function openPopupbox(message) {
    const content = (
      <div
        className="popup-message"
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>
    );
    PopupboxManager.open({
      content,
      config: {
        titleBar: {
          enable: true,
          text: "Contact Form",
        },
        fadeIn: true,
        fadeInSpeed: 100,
      },
    });
  }

  return (
    <PageLayout>
      <Helmet title={`Contact me - ${config.siteTitle}`} />
      <div className="page-container">
        <h1 className="page-title"></h1>
        <div className="contact-form">
          <p> Hello there 👋 </p>
          <p>
            Please don’t hesitate to reach out with the contact information
            below, or send a message using the form.
          </p>
          <p>
            I would love to write you back and see how we can build something
            together.
          </p>
          <div class="indicates-required">
            <strong className="input-required">*</strong> indicates required
          </div>
          <form onSubmit={handleOnSubmitClick} method="POST">
            <div className="contact-form-input">
              <h3>
                Email <strong className="input-required">*</strong>
              </h3>
              <input
                className="only-lower-case"
                type="email"
                name="form_Email"
                placeholder="Your Email address"
                value={email}
                ref={emailInput}
                onChange={handleOnEmailChange}
                autoCapitalize="off"
                autoCorrect="off"
                required
              />
            </div>
            <div className="contact-form-input">
              <h3> Your Name </h3>
              <input
                type="text"
                name="form_Name"
                placeholder="Your Name"
                value={name}
                onChange={handleOnNameChange}
              />
            </div>
            <div className="contact-form-input">
              <h3> Subject </h3>
              <input
                type="text"
                name="form_Subject"
                placeholder="What is it about?"
                value={subject}
                onChange={handleOnSubjectChange}
              />
            </div>
            <div className="contact-form-input">
              <h3>
                Message <strong className="input-required">*</strong>
              </h3>
              <textarea
                name="form_Message"
                rows="7"
                placeholder="Tell me what can we build together... "
                value={message}
                onChange={handleOnMessageChange}
                required
              ></textarea>
            </div>
            <div className="privacy-policy-checkbox">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  checked={checkBox}
                  onChange={handleOnCheckBoxChange}
                  className="form-check-input"
                />
              I have read the <Link className="privacy-policy" to="/privacyPolicy">Privacy and Cookies Policy</Link>
              <strong className="input-required">*</strong>
              </label>
            </div>
            <div className="container-submit-button">
              <button className="submit-button" type="submit">
                Send
              </button>
            </div>
          </form>
          <PopupboxContainer />
        </div>
      </div>
    </PageLayout>
  );
}

export default ContactPage;
