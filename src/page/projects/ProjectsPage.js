import "./ProjectsPage.css"

import { useState,useEffect } from "react"

import { IoMdSearch,IoIosArrowBack } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";

import ProjectCard from "../../Componets/Projects/ProjectCard";

import firebase from "../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { useNavigate } from "react-router-dom";

export default function ProjectsPage() {

  const router = useNavigate()

  const [ProjectsData,SetProjectsData] = useState([
    {
      ProjectId:"",
      ProjectName:"",
      ProjectGitHubUrl:"",
      ProjectImageUrl:"",
      ProjectShortIntro:"",
      ProjectContent:"",
      ProjectTags:[],
      ProjectDate:""
    }
  ])

  useEffect(()=>{
    firebase.firestore().collection("Projects").orderBy("ProjectDate","desc").get().then((data)=>{
      
      let datas = data.docs.map((doc) => {
        return {
          ProjectId:doc.id,
          ProjectName:doc.data().ProjectName,
          ProjectGitHubUrl:doc.data().ProjectGitHubUrl,
          ProjectImageUrl:doc.data().ProjectImageUrl,
          ProjectShortIntro:doc.data().ProjectShortIntro,
          ProjectContent:doc.data().ProjectContent,
          ProjectTags:doc.data().ProjectTags,
          ProjectDate:doc.data().ProjectDate.toDate().toLocaleDateString(),
        } 
      })
      console.log(datas)
      SetProjectsData(datas)
    
    })
  },[])

  return (
    <div className="Projects_Main_Div">

      <div className="Top_Div">

        <div className="Title_Div">

          <IoIosArrowBack className="icon" onClick={()=>{router('/')}}/>

          <label className="Title">PROJECTS</label>

        </div>

        <div className="Search_Filter_Div">

          <div className="Search_Div">

            <input type={'text'} />

            <IoMdSearch className="icon"/>

          </div>

          <div className="Filter_Div">

            <label>Latest</label>
            <label>AI</label>
            <label>Tool</label>

            <IoFilterSharp className="icon"/>

          </div>

        </div>

      </div>

      <div className="Project_Cards_Div">

        {
          ProjectsData.map((Project,Index)=>{
            return(
              <ProjectCard key={Index} ProjectInfo={Project} />
            )
          })
        }

      </div>

    </div>
  )
}
