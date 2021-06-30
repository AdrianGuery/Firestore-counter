import './App.css';
import React, {useEffect, useState} from 'react'

import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    //Config Firebase
  });
}else {
  firebase.app(); // if already initialized, use that one
}

const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Counter test</h1>
        <Counters/>
      </header>
    </div>
  );
}

function Counters(){
const [toolpadDoc, setToolpadDoc] = useState()


  useEffect(() => {
    fetData();
  }, [])

  const fetData=async()=>{
    firestore.collection('events').doc('toolpad-salon').onSnapshot((doc)=>{
      setToolpadDoc(doc.data());
    })
  }
  
  const increment= () => {
    const increment = firebase.firestore.FieldValue.increment(1);
    const toolpadDocRef = firestore.collection('events').doc('toolpad-salon')
    toolpadDocRef.update({ numPhysicalParticipantIn: increment });
  }

  const increment100= () => {
    const increment = firebase.firestore.FieldValue.increment(1);
    const toolpadDocRef = firestore.collection('events').doc('toolpad-salon')
    for(let i = 0; i<100;i++){
      toolpadDocRef.update({ numPhysicalParticipantIn: increment });
    }
  }

  const increment10= () => {
    const increment10 = firebase.firestore.FieldValue.increment(10);
    const toolpadDocRef = firestore.collection('events').doc('toolpad-salon')
    toolpadDocRef.update({ numPhysicalParticipantIn: increment10 });
  }

  const decrement= () => {
    const decrement = firebase.firestore.FieldValue.increment(1);
    const toolpadDocRef = firestore.collection('events').doc('toolpad-salon')
    toolpadDocRef.update({ numPhysicalParticipantOut: decrement });
  }

  const decrement10= () => {
    const decrement10 = firebase.firestore.FieldValue.increment(10);
    const toolpadDocRef = firestore.collection('events').doc('toolpad-salon')
    toolpadDocRef.update({ numPhysicalParticipantOut: decrement10 });
  }

  return(
    <div>
      <h2>In : {toolpadDoc ? toolpadDoc.numPhysicalParticipantIn : null}</h2>
      <h2>Out : {toolpadDoc ? toolpadDoc.numPhysicalParticipantOut : null}</h2>
      <div>
        <button onClick={()=>{increment()}}>+1</button>
        <button onClick={()=>{decrement()}}>-1</button>
        <button onClick={()=>{increment10()}}>+10</button>
        <button onClick={()=>{decrement10()}}>-10</button>
      </div>
        <button onClick={()=>{increment100()}}>+100</button>
    </div>
  )
}

export default App;
