import { IoMdSearch,IoIosArrowBack } from "react-icons/io";
import { useEffect,useState } from 'react'
import firebase from "../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import "./PostDetailPage.css"
import { useNavigate, useParams } from "react-router-dom";

export default function PostDetailPage() {
  const params = useParams()

  const [PostData,SetPostData] = useState({
    PostId:"",
    PostName:"",
    PostImageUrl:"",
    PostShortIntro:"",
    PostContent:"",
    PostTags:[],
    PostDate:"",
    PostType:""
  })

  useEffect(()=>{
    document.body.style.position = "relative"
    document.body.style.overflowY = "scroll"
  },[params.post_id])

  useEffect(()=>{
    firebase.firestore().collection("Posts").doc(params.post_id).get().then((data)=>{
      if(data!==undefined){
        SetPostData({
        PostId:data.id,
        PostName:data.data().PostName,
        PostImageUrl:data.data().PostImageUrl,
        PostShortIntro:data.data().PostShortIntro,
        PostContent:data.data().PostContent,
        PostTags:data.data().PostTags,
        PostDate:data.data().PostDate.toDate().toLocaleDateString(),
        PostType:data.data().PostType
      })
    }
    })

  },[params.post_id])

  const router = useNavigate()

  return (
    <div className='Post_Detail_Main_Div'>
      
      <div className="Title_Div">

        <IoIosArrowBack className="icon" onClick={()=>{router.push('/posts')}}/>

        <label className="Title">POST</label>

      </div>

      <div className="Display_Div">

        {PostData.PostImageUrl!==""&&<img alt="" unoptimized width={100} height={100} src={PostData.PostImageUrl} className="image" />}

        <label className="Title">{PostData.PostName}dfdffdf</label>

        <div className="Other_Div">
          <label className="Type">Type - {PostData.PostType}</label>
          <label className="Tags">Tags - {PostData.PostTags.map(
            (tag,index)=>{
              return(
                <label key={index} className="Tags">#{tag}</label>
              )
            }
          )}</label>
        </div>

        <label className="Date">{PostData.PostDate}</label>

        <hr/>

        <div className="Content" dangerouslySetInnerHTML={{ __html: PostData.PostContent }}>

        </div>

      </div>
        
    </div>
  )
}
