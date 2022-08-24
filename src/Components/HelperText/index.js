import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'

import './helperText.css';
export default function HelperText() {
    const { helperText } = useGlobalContext();
    return (
        <div className='helperText'>{helperText}</div>
    )
}
