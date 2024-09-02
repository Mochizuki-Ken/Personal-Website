import { IoIosArrowBack,IoMdRemoveCircleOutline } from "react-icons/io";
import { BsFillImageFill } from "react-icons/bs";
import { useEffect,useState,useMemo } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
import "./ProjectsEdit.css"

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
// import Select from "react-select";
import { useNavigate } from "react-router-dom";

// import dynamic from "next/dynamic";

export default function ProjectsEdit({EditState = "POST",CurrentImageUrl = "",SetCurrentImageUrl = () => {},OldImageUrl = "",ImageChangeState = false,SetImageChangeState = () => {},SetFirstImage = ()=>{},OtherData = {Title:"",Tags:"",ShortIntro:"",GitHubUrl:"",Date:""},SetOtherData = () => {},Value = "",SetValue = () => {},Action = ()=>{},Delete = ()=>{}}) {
  // const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ header: [1, 2, false] }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }]
    ]
  };

  useEffect(()=>{
    if(document)document.body.style.position = "relative"
    if(document)document.body.style.overflowY = "scroll"
  },[])

  const router = useNavigate()

  function OriginalImage(){
    SetImageChangeState(false)
    SetFirstImage(undefined)
    SetCurrentImageUrl(OldImageUrl)
    // console.log(OldImageUrl)
  }

  function CleanImage(){
    SetImageChangeState(true)
    SetFirstImage(undefined)
    SetCurrentImageUrl("")
  }

  function UploadNewImage(e){
    if(e.target.files){
      SetFirstImage(e.target.files[0])
      SetImageChangeState(true)
      SetCurrentImageUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <div className="PostsEdit_Main_Div">

      <div className="Top_Div">

        <div className="Title_Div">

          <IoIosArrowBack className="icon" onClick={()=>{router('/')}}/>

          <label>{EditState}</label>

        </div>

      </div>

      <div className="Content_Div">

        <div className="First_Image_Div">

          {CurrentImageUrl==""&&<label htmlFor={"Image-upload"} style={{cursor:"pointer"}}>Choose Image</label>}

          {CurrentImageUrl!=""&&<img className="image" width={100} height={100}  src={CurrentImageUrl} alt=""/>}

          <input type={'file'} id="Image-upload" style={{display:"none"}}  onChange={UploadNewImage} accept="image/*"></input>

          {CurrentImageUrl!=""&&<IoMdRemoveCircleOutline className="icon" onClick={CleanImage}/>}
        
          {ImageChangeState===true&&<button onClick={OriginalImage}>Original Image</button>}

        </div>

        <input type={"text"} placeholder="Title" value={OtherData["Title"]} onChange={(e)=>{SetOtherData({...OtherData,Title:e.target.value})}}/>

        <input placeholder="Date" type={"date"} value={OtherData["Date"]} onChange={(e)=>{SetOtherData({...OtherData,Date:e.target.value})}}/>
        
        <div className="Others_Div">

          <input type={"text"} placeholder="Tags (#xxx)" value={OtherData["Tags"]} onChange={(e)=>{SetOtherData({...OtherData,Tags:e.target.value})}}/>

          <input type={"url"} placeholder="GitHub Link" value={OtherData["GitHubUrl"]} onChange={(e)=>{SetOtherData({...OtherData,GitHubUrl:e.target.value})}}/>

        </div>

        <textarea value={OtherData.ShortIntro} placeholder="Short Description" onChange={(e)=>{SetOtherData({...OtherData,ShortIntro:e.target.value})}}/>
        

        <ReactQuill className="Quill" theme="snow" modules={modules} value={Value} onChange={SetValue} />

        <div className="Button_Div">
          
          <button onClick={()=>{router("/")}}>CANCEL</button>

          <button onClick={Delete}>DELETE</button>

          <button onClick={Action}>{EditState}</button>

        </div>

      </div>

    </div>
  )
}
