import ProjectsEdit from "../../Componets/Projects/ProjectsEdit"
import firebase from "../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function EditProjectPage() {

  const params = useParams();

  const Router = useNavigate()

  const [FirstImage,SetFirstImage] = useState()

  const [OldImageUrl,SetOldImageUrl] = useState("")

  const [ImageChangeState,SetImageChangeState] = useState(false)

  const [CurrentImageUrl,SetCurrentImageUrl] = useState(FirstImage && URL.createObjectURL(FirstImage) || "")

  const [OtherData,SetOtherData] = useState({Title:"",Tags:"",GitHubUrl:"",ShortIntro:"",Date:""})

  const [Value,SetValue] = useState("")

  const handleChangeValue = (value) => {
    console.log("doc value", value);
    SetValue(value);
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(()=>{
    firebase.firestore().collection("Projects").doc(params.project_id).get().then((data)=>{
      if( data != undefined ){
        SetOtherData({Title:data.data().ProjectName,Tags:data.data().ProjectTags,GitHubUrl:data.data().ProjectGitHubUrl,ShortIntro:data.data().ProjectShortIntro,Date:formatDate(data.data().ProjectDate.toDate())})
        SetValue(data.data().ProjectContent)
        
        if( data.data().ProjectImageUrl == "" ){
          SetOldImageUrl("")
        }else{
          SetOldImageUrl(data.data().ProjectImageUrl)
          console.log(OldImageUrl)
          SetCurrentImageUrl(data.data().ProjectImageUrl)
        }

      }
    })
  },[])

  const Delete = () => {
    const doc = firebase.firestore().collection('Projects').doc(params.project_id)
    if(OldImageUrl!==""){
      
      const ref = firebase.storage().ref('/Projrct'+doc.id)

      ref.delete()
    }
    doc.delete().then(()=>{
      Router('/')
    })
  }

  const Update = () => {

    const doc = firebase.firestore().collection('Projects').doc(params.project_id)

    const ref = firebase.storage().ref('/Project'+params.project_id)

    if(ImageChangeState){
      if(OldImageUrl!==""){
        ref.delete()
      }
      if(FirstImage){
        ref.put(FirstImage,{contentType:FirstImage.type}).then(()=>{
  
          ref.getDownloadURL().then((imgUrl)=>{
  
            doc.update(
  
              {
                ProjectName:OtherData.Title,
                ProjectContent:Value,
                ProjectDate:firebase.firestore.Timestamp.fromDate(new Date(OtherData.Date)),
                ProjectTags:OtherData.Tags.split("#")||[],
                ProjectGitHubUrl:OtherData.GitHubUrl,
                ProjectShortIntro:OtherData.ShortIntro,
                ProjectImageUrl:imgUrl
              }
  
            ).then(()=>{
              Router("/projects")
            })
          })
        })
      }else{
        doc.update(
  
          {
            ProjectName:OtherData.Title,
            ProjectContent:Value,
            ProjectDate:firebase.firestore.Timestamp.fromDate(new Date(OtherData.Date)),
            ProjectTags:OtherData.Tags.split("#")||[],
            ProjectGitHubUrl:OtherData.GitHubUrl,
            ProjectShortIntro:OtherData.ShortIntro,
            ProjectImageUrl:""
          }

        ).then(()=>{
          Router("/projects")
        })
      }

    }else{
      doc.update(
  
        {
          ProjectName:OtherData.Title,
          ProjectContent:Value,
          ProjectDate:firebase.firestore.Timestamp.fromDate(new Date(OtherData.Date)),
          ProjectTags:OtherData.Tags.split("#")||[],
          ProjectGitHubUrl:OtherData.GitHubUrl,
          ProjectShortIntro:OtherData.ShortIntro,
        }

      ).then(()=>{
        Router("/projects")
      })
    }
  }

  return (
    <ProjectsEdit 
      EditState="UPDATE" 
      CurrentImageUrl={CurrentImageUrl}
      SetCurrentImageUrl={SetCurrentImageUrl}
      OldImageUrl={OldImageUrl}
      ImageChangeState={ImageChangeState}
      SetImageChangeState={SetImageChangeState}
      SetFirstImage={SetFirstImage} 
      OtherData={OtherData} 
      SetOtherData={SetOtherData} 
      Value={Value} 
      SetValue={handleChangeValue} 
      Action={Update}
      Delete={Delete}
    />
  )
}
