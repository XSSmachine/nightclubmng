import React from 'react'
import './footer.css'
import Logo from '../../assets/logo_down.png'
const Footer = () => (
  <div className="club__footer section__padding">
    <div className="club__footer-heading">
      <h1 className="gradient__text">Do you want to step in to the club before others</h1>
    </div>

    <div className="club__footer-btn">
      <p>Request VIP Membership</p>
    </div>

    <div className="club__footer-links">
      <div className="club__footer-links_logo">
        <img src={Logo} alt="gpt3_logo" />
        {/*<p>2023 MyClub Lounge.  <br /> All Rights Reserved</p>*/}
      </div>
      <div className="club__footer-links_div">
        <h4>Links</h4>
        <p>Social Media</p>
        <p>Events</p>
        <p>Contact</p>
      </div>
      <div className="club__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="club__footer-links_div">
        <h4>Get in touch</h4>
        <p>Ulica velikana 14, Zadar</p>
        <p>023-456-567</p>
        <p>my@club.com</p>
      </div>
    </div>

    <div className="club__footer-copyright">
      <p>@2023 MYCLUB LOUNGE.  ALL RIGHTS RESERVED.</p>
    </div>
  </div>
);
export default Footer
