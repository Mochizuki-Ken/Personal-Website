import { IoMdSearch,IoIosArrowBack } from "react-icons/io";
import { useEffect,useState } from 'react'
import firebase from "../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { IoLogoGithub } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import "./ProjectDetailPage.css"

export default function ProjectDetailPage() {
  const params = useParams()

  const [ProjectsData,SetProjectsData] = useState({
    ProjectsId:"",
    ProjectsName:"",
    ProjectsImageUrl:"",
    ProjectsShortIntro:"",
    ProjectsContent:"",
    ProjectsGitHubUrl:"",
    ProjectsTags:[],
    ProjectsDate:"",
  })

  useEffect(()=>{
    document.body.style.position = "relative"
    document.body.style.overflowY = "scroll"
  },[params.project_id])

  useEffect(()=>{
    firebase.firestore().collection("Projects").doc(params.project_id).get().then((data)=>{
      if(data!==undefined){
        SetProjectsData({
        ProjectsId:data.id,
        ProjectsName:data.data().ProjectName,
        ProjectsImageUrl:data.data().ProjectImageUrl,
        ProjectsShortIntro:data.data().ProjectShortIntro,
        ProjectsContent:data.data().ProjectContent,
        ProjectsGitHubUrl:data.data().ProjectGitHubUrl,
        ProjectsTags:data.data().ProjectTags,
        ProjectsDate:data.data().ProjectDate.toDate().toLocaleDateString(),
      })
    }
    })

  },[params.project_id])

  const router = useNavigate()

  return (
    <div className='Post_Detail_Main_Div'>
      
      <div className="Title_Div">

        <IoIosArrowBack className="icon" onClick={()=>{router('/projects')}}/>

        <label className="Title">Project</label>

      </div>

      <div className="Display_Div">

        {ProjectsData.ProjectsImageUrl!==""&&<img alt="" width={100} height={100} src={ProjectsData.ProjectsImageUrl} className="image" />}

        <label className="Title">{ProjectsData.ProjectsName}</label>

        <a className="Link" onClick={()=>{window.open(ProjectsData.ProjectsGitHubUrl,"__blank")}} >Github<IoLogoGithub className="icon"/></a>

        <div className="Other_Div">
          <label className="Tags">Tags - {ProjectsData.ProjectsTags.map(
            (tag,index)=>{
              return(
                <label key={index} className="Tags">#{tag}</label>
              )
            }
          )}</label>
        </div>

        <label className="Date">{ProjectsData.ProjectsDate}</label>

        <hr/>

        <div className="Content" dangerouslySetInnerHTML={{ __html: ProjectsData.ProjectsContent }}>

        </div>

      </div>
        
    </div>
  )
}
