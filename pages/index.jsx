import React from 'react'
import useSWR from 'swr'



export default function Index() { 
    const [checkin, setCheckin] = React.useState(1)
    const [popup, setPopup] = React.useState(false)

    const [aussie, setAussie] = React.useState(false)

    React.useEffect(() => {
        document.body.style.transform = aussie ? "rotate(2deg)" : ""
    }, [aussie])

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

    {popup == true ? <div 
      
      style={{ 
        justifyContent:"space-evenly",
        padding:"2rem",
        display: "flex",
        
        flexFlow:"row wrap", position: "absolute", width: "50%", height: "20%",background: "#888",zIndex: "10", margin:"0,auto", left:"50%",transform: "translateX(-50%)",top:"10%"}}>
<form style={{ display: "flex", justifyContent: "space-evenly" }}>
  <span style={{ flexBasis: "50%",
                 display: "flex", flexDirection: "column" }}>
    <label for="level"style={{ height:"1.5rem"}}>Etage</label>
    <input id="level" name="level" style={{ height:"2.5rem"}} />
  </span>

  <span style={{ flexBasis: "50%",
                 display: "flex", flexDirection: "column" }}>
    <label for="roomNo"style={{ height:"1.5rem"}}>Zimmer Nummer</label>
    <input id="roomNo" name="roomNo" style={{ height:"2.5rem"}}/>
  </span>
</form>
    </div> : ""}
    
    {checkin >= 0 && <div style={{position: "fixed", maxWidth: "15rem", left: "50%", top: "10%", zIndex: "10", transform: "translateX(-50%)", background: "#888", minHeight: "5rem", padding: "2rem 5rem", borderRadius: "15px"
    // langsam gefällt mir die Framework
    // hier ist die box yeee
    }}
    >
         <form style={{ 
                width: "100%", // passt sich an den parent an, der ist responsive, nice (doch noch nicht, braucht bissl verbesserung xD) lmao
                 display: "flex",
                 flexDirection: "column",
                 
                 }}>
                
                 <h1> Was geht bruder, check ein 💯</h1>
                 <img style={{maxHeight: "180px", display: aussie ? "none" : "block"}} src="https://media1.tenor.com/images/0f36726b6c2ee4e6c9ff0acf61952ef3/tenor.gif?itemid=21357175" />
                 {aussie && <h2>KAPUTT</h2>}
                 <img style={{maxHeight: "180px", display: aussie ? "block" : "none"}} src="https://media1.tenor.com/images/cb6a0257a5a89e3d0ad6f9a399f0ce10/tenor.gif?itemid=20437504" />
                 
                <label for="Vorname"> Vorname:</label>
                <input type="text" id="Vorname" name="Vorname"/> 
                <label for="Nachname"> Nachname:</label>
                <input type="text" id="Nachname" name="Nachname"/> 
                 <label for="Stadt"> Stadt:</label> 
                <input type="text" id="Stadt" name="Stadt"/> 
                 <label for="Straße"> Straße:</label> 
                <input type="text" id="Straße" name="Straße"/> 
                 <label for="Hausnr."> Hausnr.:</label> 
                <input type="number" id="Hausnr." name="Hausnr."/> 
                <span>
                <button onClick={(e) => {
                    e.preventDefault()
                }}>Einchecken</button>
                <button onClick={(e) => {
                    e.preventDefault()
                    setAussie(!aussie)
                    setCheckin(-1)
                }}>Abbrechen</button> 
                </span>
         </form>
    </div>}

    <div style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        background: "#888",
        gap: "1rem"
    }}> 
      {res.data.map((etage, index) => <div style={{
        display: "flex",
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