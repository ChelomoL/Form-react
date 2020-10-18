import React, { Component, useRef, useState } from 'react';
import Contactability from './Contactability';
import Location from './Location';
import Dialog from 'react-dialog'
import './Step-Style.css';

export default function Personnal() {
const[firstname, setFirstname] = useState(null)
const[lastname, setLastname] = useState(null)
const[title, setTitle] = useState("Choose")
const[step, setStep] = useState(0)
const[errorMsg, setErrorMsg] = useState(null)
const validateForm = (e) => {
    e.preventDefault()
    console.log(firstname)
    if (firstname != null && lastname != null) {
        setErrorMsg(null)
        setStep(1)
    } else {
        setErrorMsg("Please enter first and lastname")
    }
}
    return(
        <div>
        {step === 0 && (
            <form className="my-form-style">
                {errorMsg != null && <label style={{color:'red'}}>{errorMsg}</label>}
                <label style={{backgroundColor:'blue'}}>Personnal</label>
                <label style={{backgroundColor:'grey'}}> Location</label>
                <label style={{backgroundColor:'grey'}}> Contactability</label>
                <h1><progress value="0" max="100"/></h1>
                <div>
                    <label className="my-text-style">FirstName</label>
                    <input type="text" value={firstname} onChange={e => setFirstname(e.target.value) } className="my-input-box" required />
                </div>
                <div>
                    <label className="my-text-style">LastName</label>
                    <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} className="my-input-box" required/>
                </div>
                <div>
                    <label className="my-text-style">Title</label>
                        <select  value={title} onChange={e => setTitle(e.target.value)}>
                            <option value="Choose" >Choose</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Decline">Decline</option>
                        </select>
                </div>
                <button onClick={e => validateForm(e)}  variant="contained" className="my-button-style" >Next</button>
            </form>
        )}
        {step === 1 && <Location lastname={lastname} firstname={firstname} title={title}/>}
        {step === 2 && <Contactability/>}
        </div>
       

    )
}