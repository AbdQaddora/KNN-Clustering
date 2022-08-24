import React from 'react'

export default function Circle({ color, x, y, radius }) {
    return (
        <div style={{
            height: `${radius}px`,
            width: `${radius}px`,
            borderRadius: "50%",
            border: "1px solid #000",
            backgroundColor: color,
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
        }}></div>
    )
}
