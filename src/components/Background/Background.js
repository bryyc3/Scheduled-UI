import background_video from '../../assets/background_video.mp4';
import './Background.css';

export default function Background(){
    return(
        <div className="background">
            <video src= { background_video } autoPlay loop muted></video>
        </div>
    ); 
}

