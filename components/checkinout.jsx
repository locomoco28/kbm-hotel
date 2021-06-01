import React from 'react'

export default function Checkout({data, auschecken, einchecken}) {
    return <div style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        background: "#888",
        gap: "1rem"
    }}> 
      {data.map((etage, indexa) => <div style={{
        display: "flex",
        flexFlow: "column nowrap",
        background: "#333",
        padding:"0.5rem"
      }}><h2 style={{color:"white"}}>{indexa}</h2>
      <div style={{
        width:"100%",
        display:"flex",
        flexFlow:"row wrap",
        alignItems:"space-evenly",
        gap: "1rem",
        padding: "1rem"
      }}>
      {etage.map((zimmer, indexb) => <div style={{flex: "0 0 15rem",padding:"0.5rem",background: "#DDD", position:"relative",borderRadius: "3px 15px 5px 30px"}}>
        <h3>Zimmer {to3DigitStr(zimmer.roomNo)}</h3>
        <p>{zimmer.occupied ? "Zimmer ist Besetzt" : " Zimmer ist noch Frei"}</p>
        <div onClick={() => alert(JSON.stringify(zimmer, null,2))} style={{width:"2rem", height: "2rem", borderRadius:"50%", position:"absolute", backgroundColor:zimmer.occupied ? "red" : "green", top: "1.5rem", right:"1.5rem", fontFamily: "sans-serif", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}>i</div>
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
}

function to3DigitStr(num) {
    return ("000" + num).slice(-3)
}