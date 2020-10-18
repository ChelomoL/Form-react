import React, { Button, Component, useRef, useState } from 'react';

import Location from './Location';
import './Step-Style.css';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';

export default function Contactability(props) {

const[email, setEmail] = useState(null)
const[phone, setPhone] = useState(null)
const[optin, setOptin] = useState(null)

const[step, setStep] = useState(2)

const [statusCode, setStatusCode] = useState(null)

const[errorMsg, setErrorMsg] = useState(null)

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const [modalIsOpen,setIsOpen] = React.useState(false);
var subtitle;

function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

function closeModal(){
  setIsOpen(false);
}

const validateForm = (e) => {
    e.preventDefault()
    console.log(email)
        setErrorMsg(null)
        setStep(1)
}
const postData = async () =>{
    try {
       const d = await fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                phone: phone,
            })}).then(r => {setStatusCode(r.status); console.log('s',statusCode)})
    } catch (error) {
        
    }
}
const validateSubmit = async (e) => {
    e.preventDefault()
    console.log(email)
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (isPossiblePhoneNumber(phone) && re.test(email) && optin) {
        setErrorMsg("Congratulation !!!!!!!")
        setIsOpen(true);
        const t = await postData()
        console.log(t)
        /*fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                phone: phone,
            })
        }).then(res => {
            console.log(res.status); 
            if(res.status != null) {
                setStatusCode(res.status); 
            }
            console.log('status', statusCode)
        })*/
            
    }else  if(!re.test(email)){
        setErrorMsg("Please enter a valid email format ")
    } else  if(!isPossiblePhoneNumber(phone)){
        setErrorMsg("Please enter a valid phone format (+972)")
    }
    else  if(!optin){
        setErrorMsg("Please accept the conditions")}
}
    return(
        <div>
        {step === 2 && (
            <form className="my-form-style">
                {errorMsg != null && <label style={{color:'red'}}>{errorMsg}</label>}
                <label style={{backgroundColor:'grey'}}>Personnal</label>
                <label style={{backgroundColor:'grey'}}> Location</label>
                <label style={{backgroundColor:'blue'}}> Contactability</label>
                <h1><progress value="67" max="100"/></h1>
            <div>
                <label htmlFor='email' className="my-text-style">Email</label>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} className="my-input-box"required/>
            </div>
            <div>
                <label className="my-text-style">Phone </label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="my-input-box"/>
        </div>
        <label >
            I accept the agreement
        <input type="checkbox" checked={optin} onChange={e => setOptin(e.target.value)} className="my-input-box"/>
        </label>
            <button onClick={e => validateSubmit(e)} className="my-button-style">Submit</button>
            <button onClick={e => validateForm(e)}className="my-button-style">Previous</button> 
        <Modal  className="my-modal-style"
            isOpen={modalIsOpen}  
            style ={customStyles}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            > <p>Your request has been registered</p>
        </Modal>
        </form>
         )}
        {step === 1 && <Location/>}
        </div>
     
    )
}

