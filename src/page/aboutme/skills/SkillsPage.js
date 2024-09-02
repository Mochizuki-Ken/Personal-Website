import React from "react";
import { useState } from "react";

export default function SkillsPage() {
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
    "Python",
    "opencv",
    "pytroch",
    "yolo",
    "JavaScript",
    "htmlcss",
    "react",
    "nextjs",
    "nodejs",
    "mysql",
    "postgreSql",
    "Mongodb",
  ]);

  return (
    <div className="SkillsIntro_Main_Div">
      <label className="Title2">SKILLS</label>

      <div className="skills_content">
        {SkillImages.map((image, Index) => {
          return (
            <div>
              <img
                key={Index}
                className="img"
                alt="image"
                src={require(`../../../Medias/${image}`)}
              />
              <label>{SkillTitle[Index]}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
