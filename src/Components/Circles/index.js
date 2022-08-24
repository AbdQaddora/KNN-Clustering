import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext';
import Circle from './Circle';

export default function Circles() {
    const { circles, RADIUS } = useGlobalContext();
    return (
        <div>
            {circles.map(el => <Circle x={el.x} y={el.y} radius={RADIUS} key={`${el.x}-${el.y}`} color={el.color} />)}
        </div>
    )
}
