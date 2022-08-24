import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'

import './center.css'
export default function Centers() {
    const { centers } = useGlobalContext();

    return (
        <div>
            {centers && centers.map(el => <div className='center' style={{
                backgroundColor: el.color,
                left: `${el.x}px`,
                top: `${el.y}px`,
            }} key={Math.random()} >+</div>)}
        </div>
    )
}
