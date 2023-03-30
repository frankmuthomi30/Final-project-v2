import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {initializeApp} from 'firebase/app'
import firebaseConfig from './Components/firebaseConfig';
const root = ReactDOM.createRoot(document.getElementById('root'));
// Initialize Firebase
initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <BrowserRouter>  
    <App />
    </BrowserRouter>
  
  </React.StrictMode>
);


