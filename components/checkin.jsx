import React from 'react'
import { useForm } from "react-hook-form";

export default function Checkin({setAussie, setCheckin, zimmer, aussie, onSubmit}) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return <form style={{ 
                width: "100%", // passt sich an den parent an, der ist responsive, nice (doch noch nicht, braucht bissl verbesserung xD) lmao
                 display: "flex",
                 flexDirection: "column",
                 
                 }} onSubmit={handleSubmit(onSubmit)}>
                
                 <h1> Was geht bruder, check ein 💯</h1>
                 <img style={{maxHeight: "180px", display: aussie ? "none" : "block"}} src="https://media1.tenor.com/images/0f36726b6c2ee4e6c9ff0acf61952ef3/tenor.gif?itemid=21357175" />
                 {aussie && <h2>KAPUTT</h2>}
                 <img style={{maxHeight: "180px", display: aussie ? "block" : "none"}} src="https://media1.tenor.com/images/cb6a0257a5a89e3d0ad6f9a399f0ce10/tenor.gif?itemid=20437504" />
                 
                <label > Vorname:</label>
                <input type="text" id="Vorname" {...register("Vorname", { required: true })}/> 
                {errors.Vorname && <span>Bitte gebe einen Vornamen an</span>}
                <label > Nachname:</label>
                <input type="text" id="Nachname" {...register("Nachname", { required: true })}/> 
                {errors.Nachname && <span>Bitte gebe einen Nachnamen an</span>}
                 <label > Stadt:</label> 
                <input type="text" id="Stadt" {...register("Stadt", { required: true })}/> 
                {errors.Stadt && <span>Bitte gebe eine Stadt an</span>}
                 <label > Straße:</label> 
                <input type="text" id="Straße" {...register("Strasse", { required: true })}/> 
                {errors.Strasse && <span>Bitte gebe eine Straße an</span>}
                 <label > Hausnr.:</label> 
                <input type="number" id="Hausnr." {...register("Hausnr", { required: true })}/> 
                {errors.Hausnr && <span>Bitte gebe eine Hausnr. an</span>}
                <span>
                <button disabled={aussie}>{aussie ? "Du machen kaputt, du müssen reparieren" : `Zimmer ${zimmer} Einchecken`}</button>
                <button onClick={(e) => {
                    e.preventDefault()
                    setAussie(!aussie)
                    setCheckin(-1)
                }}>{aussie ? "Reparieren" : "Abbrechen"}</button> 
                </span>
         </form>
}