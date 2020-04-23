import React from 'react'
import LogoPulse from './LogoPulse'


export default function Loading (props){
    

    return (
        <div style={{
            display:"flex", 
            flexDirection:"column", 
            alignItems:"center",
            justifyContent:"center",
            height: "100vh"
        }}>
            <div style={{width: "80px"}}>
                <LogoPulse />
            </div>
        </div>
    )
}