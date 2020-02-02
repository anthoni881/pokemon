import React,{useState,useEffect} from "react";
import {  Link } from "react-router-dom";
import './pick.css'
const Pick =({Detail})=>{
    const [state,setState]=useState({
        monster: localStorage.getItem('monster')
    })
    const handleBreak=()=>{
        localStorage.clear();
    }
    const memories = localStorage.getItem('monster') ?
              JSON.parse(localStorage.getItem('monster')) : 
              "";
    useEffect(() => {
        if(Detail){
            localStorage.setItem("monster", JSON.stringify(Detail))
            setState(Detail)
        }
      }, [Detail]);
    return(
    <div className="parent-pick">
        <img className="detail-img"src={memories&&memories.sprites.front_default}/>
        <div className="pokemon-name-detail">{memories.name}</div>
        <div className="container-1">
            <div className="container-1-left">
                <div>Abilities : </div>
                {memories.abilities&&memories.abilities.map(a=>(
                <div>{a.ability.name}</div>
            ))}
            </div>
            <div className="container-1-right">
            <div>Base Experience : </div>
                <div>{memories.base_experience}</div>
            </div>
        </div>
        <div className="container-2">
                {memories.stats&&memories.stats.map(i=>( 
                <>
                <div >Base Stats : <div className="base-stats">{i.base_stat}</div></div>
                <div>Stats Name : {i.stat.name}</div>
                </>
                ))}
        </div>
        <Link to="/battle"><div className="btn-battle">Battle</div></Link>
        <Link to="/"><div className="back-btn" onClick={handleBreak}>Back</div></Link>
    </div>)
}
export default Pick;