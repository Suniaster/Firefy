import React from 'react'
import '../styles/home.css'
import { Link } from 'react-router-dom'

const Home = (props) =>{
    return (
        <div className="main-container">
            <div>Bem vindo ao Firefy</div>
            <div>
            <Link to={"/rooms"}>Procurar salas</Link>
            </div>
        </div>
    )
}


export default Home