import React, { useEffect } from "react"
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import Home from "./home"
import MintPage from "./mintPage"
import NavBar from "./navbar";

function App() {

  const {Moralis} = useMoralis();

  useEffect(()=>{
    

  },[Moralis])

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-screen">

      <Routes>

        <Route path="/" element={
          <MintPage/>
        }/>      

      </Routes>
    </div>
  );
}

export default App;
