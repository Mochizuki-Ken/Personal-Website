import PostsEdit from "../../Componets/Posts/PostsEdit"
import firebase from "../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function EditPostPage() {

  const params = useParams()

  const Router = useNavigate()

  const [FirstImage,SetFirstImage] = useState()

  const [OldImageUrl,SetOldImageUrl] = useState("")

  const [ImageChangeState,SetImageChangeState] = useState(false)

  const [CurrentImageUrl,SetCurrentImageUrl] = useState(FirstImage && URL.createObjectURL(FirstImage) || "")

  const [OtherData,SetOtherData] = useState({Title:"",Tags:"",Type:"",ShortIntro:"",Date:""})

  const [Value,SetValue] = useState("")

  const handleChangeValue = (value) => {
    console.log("doc value", value);
    SetValue(value);
  };

  useEffect(()=>{
    firebase.firestore().collection("Posts").doc(params.post_id).get().then((data)=>{
      if( data != undefined ){
        SetOtherData({Title:data.data().PostName,Tags:data.data().PostTags,Type:data.data().PostType,ShortIntro:data.data().PostShortIntro,Date:data.data().PostDate})
        SetValue(data.data().PostContent)
        
        if( data.data().PostImageUrl == "" ){
          SetOldImageUrl("")
        }else{
          SetOldImageUrl(data.data().PostImageUrl)
          console.log(OldImageUrl)
          SetCurrentImageUrl(data.data().PostImageUrl)
        }

      }
    })
  },[])

  const Delete = () => {
    const doc = firebase.firestore().collection('Posts').doc(params.post_id)
    if(OldImageUrl!==""){
      
      const ref = firebase.storage().ref('/Post'+doc.id)

      ref.delete()
    }
    doc.delete().then(()=>{
      Router("/")
    })
  }

  const Update = () => {

    const doc = firebase.firestore().collection('Posts').doc(params.post_id)

    const ref = firebase.storage().ref('/Post'+doc.id)

    if(ImageChangeState){
      if(OldImageUrl!==""){
        ref.delete()
      }
      if(FirstImage){
        ref.put(FirstImage,{contentType:FirstImage.type}).then(()=>{
  
          ref.getDownloadURL().then((imgUrl)=>{
  
            doc.update(
  
              {
                PostName:OtherData.Title,
                PostContent:Value,
                PostDate:firebase.firestore.Timestamp.fromDate(new Date(OtherData.Date)),
                PostTags:OtherData.Tags.split("#")||[],
                PostType:OtherData.Type,
                PostShortIntro:OtherData.ShortIntro,
                PostImageUrl:imgUrl
              }
  
            ).then(()=>{
              Router.push("/posts")
            })
          })
        })
      }else{
        doc.update(
  
          {
            PostName:OtherData.Title,
            PostContent:Value,
            PostDate:firebase.firestore.Timestamp.fromDate(new Date(OtherData.Date)),
            PostTags:OtherData.Tags.split("#")||[],
            PostType:OtherData.Type,
            PostShortIntro:OtherData.ShortIntro,
            PostImageUrl:""
          }

        ).then(()=>{
          Router.push("/posts")
        })
      }

    }else{
      doc.update(
  
        {
          PostName:OtherData.Title,
          PostContent:Value,
          PostDate:firebase.firestore.Timestamp.fromDate(new Date(OtherData.Date)),
          PostTags:OtherData.Tags.split("#")||[],
          PostType:OtherData.Type,
          PostShortIntro:OtherData.ShortIntro,
        }

      ).then(()=>{
        Router("/posts")
      })
    }
  }

  return (
    <PostsEdit 
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
