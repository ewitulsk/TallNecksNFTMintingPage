import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MoralisProvider } from "react-moralis"
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  
    <MoralisProvider appId="GlxPyiF98U4lyK8ZfnGU6YLGE2tTDBol05QkEfYh" serverUrl="https://gh4qer8n9z1p.moralisweb3.com:2053/server">
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </MoralisProvider>
  
  ,
  document.getElementById('root'),
);