import React from 'react'
import './whatNIGHTCLUB.css'
import {logo6,logo7} from './imports'
const WhatNightclub = () => {
    return (

        <div className="main_suitewrap">
        <div className="row">
            <div className="col-md-12 padding-zero grow_before">
                <div className="position-top">
                <div className=""><a href="Event">
                    <div className="overlay_container">
                        <div className="logo4 eventanimation ophidden visible animated fadeInUp full-visible">
                            <img src={logo6} width="375" height="164"
                                 className="eachlogo" alt="Fridays"/></div>
                        <div className="">
                            <div className="info_button">FRI | 10:00PM - 2:30AM</div>
                        </div>
                    </div>
                </a></div>
            </div>
            </div>
            <div className="col-md-12 padding-zero grow_before">
                <div className="position-top">
                <div className=""><a href="Event">
                    <div className="overlay_container">
                        <div className="logo5 eventanimation ophidden visible animated fadeInUp full-visible">
                            <img src={logo7} width="375" height="164"
                                 className="eachlogo" alt="Saturdays"/></div>
                        <div className="">
                            <div className="info_button">SAT | 10:00PM - 2:30AM</div>
                        </div>
                    </div>
                </a></div>
            </div>
        </div>

    </div>
            </div>
    )
}
export default WhatNightclub
