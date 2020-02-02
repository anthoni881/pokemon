import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import {  Link } from "react-router-dom";
import './Home.css'
const Home = ({ setDetail }) => {
    
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const getApi = async pages => {
      const getData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${pages}&limit=20`
      );
      await setData(prevData => {
        return [...new Set([...prevData, ...getData.data.results])];
      });
      await setHasMore(getData.data.results.length > 0);
    };
    const observer = useRef();
    const lastElementRef = useCallback(
      node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prevData => prevData + 20);
          }
        });
        if (node) observer.current.observe(node);
      },
      [hasMore]
    );
    useEffect(() => {
      getApi(page);
    }, [page]);
  
    const handleChoose = async e => {
      const detail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${e}`);
      await setDetail(detail.data);
    };
  return (
      <div>
          <h1>Pokédex</h1>
          <h3>Select your Pokemon to see statistics or start battles with random Pokemon, have fun!</h3>
    <div className="Home">
      {data.map((el, i) => (
          <div ref={lastElementRef} className="card-container" onClick={()=>handleChoose(i+1)}>
              <Link to="/pick">
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`}/>
        <div className="pokemon-name" value={i+1} key={i} >{el.name}</div>
        </Link>
        </div>
      ))}
      </div>
      </div>
  );
};
export default Home;
