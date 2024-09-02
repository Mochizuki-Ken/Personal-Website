import { IoLogoGithub,IoLogoInstagram,IoLogoWhatsapp,IoLogoLinkedin   } from "react-icons/io";
import { SiGmail } from "react-icons/si";

export default function SocialMedias() {

    const SocialMediaLinks = {
        GitHub:"https://github.com/Mochizuki-Ken",
        Ig:"https://www.instagram.com/mochizuki__ken?igsh=eGV4YXlwMmFvcXFu&utm_source=qr",
        Ws:"https://wa.me/60867358",
        LKin:"https://www.linkedin.com/in/ken-mochizuki-9791b5303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        Gmail:"https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHxwFVPXjnvVTCKPMhSSvRKdxrlfTwDNjztGzWJfJglqsgWdXBWzfmnqJjqLJLQBRcsGjvV"

    }
  return (
    <div className="Social_Media_Div">

            <IoLogoGithub className="icon" onClick={()=>{window.open(SocialMediaLinks["GitHub"],"__blank")}}/>

            <IoLogoInstagram className="icon" onClick={()=>{window.open(SocialMediaLinks["Ig"],"__blank")}}/>

            <IoLogoLinkedin className="icon" onClick={()=>{window.open(SocialMediaLinks["LKin"],"__blank")}}/>

            <IoLogoWhatsapp className="icon" onClick={()=>{window.open(SocialMediaLinks["Ws"],"__blank")}}/>

            <SiGmail className="icon" onClick={()=>{window.open(SocialMediaLinks["Gmail"],"__blank")}}/>

    </div>
  )
}
