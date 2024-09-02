
import { useState } from "react";

import './Home.css'
import './globals.css'
import SocialMedias from "../Componets/All/SocialMedias";
import { Link } from "react-router-dom";



export default function Home() {

  const [ScreenState,SetScreenState] = useState(0)

  return (
    <main className="Home_Main">
      <div className="Home_Main_Div">

        { ScreenState ===0 &&  <div className={ `First_Screen_Div` } onClick={(e)=>{SetScreenState(1)}}>

          <label className="l1 lt">MOCHIZUKI KEN</label>

          <label className="l2 lt ol">MOCHIZUKI KEN</label>

          <label className="l3 lt ol">MOCHIZUKI KEN</label>

          <label className="l4 lt ol">SOFTWARE ENGINEER</label>

          <label className="l5">Click Me</label>

          <div className="arrow_div left_arrow">
            <img className="arrow" width={100} height={50} alt="" src={require('../Medias/Co..png')} />
          </div>

          <div className="arrow_div right_arrow">
            <img className="arrow" width={100} height={50} alt="" src={require('../Medias/Co..png')} />
          </div>

        </div> }

        { ScreenState === 1 && <div className="Second_Screen_Div">
          
          <div className="Links_Div">

            <Link to={"/projects"} className="Link">PROJECTS</Link>

            <Link to={"/posts"} className="Link">POSTS</Link>

            <Link to={"/aboutme"} className="Link">ABOUT ME</Link>

          </div>

          <SocialMedias/>

        </div> }
        
      </div>
    </main>
  );
}
