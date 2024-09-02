import "./ExperienceCard.css"

export default function ExperienceCard({
  ExperienceDetail={
    ExperienceId:"",
    ExperienceTitle:"",
    ExperienceDescription:"",
    ExperienceImageUrl:"",
    ExperienceLink:"",
    ExperienceDate:""
  }
}) {
  return (
    <div className="ExperienceCard_Main_Div">

      <div className="Left_Div">

        <label>{ExperienceDetail.ExperienceDate}</label>

      </div>

      <div className="Right_Div">

        {ExperienceDetail.ExperienceImageUrl!==""&&<img className="Image" height={100} width={100} alt="" src={ExperienceDetail.ExperienceImageUrl}/>}

        <label>{ExperienceDetail.ExperienceTitle}</label>

        <p>{ExperienceDetail.ExperienceDescription}</p>

        <p style={{fontSize:"5px"}}>{ExperienceDetail.ExperienceId}</p>

        {ExperienceDetail.ExperienceLink!==""&&<button onClick={()=>{window.open(ExperienceDetail.ExperienceLink,"__blank")}}>DETAILS</button>}


      </div>

    </div>
  )
}
