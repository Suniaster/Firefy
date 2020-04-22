import React from 'react'
import LogoPulse from './LogoPulse'


export default function Loading (props){
    

    return (
        <div style={{
            display:"flex", 
            flexDirection:"column", 
            alignItems:"center",
            justifyContent:"center",
            height: "70vh"
        }}>
            <div style={{width: "100px", height: "150px"}}>
                <LogoPulse />
            </div>
            <div style={{width: "100px",textAlign:"center"}}>
                Loading...
            </div>
        </div>
    )
}