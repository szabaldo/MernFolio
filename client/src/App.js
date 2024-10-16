import React, { createContext, useState, useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Sambar from './Sambar.js';
import MainPage from './MainPage.js';

const UserContext = createContext();
const ModalContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const modalList = useRef([]); 
  modalList.last = []; 

  useEffect(() => {
    async function getUserSession() {
      const response = await fetch(process.env.ORIGIN + "/user", {
        method: "GET"
      });
      const res = await response.json();
      console.log("");
      console.log("User session Received: ");
      console.log(res);
      if (res.user) setUser(res.user);
    };
    getUserSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ModalContext.Provider value={modalList} >
        <Sambar id="sambar"/>
        <MainPage id="mainPage"/>
      </ModalContext.Provider>
    </UserContext.Provider>
  );
}

export { UserContext, ModalContext };
export default App;