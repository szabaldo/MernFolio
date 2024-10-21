import React, { createContext, useState, useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Sambar from './Sambar.js';
import MainPage from './MainPage.js';

const UserContext = createContext();
const ModalContext = createContext();
const IntroContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const modalList = useRef([]);
  const isIntro = useRef(true);
  modalList.lastLength = 0;

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

  useEffect(() => {
    setTimeout(() => {
      isIntro.current = false;
    }, 500);
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ModalContext.Provider value={modalList}>
        <IntroContext.Provider value={isIntro}>
          <Sambar id="sambar" />
          <MainPage id="mainPage" />
        </IntroContext.Provider>
      </ModalContext.Provider>
    </UserContext.Provider>
  );
}

export { UserContext, ModalContext, IntroContext };
export default App;