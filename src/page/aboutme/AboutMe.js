import "./AboutMe.css"
import SocialMedias from "../../Componets/All/SocialMedias";
import SkillsIntro from "../../Componets/AboutMe/SkillsIntro";
import { useEffect } from "react"

import {IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function AboutMe() {

    const router = useNavigate()

    useEffect(()=>{
        document.body.style.position = "relative"
        document.body.style.overflowY = "scroll"
    },[])

  return (
    <div className="AboutMe_Main_Div">

        <div className="Left"> 
            
            <div className="Top">

                <div className="Image_Div">
                    <img className="ProfilePic" src={require("../../Medias/profile.jpeg")} alt=""/>
                    <label>
                        LOCATION - <label>HK🇭🇰</label>
                    </label>
                </div>

                

                <div className="content">
                    <label>
                        NAME<br/><label>MOCHIZUKI KEN</label>
                    </label>

                    <label className="age">
                        AGE - <label >16</label>
                    </label>

                    

                    <label className="lang">
                        LANGUAGES <br/>
                        <label>
                            MANDARIN<br/>
                            CANTONESE<br/>
                            ENGLISH
                        </label>
                    </label>

                    <label>SOFTWARE  DEVELOPER</label>

                </div>

            </div>

            <SocialMedias/>

        </div>

        <div className="Right"> 

            <div className="Title_Div">

                <IoIosArrowBack className="backicon" onClick={()=>{router('/')}}/>

                <label className="Title">ABOUT ME</label>

            </div>

          <p>
            As a 16-year-old HK student,<br/> I have a deep passion for coding, particularly in the areas of computer vision, artificial intelligence, and web development.<br/><br/> I am always eager to explore new technologies and push the boundaries of what is possible through programming. My curiosity and drive to learn continue to fuel my journey in the world of coding.<br/>
          </p>

          <div className="Links_Div">

            <Link className="link" to={"/projects"}>PROJECTS</Link>

            <Link className="link" to={"/posts"}>POSTS</Link>

            <Link className="link" to={"/aboutme/experience"}>EXPERIENCE</Link>

          </div>

          <SkillsIntro/>

          <div className="Links_Div2">

            {/* <Link className="link" to={"/aboutme/skills"}>SKILLS</Link> */}

            {/* <Link className="link" to={"/aboutme/experience"}>EXPERIENCE</Link> */}

          </div>

        </div>

      </div>
  )
}
