import React from 'react';
import style from '../asset/css/about.module.css';
import fb from '../asset/images/facebook.png';
import github from '../asset/images/github.png';
import insta from '../asset/images/instagram.png';
import linkedin from '../asset/images/linkedin.png';
import messi from '../asset/images/messi.jpg';
function About()
{

return(
    <div className={style.about}>
        <div className={style.div}>
            <div className={style.write}>
        <h3>Hey This is me Abid Ahmed</h3>
        <pre>I am a student of Shahjalal University of Science and Technology, Sylhet. Love to code, watch football, movies, series and sleep. Messi is my role model and the person I admire the most. <br></br><br></br>
        
        This "Trendews" web app is a semester final project of our course "Web Tech". Trendews was made with the help of React as a frontend, for the backend Node.js and Express.js was used and MySql was used as a database for the project.
        
        </pre>
        <a href="https://github.com/AbidAhmed2018831062?tab=repositories">Watch More of My Works here</a>
        </div>
        <img src={messi} alt="Messi"/>
        </div>
        <footer className={style.foot}>
        <div className={style.flex}>
        <p>Connect with me on:</p>
       <div className={style.imganda}>
        <a href="https://www.facebook.com/ahmed.abid.3114935/" target="_blank" rel="noreferrer">  <img src={fb} alt="Facebook"/></a>
      
        <a href="https://www.instagram.com/abidahmed366/" target="_blank" rel="noreferrer"><img src={insta} alt="Instragram"/></a>
       <a href="https://www.github.com/AbidAhmed2018831062" target="_blank" rel="noreferrer"> <img src={github} alt="Github"/></a>
       <a href="https://www.linkedin.com/in/abidahmed62/" target="_blank" rel="noreferrer"><img src={linkedin} alt="Linkedin"/></a>
        </div>
        <div className={style.credit}>
            <p>The icons used in the web app are from <a href="https://www.flaticon.com/" target="_blank" rel="noreferrer">Flat Icon</a> and <a href="https://icons8.com/" target="_blank" rel="noreferrer">Icons8</a></p>

        </div>
        </div>
        </footer>
    </div>
)
}

export default About;