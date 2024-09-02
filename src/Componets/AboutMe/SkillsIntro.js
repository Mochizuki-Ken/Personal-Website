import "./SkillsIntro.css";
import { useState } from "react";
export default function SkillsIntro() {
  const [SkillImages, SetSkillImages] = useState([
    "Python.png",
    "opencv.png",
    "pytroch.png",
    "yolo.png",
    "JavaScript.png",
    "htmlcss.png",
    "react.png",
    "nextjs.png",
    "nodejs.png",
    "mysql.png",
    "postgreSql.png",
    "Mongodb.png",
  ]);

  const [SkillTitle, SetSkillTitle] = useState([
    "Front-end (Web)",
    "Back-end",
    "Database",
    "Computer Vision",
    "Machine Learning",
    "Deep Learning",
  ]);

  return (
    <div className="SkillsIntro_Main_Div">
      <label className="Title2">SKILLS</label>

      <div className="skills_title_content">
        {SkillTitle.map((Title, Index) => {
          return (
            <label>- {Title}</label>
          );
        })}
      </div>

      <div className="skills_content">
        {SkillImages.map((image, Index) => {
          return (
            <img
              key={Index}
              className="img"
              alt="image"
              src={require(`../../Medias/${image}`)}
            />
          );
        })}
      </div>
    </div>
  );
}
