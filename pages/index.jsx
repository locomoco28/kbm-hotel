import React from 'react'

const _res = {
        data: [
            // EG
            [
                {roomNo: 1, occupied: true},
                {roomNo: 2, occupied: true},
                {roomNo: 3, occupied: true},
                {roomNo: 4, occupied: true},
                {roomNo: 5, occupied: true},
                {roomNo: 6, occupied: true},
                {roomNo: 7, occupied: true},
                {roomNo: 8, occupied: true},
                {roomNo: 9, occupied: true},
                {roomNo: 10, occupied: true},
            ],
            // Etage 1
            [
                {roomNo: 101, occupied: false},
                {roomNo: 102, occupied: true},
                {roomNo: 103, occupied: true},
                {roomNo: 104, occupied: true},
                {roomNo: 105, occupied: true},
                {roomNo: 106, occupied: true},
                {roomNo: 107, occupied: true},
                {roomNo: 108, occupied: true},
                {roomNo: 109, occupied: true},
                {roomNo: 110, occupied: true},
            ],
            // Etage 2
            [
                {roomNo: 201, occupied: true},
                {roomNo: 202, occupied: false},
                {roomNo: 203, occupied: true},
                {roomNo: 204, occupied: false},
                {roomNo: 205, occupied: false},
                {roomNo: 206, occupied: true},
                {roomNo: 207, occupied: true},
                {roomNo: 208, occupied: true},
                {roomNo: 209, occupied: true},
                {roomNo: 210, occupied: true},
            ],
            // Etage 2
            [
                {roomNo: 301, occupied: true},
                {roomNo: 302, occupied: false},
                {roomNo: 303, occupied: true},
                {roomNo: 304, occupied: true},
                {roomNo: 305, occupied: true},
                {roomNo: 306, occupied: true},
                {roomNo: 307, occupied: true},
                {roomNo: 308, occupied: true},
                {roomNo: 309, occupied: true},
                {roomNo: 310, occupied: true},
            ],
            // Etage 4
            [
                {roomNo: 401, occupied: true},
                {roomNo: 402, occupied: false},
                {roomNo: 403, occupied: false},
                {roomNo: 404, occupied: false},
                {roomNo: 405, occupied: true},
                {roomNo: 406, occupied: true},
                {roomNo: 407, occupied: true},
                {roomNo: 408, occupied: true},
                {roomNo: 409, occupied: true},
                {roomNo: 410, occupied: true},
            ],
            // Etage 5
            [
                {roomNo: 501, occupied: true},
                {roomNo: 502, occupied: false},
                {roomNo: 503, occupied: true},
                {roomNo: 504, occupied: true},
                {roomNo: 505, occupied: true},
                {roomNo: 506, occupied: false},
                {roomNo: 507, occupied: true},
                {roomNo: 508, occupied: true},
                {roomNo: 509, occupied: true},
                {roomNo: 510, occupied: false},
            ]
        ]
    }

export default function Index() {   
    const res = _res

    return <>
    <div style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        background: "#888",
        gap: "1rem"
    }}> <button style={{ height:"1.5rem"}} onClick={() => {
            console.log(getNextFreeRoom(res.data))
        }}>Automatisch Buchen</button>
      {res.data.map((etage, index) => <div style={{
        diplay: "flex",
        flexFlow: "column nowrap",
        background: "#333",
        padding:"0.5rem"
      }}><h2 style={{color:"white"}}>{index}</h2>
      <div style={{
        width:"100%",
        display:"flex",
        flexFlow:"row wrap",
        alignItems:"space-evenly",
        gap: "1rem",
        padding: "1rem"
      }}>
      {etage.map((zimmer, index) => <div style={{flex: "0 0 15rem",padding:"0.5rem",background: "#DDD", position:"relative",borderRadius: "3px 15px 5px 30px"}}>
        <h3>Zimmer {to3DigitStr(zimmer.roomNo)}</h3>
        <p>{zimmer.occupied ? "Zimmer ist Besetzt" : " Zimmer ist noch Frei"}</p>
        <div style={{width:"2rem", height: "2rem", borderRadius:"50%", position:"absolute", backgroundColor:zimmer.occupied ? "red" : "green", top: "1.5rem", right:"1.5rem"}}> </div>
      </div>)}
      </div>
      </div>)}
    </div>  
    </>
}
function getNextFreeRoom(data){
    let foundInEtage

  return  !data.find((etage) => {
    foundInEtage = etage.find(zimmer => !zimmer.occupied)
    return (typeof foundInEtage != "undefined") 
  }) ? "es wurde kein freies Zimmer gefunden": foundInEtage
}

// function einchecken(data){
//     let foundInEtage

//   return  !data.find((etage) => {
//     foundInEtage = etage.find(zimmer => !zimmer.occupied)
//     return (typeof foundInEtage != "undefined") 
//   }) ? "es wurde kein freies Zimmer gefunden": foundInEtage
// }

// function auschecken(data){
//     let foundInEtage

//   return  !data.find((etage) => {
//     foundInEtage = etage.find(zimmer => !zimmer.occupied)
//     return (typeof foundInEtage != "undefined") 
//   }) ? "es wurde kein freies Zimmer gefunden": foundInEtage
// }

function to3DigitStr(num) {
    return ("000" + num).slice(-3)
}