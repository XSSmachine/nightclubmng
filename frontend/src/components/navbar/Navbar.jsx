import React, {useEffect, useState} from 'react';
import { RiMenu3Line, RiCloseLine} from "react-icons/ri";
import logo from '../../assets/logo.png'
import './navbar.css';

const Menu = () => (
    <>
        <p><a href="/">MAIN</a></p>
          <p><a href="suites">VIP SUITES</a></p>
          <p><a href="Event">EVENTS</a></p>
          <p><a href="About">ABOUT</a></p>
          {/*<p><a href="#blog">Library</a></p>*/}
    </>
)

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
     const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 200; // Adjust this value to change when the navbar becomes sticky

      setIsSticky(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    return (
    <div className={`nightclub__navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="nightclub__navbar-links">
        <div className="nightclub__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="nightclub__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="nightclub__navbar-sign">
        <p><a href="login">Login</a></p>
        <button type="button"><a href="signup">Become VIP</a></button>
      </div>
      <div className="nightclub__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <div className="nightclub__navbar-menu_container scale-up-center">
            <div className="nightclub__navbar-menu_container-links">
              <Menu />
            </div>
            <div className="nightclub__navbar-menu_container-links-sign">
              <p>Get IN</p>
              <button type="button">Become VIP</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar
