import React,{useState,useEffect} from 'react'
import './battle.css'
import axios from 'axios'
import Modal from './Modal'
const Battle=()=>{
    const [show,setShow]=useState(false)
    const [hide,setHide]= useState(false)
    const [showBattle,setShowBattle]=useState(false)
    const [message,setMessage]=useState("")
    const [enemyMonster,setEnemyMonster]=useState("")
    const [myMonster,setMyMonster]= useState("")
    const [showModal,setShowModal]=useState(false)
    const [winner,setWinner]=useState("")
    const memories = localStorage.getItem('monster') ?
              JSON.parse(localStorage.getItem('monster')) : 
              "";
    const Enemy = localStorage.getItem('enemy') ?
              JSON.parse(localStorage.getItem('enemy')) : 
              "";
    useEffect(() => {
        const fetchMonster= JSON.parse(localStorage.getItem('monster'))
        setMyMonster(fetchMonster)
    }, []);
    const handleSearch=async()=>{
        const Random = await Math.floor(Math.random() * 800)+1
        const Enemy=await axios.get(`https://pokeapi.co/api/v2/pokemon/${Random}`);
        localStorage.setItem("enemy", JSON.stringify(Enemy.data))
        setEnemyMonster(Enemy.data)
        if(Enemy!==null ||Enemy!==undefined|| Enemy!==""){
            setShow(true)
            setHide(true)
            setShowBattle(true)
        }
    } 
    const StartBattle=()=>{
        if(enemyMonster!==""||enemyMonster!==null||enemyMonster!==undefined){
            if(myMonster.stats[4].base_stat>enemyMonster.stats[4].base_stat){
                setMessage("Congratzz you are win!")
                setWinner(myMonster)
                setShowModal(true)
            }else if(myMonster.stats[4].base_stat<enemyMonster.stats[4].base_stat){
                setMessage("sorry you are lose maybe next time")
                setWinner(enemyMonster)
                setShowModal(true)
            }else if(myMonster.stats[4].base_stat===enemyMonster.stats[4].base_stat){
                setMessage("Draw! You are lucky")
                setShowModal(true)
            }
        }
    }     
    const close = () => {
        setShowModal(false);
        localStorage.clear();
      }; 
    return(
        <div className="container-battle">
            <div className="parent-battle">
            <div className="my-monster">
                <img className="img-my-monster"src={memories&&memories.sprites.front_default}/>
                <div>{memories.name}</div>
                <div>{memories.stats[4].stat.name}</div>
                <div>{memories.stats[4].base_stat}</div>
            </div>
            {showBattle?
        <div className="VS">VS</div>:""
    }
            {show?
                <div className="enemy">
                    <img className="img-enemy" src={Enemy&&Enemy.sprites.front_default}/>
                    <div>{Enemy.name}</div>
                    <div>{Enemy.stats[4].stat.name}</div>
                    <div>{Enemy.stats[4].base_stat}</div>
                </div> :""   
            }</div>
        {hide?
            ""
            :<div className="search-enemy" onClick={handleSearch}>Searching For Enemy</div>
        }
        {showBattle?
        <div className="start-battle" onClick={StartBattle}>Start The Battle</div>:""
    }
    {showModal?
    <Modal link="/" close={close} name={winner.name} message={message} src={winner&&winner.sprites.front_default}/>:""
}
        </div>
    )
}
export default Battle