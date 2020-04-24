import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { useHistory } from 'react-router-dom'


export default function Logout(){
    const history = useHistory();

    useEffect(()=>{
        localStorage.setItem("@user-info",'')
        localStorage.setItem("@user-auth-token", '')
        history.push("/")
    },[])

    return(
        <Loading />
    )
}