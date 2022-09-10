
import Wordle from './Pages/Wordle/Wordle';
import './App.css';
import {useState, useEffect, createContext} from 'react';

export type AppContextType = {
  login: boolean;
  setLogin: (value: boolean) => void;
  theme: String;
  setTheme: (value: string) => void;
}
export const AppContext = createContext<AppContextType>({login: false, setLogin: () => {}, theme: "dark", setTheme: () => {}});

function App() {
  const [login, setLogin] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("dark");
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogin(true);
    }
    if(localStorage.getItem('theme')){
      setTheme(localStorage.getItem('theme') as string);
    }
  }, []);
  
  useEffect(() => {
    if (login) {
      localStorage.setItem('token', 'token');
    } else {
      localStorage.removeItem('token');
    }
  }, [login]);



  return (
    <AppContext.Provider value={{login, setLogin, theme, setTheme}}>
      <div data-theme={theme} className=' min-h-screen min-w-min'>
        <Wordle />
      </div>
    </AppContext.Provider>

  );
}

export default App;

