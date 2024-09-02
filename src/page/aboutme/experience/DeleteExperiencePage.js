
import firebase from "../../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"


export default function DeleteExperiencePage(){

    // const params = useParams()

    const [value,setValue] = useState("")

    const Router = useNavigate()

    function Delete(){
        const doc = firebase.firestore().collection('Experiences').doc(value)
        
        try{
            const ref = firebase.storage().ref('/Experiences'+doc.id)

            ref.delete()
        }
        catch(e){}
        
        doc.delete().then(()=>{
            Router("/")
        })
    }

    return(
        
        <>
        <input type="text" onChange={(e)=>{setValue(e.target.value)}}/>
        <button onClick={Delete}>DELETE</button>
        </>
        

    )
}