import React from 'react'
import useSWR from 'swr'



export default function Index() {   
    const [popup, setPopup] = React.useState(false)

    const _res = useSWR("/api/rooms")

    if(_res.error) return <h1>Error: {_res.error}</h1>
    if(!_res.data && !_res.error) return <h1>Loading data...</h1>

    const res = _res.data


function getNextFreeRoom(data){
    let foundInEtage

  return  !data.find((etage) => {
    foundInEtage = etage.find(zimmer => !zimmer.occupied)
    return (typeof foundInEtage != "undefined") 
  }) ? "es wurde kein freies Zimmer gefunden": foundInEtage
}

function einchecken(zimmer){
  fetch('/api/rooms', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({roomNo: zimmer.roomNo,occupy: true, name: "Joe", address: "Test Addr"})
  }).then(resp => {
      console.log({resp})
  }).catch(err => {
      console.log({err})
  })
}

function auschecken(zimmer){
    fetch('/api/rooms', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({roomNo: zimmer.roomNo,occupy: false})
  }).then(resp => {
      console.log({resp})
  }).catch(err => {
      console.log({err})
  })
}
    return <>
    <div style={{
        width: "100%",
        display: "flex",
        flexFlow:"row wrap",
        alignItems:"space-evenly",
        background: "#888",
    }}> 
      <button style={{ height:"2.5rem", width:"50%"}} onClick={() => {
          console.log(getNextFreeRoom(res.data))
      }}>Automatisch Buchen</button>
      <button style={{ height:"2.5rem",  width:"50%"}} onClick={() => {
        {popup == false ? setPopup(true): setPopup(false);console.log(popup)}
      }}>auschecken</button>
    </div>
    {popup == true ? <div style={{position: "absolute", width: "80%", height: "80%",background: "#888",zIndex: "10"}}></div> : ""}
    <div style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        background: "#888",
        gap: "1rem"
    }}> 
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
        <button style={{width:"4,6rem", height: "2rem", borderRadius: "5px 5px 5px 5px", position:"absolute", top: "4.5rem", right:"0.8rem",background: "#888"}}
        onClick={() => {
          {zimmer.occupied ? auschecken(zimmer)  : einchecken(zimmer)}
        }}>
          <b>
          {zimmer.occupied ? "auschecken" : "einchecken"}
          </b>
        </button>
      </div>)}
      </div>
      </div>)}
    </div>  
    </>
}

function to3DigitStr(num) {
    return ("000" + num).slice(-3)
}