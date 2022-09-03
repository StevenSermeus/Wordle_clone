import React from 'react';
import {Route, Routes}  from 'react-router-dom';
import {useState, useEffect, createContext} from 'react';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import Wordle from './components/Wordle';
import defaultArray from './utils';

export const AppContext = createContext();

function App() {
  console.log()
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    console.log('Check of logged in');
  }, []);


  return (
    <AppContext.Provider value={{loggedIn, setLoggedIn}}>
  <Routes>
    <Route path="/login" element={<SignIn />} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="*" element={<NotFound/>} />
    <Route path="/" element={!loggedIn ? <Wordle/> : <SignUp/>} />
  </Routes>
  </AppContext.Provider>
  );
    
}

export default App;
