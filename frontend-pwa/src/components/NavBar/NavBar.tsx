import React from 'react'
import {AppContext,AppContextType} from '../../App'
import {useContext} from 'react'
function NavBar() {
  function themeUpdate(theme:string){
    setTheme(theme);
    localStorage.setItem('theme', theme);
  }
  const {setTheme} = useContext<AppContextType>(AppContext);
    return (
      <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <div className="text-lg font-bold">Wordle</div>
      </div> 
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-end">
          <div className="indicator">
          <span className="indicator-item indicator-start badge badge-secondary mt-2">New</span> 
            <label tabIndex={0} className="btn btn-ghost rounded-btn">Theme Selection</label>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
              <li><button onClick={() => themeUpdate("dark")}>Dark</button></li> 
              <li><button onClick={() => themeUpdate("aqua")}>Aqua</button></li>
              <li><button onClick={() => themeUpdate("dracula")} >Dracula</button></li>
              <li><button onClick={() => themeUpdate("luxury")}>Luxury</button></li>
              <li><button onClick={() => themeUpdate("valentine")}>Valentine</button></li>
              <li><button onClick={() => themeUpdate("cupcake")}>Cupcake</button></li>
              <li><button onClick={() => themeUpdate("synthwave")}>Synthwave</button></li>
            </ul>
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar