import ProjectsEdit from "../../Componets/Projects/ProjectsEdit"
import firebase from "../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { useState ,useEffect} from "react"
import { useNavigate } from "react-router-dom"

export default function PostProjectPage() {

  const Router = useNavigate()

  const [FirstImage,SetFirstImage] = useState()

  let url = FirstImage && URL.createObjectURL(FirstImage)

  const [OtherData,SetOtherData] = useState({Title:"",Tags:"",ShortIntro:"",GitHubUrl:"",Date:""})

  const [Value,SetValue] = useState("")

  const handleChangeValue = (value) => {
    console.log("doc value", value);
    SetValue(value);
  };

  

  const Post = () => {

    const doc = firebase.firestore().collection('Projects').doc()

    const ref = firebase.storage().ref('/Projects'+doc.id)

    if(FirstImage){
      ref.put(FirstImage,{contentType:FirstImage.type}).then(()=>{

        ref.getDownloadURL().then((imgUrl)=>{

          doc.set(

            {
              ProjectName:OtherData.Title,
              ProjectContent:Value,
              ProjectDate:firebase.firestore.Timestamp.fromDate(new Date(OtherData.Date)),
              ProjectTags:OtherData.Tags.split("#")||[],
              ProjectShortIntro:OtherData.ShortIntro,
              ProjectImageUrl:imgUrl,
              ProjectGitHubUrl:OtherData.GitHubUrl
            }

          ).then(()=>{
            Router("/projects")
          })

        })

      })
    }else{
      doc.set(

        {
          ProjectName:OtherData.Title,
          ProjectContent:Value,
          ProjectDate:firebase.firestore.Timestamp.fromDate(new Date(OtherData.Date)),
          ProjectTags:OtherData.Tags.split("#")||[],
          ProjectShortIntro:OtherData.ShortIntro,
          ProjectImageUrl:"NONE",
          ProjectGitHubUrl:OtherData.GitHubUrl
        }

      ).then(()=>{
        Router("/projects")
      })
    }

  }
  return (
    <ProjectsEdit 
      EditState="POST" 
      CurrentImageUrl={url} 
      SetFirstImage={SetFirstImage} 
      OtherData={OtherData} 
      SetOtherData={SetOtherData} 
      Value={Value} 
      SetValue={handleChangeValue} 
      Action={Post}
    />
  )
}
