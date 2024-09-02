import "./PostCard.css"
import { IoMdRemoveCircleOutline } from "react-icons/io";
import firebase from "./../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { Link } from "react-router-dom";

export default function PostCard({
  PostInfo = {
    PostId:"",
    PostName:"",
    PostImageUrl:"",
    PostShortIntro:"",
    PostContent:"",
    PostTags:[],
    PostDate:"",
    PostType:""
  }
}) {
    return (
      <div className="PostCard_Main_Div">
        <div className="Left">

        {PostInfo.PostImageUrl!==""&&<image className="Image" width={100} height={100} sizes="" alt="" src={PostInfo.PostImageUrl}/>}

        </div>

        <div className="Right">

        <label className="id">ID : {PostInfo.PostId}</label>

        <label className="Name">{PostInfo.PostName}</label>

        <label className="ShortInfo">{PostInfo.PostShortIntro}</label>

        <div className="Button_Div">

          <Link className="Link" to={`/posts/${PostInfo.PostId}`}>Details</Link>

          <label className="Date">{PostInfo.PostDate}</label>

        </div>

        <div className="Tags_Div">
          {PostInfo.PostTags.map((Tag,Index)=>{
            return(
              <label key={Index} className="tag">#{Tag} </label>
            )
          })}
        </div>


        </div>
      </div>
    )
  }
  