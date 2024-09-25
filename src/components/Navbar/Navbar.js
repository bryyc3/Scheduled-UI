import './Navbar.css'
import profile_pic from '../../assets/profile_pic.jpg';

export default function Navbar({account}){
    if(account === 'scheduler'){
        return(
            <div className="navbar">
               <img src={ profile_pic } alt="" className='profile'/>
           </div>
       );
    }
    if(account === 'booker'){
        return(
            <div className="navbar">
               <div className="nav_items">
                   <input type="text" name="search" className='search_bar' />
               </div>
               <img src={ profile_pic } alt="" className='profile'/>
           </div>
       );
    }
}