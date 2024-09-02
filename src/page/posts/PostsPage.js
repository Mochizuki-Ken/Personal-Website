import "./PostsPage.css"

import { useState,useEffect } from "react"

import { IoMdSearch,IoIosArrowBack } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";

import PostCard from "../../Componets/Posts/PostCard";

import firebase from "../../firebase/Firebase"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { useNavigate } from "react-router-dom";

export default function PostsPage() {

  const router = useNavigate()

  const [PostsData,SetPostsData] = useState([
    {
      PostId:"",
      PostName:"",
      PostImageUrl:"",
      PostShortIntro:"",
      PostContent:"",
      PostTags:[],
      PostDate:"",
      PostType:""
    }
  ])

  const [TypeState,SetTypeState] = useState("Idea")

  useEffect(()=>{
    firebase.firestore().collection("Posts").where("PostType","==",TypeState).orderBy("PostDate","desc").get().then((data)=>{
      
      let datas = data.docs.map((doc) => {
        return {
          PostId:doc.id,
          PostName:doc.data().PostName,
          PostImageUrl:doc.data().PostImageUrl,
          PostShortIntro:doc.data().PostShortIntro,
          PostContent:doc.data().PostContent,
          PostTags:doc.data().PostTags,
          PostDate:doc.data().PostDate.toDate().toLocaleDateString(),
          PostType:doc.data().PostType
        } 
      })
      console.log(datas)
      SetPostsData(datas)
    
    })
  },[TypeState])

  return (
    <div className="Posts_Main_Div">

      <div className="Top_Div">

        <div className="Title_Div">

          <IoIosArrowBack className="icon" onClick={()=>{router('/')}}/>

          <label className="Title">POSTS</label>

        </div>

        <div className="Search_Filter_Div">

          <div className="Search_Div">

            <input type={'text'} />

            <IoMdSearch className="icon"/>

          </div>

          <div className="Filter_Div">

            <label onClick={()=>{SetTypeState("Idea")}}>Ideas</label>
            <label onClick={()=>{SetTypeState("Daily")}}>Daily</label>

          </div>

        </div>

      </div>

      <div className="Post_Cards_Div">

      {
        PostsData.map((Post,Index)=>{
          return(
            <PostCard key={Index} PostInfo={Post}/>
          )
        })
      }

      </div>

    </div>
  )
}
