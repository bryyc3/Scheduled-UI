import { useEffect } from "react"

export default function SchedulerDashboard(){
    useEffect(() => {
        fetch("http://localhost:8000/loginStatus",
          {
            method: 'GET',
            credentials: 'include'
          }
        ).then((res) => res.json())
          .then(data => {
            (data.logged_in && data.account_type === 'scheduler') ? console.log(data.logged_in) : window.location = `http://localhost:3000/`
          })},[])
    return(
        <h1>HELLO SCHEDULER</h1>
    )
}