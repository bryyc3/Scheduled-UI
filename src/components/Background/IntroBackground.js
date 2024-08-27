import introBackground from '../../assets/introBackground.mp4';
import './IntroBackground.css';

function IntroBackground(){
    return(
        <div className="background">
            <video src= { introBackground } autoPlay loop muted></video>
        </div>
    ); 
}

export default IntroBackground;