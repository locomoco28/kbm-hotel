import React from 'react'

export default function Index() {
    const resp = {data: [
        // EG
        [
        {roomNo: 1, occupied: false},
        {roomNo: 2, occupied: false},
        {roomNo: 3, occupied: false},
        ],
        // Etage 1
        [
        {roomNo: 101, occupied: true},
        {roomNo: 102, occupied: true},
        {roomNo: 103, occupied: false},
        ],
        // Etage 2
        [
        {roomNo: 201, occupied: false},
        {roomNo: 202, occupied: false},
        {roomNo: 203, occupied: false},
        ]
    ]}
    
    return <>
    <div style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        background: "#888",
        gap: "1rem"
    }}>
      <div style={{
        diplay: "flex",
        flexFlow: "column nowrap",
        background: "#333"
      }}><h2>EG</h2>
      <div style={{
        width:"100%",
        display:"flex",
        flexFlow:"row wrap",
        alignItems:"space-evenly",
        gap: "1rem",
        padding: "1rem"
      }}>
      </div>
      </div>
    </div>

    
    </>
}

function to3DigitStr(num) {
    return ("000" + num).slice(-3)
}