import PostsEdit from "../../Componets/Posts/PostsEdit"
import firebase from "../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function PostPostPage() {

  const Router = useNavigate()

  const [FirstImage,SetFirstImage] = useState()

  let url = FirstImage && URL.createObjectURL(FirstImage)

  const [OtherData,SetOtherData] = useState({Title:"",Tags:"",Type:"",ShortIntro:"",Date:""})

  const [Value,SetValue] = useState("")

  const handleChangeValue = (value) => {
    console.log("doc value", value);
    SetValue(value);
  };

  const Post = () => {

    const doc = firebase.firestore().collection('Posts').doc()

    const ref = firebase.storage().ref('/Post'+doc.id)

    if(FirstImage){
      ref.put(FirstImage,{contentType:FirstImage.type}).then(()=>{

        ref.getDownloadURL().then((imgUrl)=>{

          doc.set(

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
            Router("/posts")
          })

        })

      })
    }else{
      doc.set(

        {
          PostName:OtherData.Title,
              PostContent:Value,
              PostDate:firebase.firestore.Timestamp.fromDate(new Date(OtherData.Date)),
              PostTags:OtherData.Tags.split("#")||[],
              PostType:OtherData.Type,
              PostShortIntro:OtherData.ShortIntro,
              PostImageUrl:"NONE"
        }

      ).then(()=>{
        Router.push("/posts")
      })
    }

  }

  return (
    <PostsEdit 
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
