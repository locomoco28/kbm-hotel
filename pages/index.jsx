import React from 'react'
import useSWR from 'swr'
import Checkin from '../components/checkin'
import CheckInOut from '../components/checkinout'



export default function Index() { 
    const [checkin, setCheckin] = React.useState(-1)
    const [popup, setPopup] = React.useState(false)
    const [notOccupied, setnotOccupied] = React.useState(false)

    const [aussie, setAussie] = React.useState(false)

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

function checkInAdvanced(data) {
    const zimmerNo = checkin

    fetch('/api/rooms', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({roomNo: checkin, occupy: true, name: `${data.Nachname}, ${data.Vorname}` , address: `${data.Strasse} ${data.Hausnr}, ${data.Stadt}`})
  }).then(resp => {
      console.log({resp})
  }).catch(err => {
      console.log({err})
  })

    setCheckin(-1)
}

function einchecken(zimmer){
    setCheckin(zimmer.roomNo)

    // diese Funktion wird aufgerufen, wenn man auf einchecken clickt. Dann musst du den State setzen, damit die Seite neu lädt. Dann kannst du die Variable von deinem State verwenden, um die Form anzuzeigen (Wie unten, kannst von Marco seinem code inspirieren lassen)

    /* nixi anfassi :p
  fetch('/api/rooms', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({roomNo: zimmer.roomNo, occupy: true, name: "Joe", address: "Test Addr"})
  }).then(resp => {
      console.log({resp})
  }).catch(err => {
      console.log({err})
  })
  */
}
function auscheckenByNumber(etage,raum){
  let nullEtage = to3DigitStr(etage+raum)
  let raumNo = etage == 0 ? nullEtage: etage*10+raum
    fetch('/api/rooms', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({roomNo: raumNo,occupy: false})
  }).then(resp => {
      console.log({resp})
  }).catch(err => {
      setnotOccupied(true)
       console.log({err})
  })
  console.log(notOccupied)
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
          einchecken(getNextFreeRoom(res.data))
      }}>Automatisch Buchen</button>
      <button style={{ height:"2.5rem",  width:"50%"}} onClick={() => {
        {popup == false ? setPopup(true): setPopup(false);console.log(popup)}
      }}>{popup ? "abbrechen" : "auschecken"}</button>
    </div>

    {popup == true ? <div 
      
      style={{ 
        justifyContent:"space-around",
        padding:"2rem",
        display: "flex",
        position: "fixed", 
        flexDirection:"row",
        flexWrap:"wrap",
        width: "50%", 
        height: "30%",
        background: "#888",
        zIndex: "10", 
        margin:"0,auto", 
        left:"50%",
        transform: "translateX(-50%)",
        top:"10%"}}>
<form style={{ flexBasis:"100%", display: "flex", flexWrap:"wrap",flexDirection: "row" }}>
  <span style={{ flexBasis: "100%",
                 display: "flex", flexDirection: "column" }}>
    <label style={{ fontSize:"1.5rem", textAlign:"center",height:"1.5rem"}}>Etage</label>
  <select id="level" name="level" style={{ height:"2.5rem"}}>
    <option value="0">Erdgeschoss (EG)</option>
    <option value="1">Erste Etage (1.OG)</option>
    <option value="2">Zweite Etage (2.OG)</option>
    <option value="3">Dritte Etage (3.OG)</option>
    <option value="4">Vierte Etage (4.OG)</option>
    <option value="5">Fünfte Etage (5.OG)</option>
    <option value="6">Sechste Etage (6.OG)</option>
  </select>
  </span>
    <span style={{ flexBasis: "100%",
                 display: "flex", flexDirection: "column",height:"1rem"}}>

  </span>

  <span style={{ flexBasis: "100%",
                 display: "flex", flexDirection: "column"}}>
    <label style={{ textAlign:"center",height:"1.5rem",fontSize:"1.5rem",}}>Zimmer</label>
      <select id="roomNo" name="roomNo" style={{ height:"2.5rem"}}>
    <option value="1">Zimmer 1</option>
    <option value="2">Zimmer 2</option>
    <option value="3">Zimmer 3</option>
    <option value="4">Zimmer 4</option>
    <option value="5">Zimmer 5</option>
    <option value="6">Zimmer 6</option>
    <option value="7">Zimmer 7</option>
    <option value="8">Zimmer 8</option>
    <option value="9">Zimmer 9</option>
    <option value="10">zimmer 10</option>
  </select>
  </span>
</form>
<span style={{ flexBasis: "100%", display: "flex"}}>
  <button style={{height:"2rem",flexBasis: "100%" }}  onClick={() => {
    {auscheckenByNumber(document.getElementById('level').value,document.getElementById('roomNo').value)}
    }
    }
  ><b style={{textAlign:"center"}}>auschecken</b></button>
  </span>
    </div> : ""}
     {notOccupied == true ? <div 
      
      style={{ 
        justifyContent:"space-around",
        padding:"2rem",
        display: "flex",
        position: "fixed", 
        flexDirection:"row",
        flexWrap:"wrap",
        width: "30%", 
        height: "10%",
        background: "#888",
        zIndex: "20", 
        margin:"0,auto", 
        left:"50%",
        transform: "translateX(-50%)",
        top:"10%"}}>
<span style={{ flexBasis: "100%", display: "flex"}}>
  <button style={{height:"2rem",flexBasis: "100%" }}  onClick={() => {
    {auscheckenByNumber(document.getElementById('level').value,document.getElementById('roomNo').value)}
    }
    }
  ><b style={{textAlign:"center"}}>Okay</b></button>
  </span>
    </div> : ""}
    
    {checkin >= 0 && <div style={{position: "fixed", maxWidth: "15rem", left: "50%", top: "10%", zIndex: "10", transform: "translateX(-50%)", background: "#888", minHeight: "5rem", padding: "2rem 5rem", borderRadius: "15px"
    // langsam gefällt mir die Framework
    // hier ist die box yeee
    }}
    >
         <Checkin onSubmit={checkInAdvanced} zimmer={checkin} setAussie={setAussie} setCheckin={setCheckin} aussie={aussie} />
    </div>}

    <CheckInOut data={res.data} auschecken={auschecken} einchecken={einchecken} />
    </>
}

function to3DigitStr(num) {
    return ("000" + num).slice(-3)
}