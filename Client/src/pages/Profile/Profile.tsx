import axios from "../../libs/axios"
import { useEffect } from "react"

const Profile = () => {
    useEffect(()=>{
        axios.get('/profile').then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log(error)
        })
    },[])
  return (
    <div>Profile</div>
  )
}

export default Profile