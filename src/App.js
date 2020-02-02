import React,{useState} from "react";
import "./App.css";
import Home from './Home'
import Pick from './Pick'
import { Route, BrowserRouter } from "react-router-dom";
import Battle from './Battle'
const App = () => {
  const [detail,setDetail]=useState("")
  const [data,setData]=useState([])
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path={"/"} component ={Home}>
          <Home setDetail={setDetail} data={data} setData={setData}></Home>
        </Route>
        <Route path={"/pick"} component={Pick}>
          <Pick Detail={detail}></Pick>
        </Route>
        <Route path={"/battle"} component={Battle}>
          <Battle/>
        </Route>
      </BrowserRouter>
    </div>
  );
};
export default App;
