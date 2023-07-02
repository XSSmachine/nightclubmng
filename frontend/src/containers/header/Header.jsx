import React from 'react'
import video from '../../assets/video-2.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Container} from 'react-bootstrap';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import snapchat from '../../assets/snapchat.svg';
import './header.css'

const Header = () => {
    return (
        <div>
            <Container>
            <div className="video-container">
      <video src={video} autoPlay loop muted />
                <div className="jumbo_bottom">
                    <div className="social_icons_jumbo">
                        <div className="everythingOnOneLine">
                <a href="https://facebook.com">
                    <img src={facebook}/>
                </a>
                <a href="https://instagram.com">
                    <img src={instagram}/>
                </a>
                <a href="https://snapchat.com">
                    <img src={snapchat}/>
                </a>
                            </div>
                        </div>
                    </div>
    </div>
                </Container>
        </div>
    )
}
export default Header
