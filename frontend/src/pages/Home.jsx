import React from 'react'
import {Brand, CTA, Navbar} from "../components";
import {Blog, Features, Footer, Header, Possibility, WhatNIGHTCLUB} from "../containers";

const Home = () => {
    return (
        <div className="App">

                <div className="gradient__bg">
                {/*<Navbar />*/}
                <Header />
            </div>

            <Brand />
            <WhatNIGHTCLUB />
            <Features />
            <Possibility />
            <CTA />
            <Blog />
            <Footer />


        </div>
    )
}
export default Home
