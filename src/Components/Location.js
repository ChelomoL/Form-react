import React, { Button, Component, useEffect, useRef, useState } from 'react';
import Contactability from './Contactability';
import Personnal from './Personnal';
import './Step-Style.css';


export default function Location(props) {

const[country, setCountry] = useState(null)
const[countries, setCountries] = useState([])
const[city, setCity] = useState(null)
const[street, setStreet] = useState(null)
const[step, setStep] = useState(1)
const[errorMsg, setErrorMsg] = useState(null)

useEffect(() => {
    const data = fetch('http://localhost:3001/countries').then(r => r.json()).then(res => setCountries(res))
})

const validateFormNext = (e) => {
    e.preventDefault() 
    console.log(country)
    if (country != null) {
        setErrorMsg(null)
        setStep(2)
    } else {
        setErrorMsg("Please enter complete adress")
    }
}
const validateFormPrevious = (e) => {
    e.preventDefault()
    console.log(country)
    setErrorMsg(null)
    setStep(0)
    
}
const list = countries.map((c) => {
    return(
        <option value={c}>{c}</option>
    )
})
    return(
        <div>
            {step === 1 && (
             <form className="my-form-style">
                {errorMsg != null && <label style={{color:'red'}}>{errorMsg}</label>}
                <label style={{backgroundColor:'grey'}}>Personnal</label>
                <label style={{backgroundColor:'blue'}}> Location</label>
                <label style={{backgroundColor:'grey'}}> Contactability</label>
                <h1><progress value="33" max="100"/></h1>
                <div>
                    <label className="my-text-style">Country</label>
                    <select  value={country} onChange={e => setCountry(e.target.value)}>
                            
                            {list}
     
                    

                    </select>
                </div>
                <div>
                    <label className="my-text-style">City</label>
                    <input type="text" value={city} onChange={e => setCity(e.target.value) } className="my-input-box"required/>
                </div>
                <div>
                    <label className="my-text-style">Street</label>
                    <input type="text" value={street} onChange={e => setStreet(e.target.value)} className="my-input-box" required/>
                </div>
                    <button onClick={e => validateFormNext(e)} className="my-button-style">Next</button>
                    <button onClick={e => validateFormPrevious(e)}className="my-button-style">Previous</button>
                </form>
            )}
            {step === 2 && <Contactability lastname={props.lastname} firstname={props.firstname} title={props.title} country={country} city={city} street={street} />}
            {step ===0 && <Personnal/>}
        </div>
     
    )
}
