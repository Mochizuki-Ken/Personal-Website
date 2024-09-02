import "./ExperiencePage.css"
import { IoMdSearch,IoIosArrowBack } from "react-icons/io";
import { useState,useEffect } from "react"


import firebase from "../../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

import ExperienceCard from "../../../Componets/AboutMe/ExperienceCard";
import { useNavigate } from "react-router-dom";

export default function ExperiencePage() {

  const router = useNavigate()

  const [ExperienceList,SetExperienceList] = useState([
    {
      ExperienceId:"",
      ExperienceTitle:"",
      ExperienceDescription:"",
      ExperienceImageUrl:"",
      ExperienceLink:"",
      ExperienceDate:""
    }
  ])

  useEffect(()=>{
    document.body.style.position = "relative"
        document.body.style.overflowY = "scroll"
  },[])

  useEffect(()=>{
    firebase.firestore().collection("Experiences").orderBy("ExperienceDate","asc").get().then((data)=>{
      
      let datas = data.docs.map((doc) => {
        return {
          ExperienceId:doc.id,
          ExperienceTitle:doc.data().ExperienceTitle,
          ExperienceDescription:doc.data().ExperienceDescription,
          ExperienceImageUrl:doc.data().ExperienceImageUrl,
          ExperienceLink:doc.data().ExperienceLink,
          ExperienceDate:doc.data().ExperienceDate.toDate().getFullYear()
          
        } 
      })
      console.log(datas)
      SetExperienceList(datas)
    
    })
  },[])

  return (
    <div className="Experience_Main_Div">

      <div className="Top_Div">

        <IoIosArrowBack className="icon" onClick={()=>{router('/')}}/>

        <label className="Title">EXPERIENCE</label>

      </div>

      <div className="Content_Div">




          {
            ExperienceList.map((Experience,index)=>{
              return(
                <ExperienceCard key={index} ExperienceDetail={Experience}/>
              )
            })
          }


      </div>

    </div>
  )
}
