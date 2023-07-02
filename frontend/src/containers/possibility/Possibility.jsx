import React from 'react'
import './possibility.css'
import {vodka, chivas, beer, jack, jim} from './imports'
const Possibility = () => {
    return (
        <div className='nightclub__brand section__padding'>
            <div>
                <img src={vodka} alt="vodka" />
            </div>
            <div>
                <img src={chivas} alt="chivas" />
            </div>
            <div>
                <img src={beer} alt="beer" />
            </div>
            <div>
                <img src={jack} alt="jack" />
            </div>

        </div>
    )
}
export default Possibility
