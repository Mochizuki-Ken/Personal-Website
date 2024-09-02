

import { useState,useEffect } from "react"
import firebase from "../../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

import { IoIosArrowBack,IoMdRemoveCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom"


export default function AddExperiencePage() {

  const Router = useNavigate()

  const [Title,SetTitle] = useState("")

  const [Description,SetDescription] = useState("")

  const [Link,SetLink] = useState("")

  const [DateT,SetDate] = useState("")

  const [ImageF,SetImage] = useState()

  let url = ImageF!=undefined && URL.createObjectURL(ImageF) || ""
 
  function Add(){
    const doc = firebase.firestore().collection('Experiences').doc()

    const ref = firebase.storage().ref('/Experiences'+doc.id)

    if(ImageF!=undefined){
      ref.put(ImageF,{contentType:ImageF.type}).then(()=>{

        ref.getDownloadURL().then((imgUrl)=>{

          doc.set(

            {
              ExperienceTitle:Title,
              ExperienceLink:Link,
              ExperienceDescription:Description,
              ExperienceImageUrl:imgUrl,
              ExperienceDate:firebase.firestore.Timestamp.fromDate(new Date(DateT))

            }

          ).then(()=>{
            Router("/aboutme/experience")
          })

        })

      })
    }else{
      doc.set(

        {
          ExperienceTitle:Title,
          ExperienceLink:Link,
          ExperienceDescription:Description,
          ExperienceImageUrl:"",
          ExperienceDate:firebase.firestore.Timestamp.fromDate(new Date(DateT))
        }

      ).then(()=>{
        Router("/aboutme/experience")
      })
    }
  }
  useEffect(()=>{
    if(document)document.body.style.position = "relative"
    if(document)document.body.style.overflowY = "scroll"
  },[])

  return (
    <div className="PostsEdit_Main_Div">

      <div className="Top_Div">

        <div className="Title_Div">

          <IoIosArrowBack className="icon" onClick={()=>{Router('/')}}/>

          <label>New Exprience</label>

        </div>

      </div>

      <div className="Content_Div">

        <div className="First_Image_Div">

          {ImageF==undefined&&<label htmlFor={"Image-upload"} style={{cursor:"pointer"}}>Choose Image</label>}

          {ImageF!=undefined&&<img unoptimized className="image" width={100} height={100}  src={url} alt=""/>}

          <input type={'file'} id="Image-upload" style={{display:"none"}}  onChange={(e)=>{if(e.target.files)SetImage(e.target.files[0])}} accept="image/*"></input>

          {ImageF!=undefined&&<IoMdRemoveCircleOutline className="icon" onClick={()=>{SetImage(undefined)}}/>}
        
        </div>

        
        <input type={"text"} placeholder="Title" value={Title} onChange={(e)=>{SetTitle(e.target.value)}}/>

        <input type={"text"} placeholder="Link" value={Link} onChange={(e)=>{SetLink(e.target.value)}}/>

        <input type={"date"} placeholder="Date" value={DateT} onChange={(e)=>{SetDate(e.target.value);console.log(new Date(e.target.value).getTime())}}/>

        <textarea value={Description} placeholder="Short Description" onChange={(e)=>{SetDescription(e.target.value)}}/>

        <div className="Button_Div">
          
          <button onClick={()=>{Router('/')}}>CANCEL</button>

          <button onClick={Add}>POST</button>

        </div>

      </div>

    </div>
  )
}
