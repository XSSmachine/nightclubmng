import React from 'react'
import './blog.css'
import pic from '../../assets/girl2.jpg';
import { Image } from '../../components/Image';


const Blog = () => {
    return (
         <section className="">






      <Image src={pic} alt="Camera Background" height="120vh" speed={-1} clamp>
        <p id="text">This club continues to hold the symbol of nightlife in Zadar.
            Located in the very heart of the city, the main hall boasts the strongest sound system in this part of Europe with a
            combination of world-renowned DJs providing an unforgettable moment.</p>
      </Image>


    </section>
    )
}
export default Blog
